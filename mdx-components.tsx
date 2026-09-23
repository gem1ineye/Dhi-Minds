import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** FR-LEG-01 — legal pages styled with the site's editorial typography. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-10 font-display text-[length:var(--text-heading-md)] font-medium text-ink-900 first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-display text-[length:var(--text-heading-sm)] font-medium text-ink-900" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-grey-500" {...props} />,
    ul: (props) => <ul className="mt-4 flex flex-col gap-2 pl-5 text-grey-500 [&>li]:list-disc" {...props} />,
    ol: (props) => <ol className="mt-4 flex flex-col gap-2 pl-5 text-grey-500 [&>li]:list-decimal" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: (props) => {
      const { href, ...rest } = props;
      if (href?.startsWith("/")) {
        return <Link href={href} className="font-medium text-blue-600 underline underline-offset-2" {...rest} />;
      }
      return <a href={href} className="font-medium text-blue-600 underline underline-offset-2" {...rest} />;
    },
    strong: (props) => <strong className="font-medium text-charcoal" {...props} />,
    ...components,
  };
}
