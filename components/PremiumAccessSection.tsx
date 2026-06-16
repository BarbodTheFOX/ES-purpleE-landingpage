"use client";

import { BadgeCheck, Hash, Sparkles } from "lucide-react";
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

export function PremiumAccessSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.premiumAccess;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-premium-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-premium-card]", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.to("[data-premium-unlock]", {
        rotate: -8,
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      });
    },
    { scope },
  );

  return (
    <Section id="premium-access" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope}>
        <GlassCard className="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute left-0 top-0 size-56 -translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 size-64 translate-x-1/4 translate-y-1/4 rounded-full bg-brand-purple/20 blur-3xl" />
          <div className="relative grid gap-4 sm:grid-cols-3">
            {content.cards.map((card, index) => {
              const Icon = index === 0 ? Sparkles : index === 1 ? Hash : BadgeCheck;

              return (
                <div
                  key={card.label}
                  data-premium-card=""
                  className="rounded-2xl border border-brand-purple/20 bg-ink/55 p-5"
                >
                  <Icon
                    data-premium-unlock={index === 2 ? "" : undefined}
                    className={
                      index === 0
                        ? "mb-5 size-7 text-brand-yellow"
                        : "mb-5 size-7 text-brand-purple"
                    }
                    aria-hidden="true"
                  />
                  <p className="text-3xl font-black text-brand-white">{card.value}</p>
                  <p className="mt-3 text-sm font-bold leading-7 text-brand-light/80">
                    {card.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="relative mt-6 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/10 p-4 text-sm font-bold leading-7 text-brand-yellow">
            {content.note}
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}
