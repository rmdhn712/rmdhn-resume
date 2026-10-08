import fs from "node:fs";
import path from "node:path";
import { gallery, type GalleryItem } from "@/lib/data";

const EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

const titleFromFile = (file: string) =>
  file
    .replace(EXT, "")
    .replace(/^\d+[-_.\s]*/, "") // leading order number
    .replace(/[-_]+/g, " ")
    .trim();

/** Hand-listed items plus every image found in /public/gallery/. */
export function getGalleryItems(): GalleryItem[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  const seen = new Set(gallery.map((g) => g.src));
  const found: GalleryItem[] = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => EXT.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((f) => {
          const txt = path.join(dir, f.replace(EXT, ".txt"));
          const description = fs.existsSync(txt)
            ? fs.readFileSync(txt, "utf8").trim()
            : "";
          return {
            src: `/gallery/${encodeURIComponent(f)}`,
            title: titleFromFile(f) || "Untitled",
            ...(description ? { description } : {}),
          };
        })
        .filter((g) => !seen.has(g.src))
    : [];
  return [...gallery, ...found];
}
