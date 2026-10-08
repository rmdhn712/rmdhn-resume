"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import type { Project } from "@/lib/data";

type Active = { project: Project; index: number } | null;

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Active>(null);
  const [filter, setFilter] = useState<number | "all">("all");
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (project: Project, index: number, e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setActive({ project, index });
  };

  const close = useCallback(() => setActive(null), []);

  const step = useCallback((dir: 1 | -1) => {
    setActive((a) => {
      if (!a) return a;
      const n = a.project.images.length;
      if (n < 2) return a;
      return { ...a, index: (a.index + dir + n) % n };
    });
  }, []);

  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [isOpen, close, step]);

  const galleryItems = useMemo(
    () =>
      projects
        .filter((p) => filter === "all" || p.id === filter)
        .flatMap((project) =>
          project.images.map((image, index) => ({ project, image, index }))
        ),
    [projects, filter]
  );

  const totalImages = projects.reduce((n, p) => n + p.images.length, 0);

  const current = active ? active.project.images[active.index] : null;

  return (
    <section id="projects" aria-label="Projects and gallery" className="pb-24 md:pb-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="container-custom">
        {/* ------------------------------ Projects ------------------------------ */}
        <div className="grid sm:grid-cols-2 gap-8 pt-2">
          {projects.map((project, i) => {
            const cover = project.images[0];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-accent/60 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => open(project, 0, e)}
                  className="focus-ring text-left w-full"
                  aria-haspopup="dialog"
                >
                  <div className="relative h-52 w-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    {cover && (
                      <Image
                        src={cover.src}
                        alt={cover.caption ?? `Screenshot of ${project.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
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
            );
          })}
        </div>

        {/* ------------------------------ Gallery ------------------------------- */}
        <div className="mt-20" id="gallery">
          <p className="section-subtitle">Gallery</p>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            All Screenshots <span className="text-black/40 dark:text-white/40 text-xl font-normal">({totalImages})</span>
          </h2>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by project">
            {[{ id: "all" as const, label: "All" }, ...projects.map((p) => ({ id: p.id, label: p.title }))].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`focus-ring text-xs px-3.5 py-1.5 rounded-full border transition-colors max-w-[16rem] truncate ${
                  filter === f.id
                    ? "bg-accent text-ink border-accent"
                    : "border-black/10 dark:border-white/10 hover:border-accent/60"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {galleryItems.length === 0 ? (
            <p className="mt-8 text-sm text-black/60 dark:text-white/60">No images yet.</p>
          ) : (
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map(({ project, image, index }) => (
                <li key={`${project.id}-${index}-${image.src}`}>
                  <button
                    type="button"
                    onClick={(e) => open(project, index, e)}
                    aria-haspopup="dialog"
                    aria-label={`Open ${image.caption ?? `image ${index + 1}`} — ${project.title}`}
                    className="focus-ring group relative block w-full aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-accent/60 bg-black/5 dark:bg-white/5 transition-colors"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-left text-xs text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                      {image.caption ?? project.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ------------------------------ Lightbox -------------------------------- */}
      <AnimatePresence>
        {active && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-ink-light rounded-2xl shadow-2xl"
            >
              <div
                className="relative h-[42vh] min-h-[220px] w-full bg-black/90 overflow-hidden"
                onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchX.current;
                  touchX.current = null;
                  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.project.id}-${active.index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.src}
                      alt={current.caption ?? `Image ${active.index + 1} of ${active.project.images.length} — ${active.project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {active.project.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                      className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next image"
                      className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 text-white text-xs px-2.5 py-1">
                      {active.index + 1} / {active.project.images.length}
                    </span>
                  </>
                )}

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Close project details"
                  className="focus-ring absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </div>

              {current.caption && (
                <p className="px-6 pt-3 text-xs text-black/60 dark:text-white/60" aria-live="polite">
                  {current.caption}
                </p>
              )}

              {active.project.images.length > 1 && (
                <div className="flex gap-2 p-3 border-b border-black/5 dark:border-white/5 overflow-x-auto">
                  {active.project.images.map((img, idx) => (
                    <button
                      key={`${img.src}-${idx}`}
                      type="button"
                      onClick={() => setActive({ ...active, index: idx })}
                      aria-label={`Show image ${idx + 1}`}
                      aria-current={idx === active.index}
                      className={`focus-ring relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === active.index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-6">
                <h3 id="project-modal-title" className="font-display text-2xl font-semibold mb-3">
                  {active.project.title}
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-4">{active.project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-dark dark:text-accent-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {active.project.link && (
                    <a
                      href={active.project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark"
                    >
                      <ExternalLink size={15} /> View Live
                    </a>
                  )}
                  {active.project.repo && (
                    <a
                      href={active.project.repo}
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
