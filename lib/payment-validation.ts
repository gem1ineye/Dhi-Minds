import { z } from "zod";

/** Customer details captured before checkout opens — a strict subset of inquirySchema's name/email/phone rules. */
export const paymentCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name so we know who we're talking to.")
    .max(80, "Keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email so we can send a receipt.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter a phone number so we can reach you.")
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid phone number (7–15 digits)."),
});
export type PaymentCustomer = z.infer<typeof paymentCustomerSchema>;

/** No `amount` field, ever — the server resolves the authoritative price from type/planId (see app/api/razorpay/create-order/route.ts). */
export const createOrderSchema = paymentCustomerSchema.extend({
  type: z.enum(["consultation", "plan"]),
  planId: z.enum(["starter", "growth", "scale"]).optional(),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  type: z.enum(["consultation", "plan"]),
  planId: z.enum(["starter", "growth", "scale"]).optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
