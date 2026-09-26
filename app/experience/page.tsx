import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Experience from "@/components/Experience";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Experience — ${profile.name}`,
  description: "Career journey and work experience.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Career Journey"
        title="Work Experience"
        description="A summary of roles, responsibilities, and achievements throughout my career."
      />
      <Experience />
    </>
  );
}
