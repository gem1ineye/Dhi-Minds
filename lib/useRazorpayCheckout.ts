import { useCallback, useState } from "react";
import { track } from "@/lib/analytics";
import type { PaymentCustomer } from "@/lib/payment-validation";

type RazorpayHandlerResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

export type CheckoutStatus = "idle" | "loading" | "opening" | "verifying" | "success" | "error";

type CheckoutTarget = { type: "consultation"; planId?: undefined } | { type: "plan"; planId: "starter" | "growth" | "scale" };

/** Order create -> Razorpay Checkout.js -> signature verify. Requires checkout.razorpay.com already loaded via next/script (see RazorpayCheckoutButton). */
export function useRazorpayCheckout(target: CheckoutTarget) {
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(
    async (customer: PaymentCustomer) => {
      setError(null);
      setStatus("loading");
      track({ name: "payment_initiated", type: target.type });

      try {
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...target, ...customer }),
        });
        const body = await res.json();

        if (!res.ok || !body.ok) {
          setStatus("error");
          setError(
            body.error === "PAYMENTS_UNAVAILABLE" || body.error === "NOT_AVAILABLE"
              ? "Payments aren't available right now — please use the contact form instead."
              : "Something went wrong starting checkout. Please try again.",
          );
          return;
        }

        if (!window.Razorpay) {
          setStatus("error");
          setError("Checkout couldn't load. Please refresh and try again.");
          return;
        }

        setStatus("opening");
        const razorpay = new window.Razorpay({
          key: body.keyId,
          amount: body.amount,
          currency: body.currency,
          name: "Dhi Minds",
          description: body.label,
          order_id: body.orderId,
          prefill: { name: customer.name, email: customer.email, contact: customer.phone },
          theme: { color: "#c9a227" },
          handler: (response) => {
            setStatus("verifying");
            fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, ...target, ...customer }),
            })
              .then((verifyRes) => verifyRes.json().then((verifyBody) => ({ verifyRes, verifyBody })))
              .then(({ verifyRes, verifyBody }) => {
                if (verifyRes.ok && verifyBody.ok) {
                  setStatus("success");
                  track({ name: "payment_success", type: target.type });
                } else {
                  setStatus("error");
                  setError("Payment succeeded but confirmation failed — we'll follow up by email.");
                  track({ name: "payment_failed", type: target.type });
                }
              })
              .catch(() => {
                setStatus("error");
                setError("Payment succeeded but confirmation failed — we'll follow up by email.");
                track({ name: "payment_failed", type: target.type });
              });
          },
          modal: {
            ondismiss: () => setStatus((s) => (s === "opening" ? "idle" : s)),
          },
        });
        razorpay.open();
      } catch {
        setStatus("error");
        setError("We couldn't reach the server. Check your connection and try again.");
      }
    },
    [target],
  );

  return { open, status, error };
}
