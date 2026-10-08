"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/data";

export default function Projects({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const count = items.length;
  const isOpen = index !== null;
  const current = index !== null ? items[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null || count < 2 ? i : (i + dir + count) % count)),
    [count]
  );

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

  return (
    <section id="projects" aria-label="Projects and gallery" className="pb-24 md:pb-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="container-custom">
        {count === 0 ? (
          <p className="pt-8 text-sm text-black/60 dark:text-white/60">No images yet.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {items.map((item, i) => (
              <motion.li
                key={`${item.src}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setIndex(i);
                  }}
                  aria-haspopup="dialog"
                  aria-label={`Open ${item.title}`}
                  className="focus-ring group relative block w-full aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-accent/60 bg-black/5 dark:bg-white/5 transition-colors"
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10 text-left text-sm font-medium text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    {item.title}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {current && index !== null && (
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
              aria-labelledby="gallery-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-ink-light rounded-2xl shadow-2xl"
            >
              <div
                className="relative h-[48vh] min-h-[220px] w-full bg-black/90 overflow-hidden"
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
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.src}
                      alt={current.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {count > 1 && (
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
                      {index + 1} / {count}
                    </span>
                  </>
                )}

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="focus-ring absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6">
                <h3 id="gallery-modal-title" className="font-display text-2xl font-semibold mb-3">
                  {current.title}
                </h3>
                {current.description && (
                  <p className="text-black/70 dark:text-white/70 mb-4">{current.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
