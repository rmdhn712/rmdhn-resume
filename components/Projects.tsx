"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const goPrev = () => {
    if (!active) return;
    setImageIndex((i) => (i === 0 ? active.images.length - 1 : i - 1));
  };

  const goNext = () => {
    if (!active) return;
    setImageIndex((i) => (i === active.images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (active) {
      closeBtnRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActive(null);
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "ArrowRight") goNext();
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    } else {
      triggerRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const openProject = (p: Project, e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setImageIndex(0);
    setActive(p);
  };

  return (
    <section id="projects" aria-label="Project gallery" className="pb-24 md:pb-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 pt-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-accent/60 transition-colors"
            >
              <button
                type="button"
                onClick={(e) => openProject(project, e)}
                className="focus-ring text-left w-full"
                aria-haspopup="dialog"
              >
                <div className="relative h-52 w-full bg-black/5 dark:bg-white/5">
                  <Image
                    src={project.images[0]}
                    alt={`Screenshot of ${project.title} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.images.length > 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 text-white text-xs px-2.5 py-1 backdrop-blur-sm"
                    >
                      <Images size={12} />
                      {project.images.length}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-dark dark:text-accent-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActive(null)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-lg bg-white dark:bg-ink-light rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-56 w-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.images[imageIndex]}
                      alt={`Photo ${imageIndex + 1} of ${active.images.length} — ${active.title}`}
                      fill
                      sizes="512px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {active.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous photo"
                      className="focus-ring absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next photo"
                      className="focus-ring absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
                      role="tablist"
                      aria-label="Photo navigation"
                    >
                      {active.images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          role="tab"
                          aria-selected={idx === imageIndex}
                          aria-label={`Go to photo ${idx + 1}`}
                          onClick={() => setImageIndex(idx)}
                          className={`focus-ring w-1.5 h-1.5 rounded-full transition-all ${
                            idx === imageIndex ? "bg-accent w-4" : "bg-white/60 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close project details"
                  className="focus-ring absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </div>

              {active.images.length > 1 && (
                <div className="flex gap-2 p-3 border-b border-black/5 dark:border-white/5 overflow-x-auto">
                  {active.images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      aria-label={`Show photo ${idx + 1}`}
                      aria-current={idx === imageIndex}
                      className={`focus-ring relative w-16 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === imageIndex ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-6">
                <h3 id="project-modal-title" className="font-display text-2xl font-semibold mb-3">
                  {active.title}
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-4">{active.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-dark dark:text-accent-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark"
                    >
                      <ExternalLink size={15} /> View Live
                    </a>
                  )}
                  {active.repo && (
                    <a
                      href={active.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
                    >
                      <Github size={15} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
