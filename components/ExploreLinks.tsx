"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, LayoutGrid, Mail, ArrowUpRight } from "lucide-react";

const items = [
  {
    href: "/experience",
    title: "Experience",
    desc: "My career journey and professional achievements so far.",
    icon: Briefcase,
  },
  {
    href: "/skills",
    title: "Skills",
    desc: "IoT/embedded technical skills, networking, and soft skills I bring to the table.",
    icon: Sparkles,
  },
  {
    href: "/projects",
    title: "Projects & Gallery",
    desc: "A collection of IoT systems I have designed and implemented.",
    icon: LayoutGrid,
  },
  {
    href: "/contact",
    title: "Contact",
    desc: "Open to collaboration, job opportunities, or just a chat.",
    icon: Mail,
  },
];

export default function ExploreLinks() {
  return (
    <section aria-labelledby="explore-heading" className="py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Explore</p>
          <h2 id="explore-heading" className="section-title">
            More About Me
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="focus-ring group relative block h-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-colors duration-300 group-hover:bg-accent/25"
                  />
                  <Icon size={28} className="mb-4 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-1.5">
                    {item.title}
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </h3>
                  <p className="text-sm text-black/60 dark:text-white/60">{item.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
