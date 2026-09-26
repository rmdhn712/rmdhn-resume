"use client";

import { motion } from "framer-motion";

export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pt-32 pb-6 md:pt-40 md:pb-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-subtitle">{eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-black/60 dark:text-white/60">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
