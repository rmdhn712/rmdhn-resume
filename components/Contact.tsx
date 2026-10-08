"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Twitter, Send } from "lucide-react";
import { profile } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkgwbpo";

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Invalid email format.";
    }
    if (!values.message.trim()) {
      next.message = "Message is required.";
    } else if (values.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    return next;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-label="Contact form and information" className="pb-24 md:pb-32">
      <div className="container-custom grid md:grid-cols-2 gap-16 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-accent" aria-hidden="true" />
              <a href={`mailto:${profile.email}`} className="focus-ring hover:text-accent">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-accent" aria-hidden="true" />
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="focus-ring hover:text-accent">
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-accent" aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
          </ul>

          <div className="flex gap-3">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon] ?? Mail;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="focus-ring w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          aria-describedby={
            status === "success" ? "form-success" : status === "error" ? "form-error" : undefined
          }
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="focus-ring w-full rounded-lg border border-black/15 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="focus-ring w-full rounded-lg border border-black/15 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="focus-ring w-full rounded-lg border border-black/15 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm resize-none"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="focus-ring inline-flex items-center gap-2 bg-accent text-ink px-6 py-3 rounded-full font-medium hover:bg-accent-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={15} aria-hidden="true" />
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p id="form-success" role="status" className="text-sm text-green-600 dark:text-green-400">
              Thank you! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p id="form-error" role="alert" className="text-sm text-red-500">
              Something went wrong sending your message. Please try again or email me directly at{" "}
              <a href={`mailto:${profile.email}`} className="underline hover:text-accent">
                {profile.email}
              </a>
              .
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
