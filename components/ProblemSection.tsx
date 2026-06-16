"use client";

import { AlertTriangle } from "lucide-react";
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

export function ProblemSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.problem;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-problem-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-problem-card]", {
        opacity: 0,
        y: 34,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.from("[data-problem-icon]", {
        filter: "drop-shadow(0 0 0 rgba(143,0,255,0))",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
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
      <div ref={scope} className="space-y-5">
        {"text" in content && (
          <p
            data-problem-card=""
            className="max-w-4xl text-sm font-bold leading-8 text-brand-light/82 sm:text-base"
          >
            {content.text}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item, index) => (
          <div key={item.title} data-problem-card="">
            <GlassCard className="h-full transition-shadow duration-300 hover:shadow-glow">
              <AlertTriangle
                data-problem-icon=""
                className="mb-5 size-6 text-brand-purple"
                aria-hidden="true"
              />
              <h3 className="text-lg font-black text-brand-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-light/75">{item.text}</p>
            </GlassCard>
          </div>
        ))}
        </div>
      </div>
    </Section>
  );
}
