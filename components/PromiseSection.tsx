"use client";

import { Brain, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { MixedText } from "@/components/ui/DirectionalText";
import { Section } from "@/components/ui/Section";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

export function PromiseSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.promise;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-promise-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-promise-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 76%",
        },
      });
    },
    { scope },
  );

  return (
    <Section eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div
          data-promise-reveal=""
          className="rounded-3xl border border-brand-purple/16 bg-white/[0.035] p-5 sm:p-7"
        >
          <Brain className="mb-5 size-7 text-brand-purple" aria-hidden="true" />
          <p className="text-base font-bold leading-9 text-brand-light/85">
            <MixedText text={content.text} />
          </p>
        </div>
        <div className="grid gap-3">
          {content.cards.map((card) => (
            <div
              key={card}
              data-promise-reveal=""
              className="flex items-center gap-3 rounded-2xl border border-brand-purple/14 bg-ink/70 p-4"
            >
              <CheckCircle2 className="size-5 shrink-0 text-brand-purple" aria-hidden="true" />
              <span className="text-sm font-black text-brand-white">
                <MixedText text={card} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
