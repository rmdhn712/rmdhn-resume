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
        description="IoT systems I have designed, integrated, and maintained. Click any card to view the details."
      />
      <Projects />
    </>
  );
}
