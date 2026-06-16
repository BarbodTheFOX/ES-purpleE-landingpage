"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

export function ProgramSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.program;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-program-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-program-reveal]", {
        opacity: 0,
        y: 26,
        duration: 0.72,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });
    },
    { scope },
  );

  return (
    <Section eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} data-program-reveal="">
        <GlassCard className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <p data-program-reveal="" className="text-base leading-9 text-brand-light/85">
            {content.text}
          </p>
          <div className="space-y-4">
            {content.highlights.map((highlight) => (
              <div key={highlight} data-program-reveal="" className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-brand-purple"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold leading-7 text-brand-white">{highlight}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
