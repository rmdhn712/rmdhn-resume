import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-black/5 dark:border-white/5">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-black/40 dark:text-white/40">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
