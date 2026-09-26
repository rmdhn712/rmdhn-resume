import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Projects from "@/components/Projects";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Projects & Gallery — ${profile.name}`,
  description: "A collection of IoT projects I have completed.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects & Gallery"
        description="I successfully integrated the IoT monitoring dashboard into the system, deployed it, and verified that it is operating as intended. The following is the result."
      />
      <Projects />
    </>
  );
}
