"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills list" className="pb-24 md:pb-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-10 pt-2">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold mb-5">{cat.category}</h3>
              <ul className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-black/40 dark:text-white/40">{skill.level}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"
                      role="progressbar"
                      aria-label={skill.name}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-dark to-accent"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
