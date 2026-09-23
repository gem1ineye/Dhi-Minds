import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { getHomeProjects } from "@/lib/content";

/** FR-PORT-08 — home shows the first 6 with a link to the full filterable archive. */
export function Portfolio() {
  const projects = getHomeProjects(6);
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      surface="band"
      orb="right"
      eyebrow="Portfolio"
      heading="Selected work"
      lede="A selection of websites, digital products, campaigns, and experiences we've built for ambitious businesses."
    >
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <div key={project.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}>
            <PortfolioCard project={project} featured={i === 0} />
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button href="/work" variant="secondary" showArrow>
          View all work
        </Button>
      </div>
    </Section>
  );
}
