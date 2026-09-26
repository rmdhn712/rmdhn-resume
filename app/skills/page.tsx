import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Skills from "@/components/Skills";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Skills — ${profile.name}`,
  description: "Technical competencies and soft skills.",
};

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Competencies"
        title="Skills & Expertise"
        description="A combination of IoT/embedded technical skills, networking, and soft skills I have sharpened on the job."
      />
      <Skills />
    </>
  );
}
