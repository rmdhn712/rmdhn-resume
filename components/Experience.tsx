"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience list"
      className="pb-24 md:pb-32 bg-black/[0.02] dark:bg-white/[0.02]"
    >
      <div className="container-custom">
        <ol className="relative pt-14 border-l border-black/10 dark:border-white/10 ml-3">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="mb-12 ml-8 last:mb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[7px] flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-white dark:ring-ink"
              />
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
                {exp.period}
              </p>
              <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
              <p className="text-black/50 dark:text-white/50 text-sm mb-3">{exp.company}</p>
              <p className="text-black/70 dark:text-white/70 mb-3 max-w-2xl">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
