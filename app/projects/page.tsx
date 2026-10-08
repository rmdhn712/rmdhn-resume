import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Projects from "@/components/Projects";
import { profile } from "@/lib/data";
import { getProjectsWithImages } from "@/lib/projectImages";

export const metadata: Metadata = {
  title: `Projects & Gallery — ${profile.name}`,
  description: "A collection of IoT projects I have completed, with screenshots and photos.",
};

export default function ProjectsPage() {
  // Runs at build time: merges images listed in lib/data.ts with any files
  // dropped into public/projects/<folder>/.
  const projects = getProjectsWithImages();

  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects & Gallery"
        description="I successfully integrated the IoT monitoring dashboard into the system, deployed it, and verified that it is operating as intended. The following is the result."
      />
      <Projects projects={projects} />
    </>
  );
}
