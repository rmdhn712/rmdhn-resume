"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">About Me</p>
          <h2 id="about-heading" className="section-title">
            Get to Know Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-black/70 dark:text-white/70 leading-relaxed text-lg"
          >
            {about.paragraph}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6"
          >
            {about.details.map((item) => (
              <div key={item.label} className="border-l-2 border-accent/40 pl-4">
                <dt className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-1">
                  {item.label}
                </dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
