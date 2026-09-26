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
        description="This is my IoT monitoring dashboard, which has been successfully integrated into the system, deployed, and is now running as intended."
      />
      <Projects />
    </>
  );
}
