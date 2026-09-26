"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Mail, Download } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(201,164,99,0.15),transparent_55%)]"
      />

      <div className="container-custom grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">Hello, I&apos;m</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
            {profile.name}
          </h1>
          <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-2">
            {profile.role}
          </p>
          <p className="max-w-xl text-black/60 dark:text-white/60 mb-8">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="focus-ring inline-flex items-center gap-2 bg-accent text-ink px-6 py-3 rounded-full font-medium hover:bg-accent-light transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
              Contact Me
            </Link>
            <a
              href={profile.resumeFile}
              download
              className="focus-ring inline-flex items-center gap-2 border border-black/15 dark:border-white/20 px-6 py-3 rounded-full font-medium hover:border-accent hover:text-accent transition-colors"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="justify-self-center"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full ring-4 ring-accent/40 ring-offset-4 ring-offset-white dark:ring-offset-ink overflow-hidden">
            <Image
              src={profile.photo}
              alt={`Profile photo of ${profile.name}`}
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="focus-ring absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-black/40 dark:text-white/40 hover:text-accent"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
