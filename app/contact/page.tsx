import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact — ${profile.name}`,
  description: "Get in touch for collaboration or job opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Let's Connect"
        title="Contact Me"
        description="Open to collaboration opportunities, freelance projects, or a chat about technology."
      />
      <Contact />
    </>
  );
}
