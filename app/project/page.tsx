import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Projects from "@/components/Projects";
import { profile } from "@/lib/data";
import { getGalleryItems } from "@/lib/projectImages";

export const metadata: Metadata = {
  title: `Projects & Gallery — ${profile.name}`,
  description: "A gallery of the IoT projects I have completed.",
};

export default function ProjectsPage() {
  // Runs at build time: merges entries from lib/data.ts with files in public/gallery/.
  const items = getGalleryItems();

  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects & Gallery"
        description="I successfully integrated the IoT monitoring dashboard into the system, deployed it, and verified that it is operating as intended. The following is the result."
      />
      <Projects items={items} />
    </>
  );
}
