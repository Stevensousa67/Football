"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "./ContactForm";
import { SocialIconButton } from "@/components/SocialIconButton";
import { contactSocials } from "@/lib/socialMedia";
import { getCurrentUtcOffset } from "@/lib/getTimeZone";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const timeOffset = getCurrentUtcOffset();

  return (
    <section id="contact-section" className="py-20 px-4 pb-10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let&apos;s Work Together
          </h2>
        </div>

        {/* ── Split layout ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start">
          {/* Left: info + socials */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Ready to start a project?
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I&apos;m currently available for freelance projects. Whether you
                need a full website, a web application, or just want to chat
                about an idea — I&apos;d love to hear from you.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                Plymouth, MA, USA
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                {timeOffset}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Find me on
              </p>
              <div className="flex flex-wrap gap-2">
                {contactSocials.map((social) => (
                  <SocialIconButton key={social.name} social={social} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
