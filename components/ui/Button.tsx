import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  // Solid espresso pill — the strongest action, à la a system "Buy" button.
  primary: "bg-ink-900 text-mist-50 hover:bg-ink-700 shadow-card hover:shadow-lift",
  // Indigo-violet gradient with a glass highlight edge; white text is ≥ 4.7:1 on both stops.
  accent: "bg-linear-to-b from-accent-400 to-accent-500 text-white border border-white/30 shadow-card hover:brightness-110 hover:shadow-lift",
  // White pill — for use on saturated accent panels.
  light: "bg-white text-ink-900 hover:bg-mist-50 shadow-card hover:shadow-lift",
  // Frosted-glass pill for secondary actions.
  secondary: "glass text-ink-900 hover:bg-[var(--glass-fill-strong)] hover:shadow-[var(--glass-shadow-lift)]",
  ghost: "text-charcoal hover:bg-white/50",
  "link-arrow": "text-current p-0 rounded-none gap-1.5",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

export type ButtonProps = AsButton | AsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      loading,
      children,
      className,
      showArrow,
      ...rest
    } = props;

    const classes = cn(
      base,
      variants[variant],
      variant !== "link-arrow" && sizes[size],
      variant === "link-arrow" && "h-auto text-sm",
      "group",
      className,
    );

    const content = (
      <>
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        <span>{children}</span>
        {showArrow && (
          <ArrowRight
            className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </>
    );

    if ("href" in props && props.href) {
      const href = props.href;
      const { href: _href, external, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        external?: boolean;
      };
      void _href;
      if (external) {
        return (
          <a
            ref={ref as never}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...anchorRest}
          >
            {content}
          </a>
        );
      }
      return (
        <Link ref={ref as never} href={href} className={classes} {...anchorRest}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as never}
        className={classes}
        disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);
