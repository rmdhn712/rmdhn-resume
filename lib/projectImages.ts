import fs from "node:fs";
import path from "node:path";
import { projects, type Project, type ProjectImage } from "@/lib/data";

const EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

const captionFromFile = (file: string) =>
  file
    .replace(EXT, "")
    .replace(/^\d+[-_.\s]*/, "") // leading order number
    .replace(/[-_]+/g, " ")
    .trim();

/** Reads /public/projects/<folder>/ and returns every image found there. */
function scanFolder(folder: string): ProjectImage[] {
  const dir = path.join(process.cwd(), "public", "projects", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => ({
      src: `/projects/${folder}/${encodeURIComponent(f)}`,
      caption: captionFromFile(f) || undefined,
    }));
}

/** Projects with their hand-listed images + any images found in their folder. */
export function getProjectsWithImages(): Project[] {
  return projects.map((p) => {
    const seen = new Set(p.images.map((i) => i.src));
    const extra = scanFolder(p.folder).filter((i) => !seen.has(i.src));
    return { ...p, images: [...p.images, ...extra] };
  });
}
