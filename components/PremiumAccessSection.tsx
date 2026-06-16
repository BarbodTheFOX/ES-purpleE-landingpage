"use client";

import { BadgeCheck, Hash, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

export function PremiumAccessSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const content = siteContent.premiumAccess;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-premium-card], [data-premium-note]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      ScrollTrigger.batch("[data-premium-card]", {
        start: "top 82%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });

      gsap.fromTo(
        "[data-premium-note]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-premium-note]",
            start: "top 84%",
          },
        },
      );

      const triggers = gsap.utils
        .toArray<HTMLElement>("[data-premium-card]")
        .map((card, index) =>
          ScrollTrigger.create({
            trigger: card,
            start: "top 70%",
            end: "bottom 42%",
            onEnter: () => setActiveCard(index),
            onEnterBack: () => setActiveCard(index),
          }),
        );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope },
  );

  return (
    <Section id="premium-access" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope}>
        {"intro" in content && (
          <p className="mb-5 max-w-3xl text-sm font-bold leading-8 text-brand-light/82 sm:text-base">
            {content.intro}
          </p>
        )}
        <GlassCard className="relative overflow-hidden border-brand-purple/20 p-5 sm:p-8">
          <div className="relative mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-l from-brand-purple/55 to-transparent" />
            <span className="size-2 rounded-full bg-brand-yellow" />
          </div>
          <div className="relative grid gap-4 sm:grid-cols-3">
            {content.cards.map((card, index) => {
              const Icon = index === 0 ? Sparkles : index === 1 ? Hash : BadgeCheck;

              return (
                <article
                  key={card.label}
                  data-premium-card=""
                  className={`rounded-2xl border bg-ink/60 p-5 opacity-0 transition duration-300 hover:border-brand-purple/45 hover:bg-white/[0.055] ${
                    activeCard === index
                      ? "border-brand-purple/60 bg-brand-purple/10 shadow-[0_18px_50px_rgba(143,0,255,0.16)]"
                      : "border-brand-purple/20"
                  }`}
                >
                  <Icon
                    className={`mb-5 size-7 ${
                      activeCard === index ? "text-brand-purple" : "text-brand-light/70"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-3xl font-black text-brand-white">{card.value}</p>
                  <p className="mt-3 text-sm font-bold leading-7 text-brand-light/80">
                    {card.label}
                  </p>
                </article>
              );
            })}
          </div>
          <div
            data-premium-note=""
            className="relative mt-6 rounded-2xl border border-brand-purple/20 bg-white/[0.035] p-4 opacity-0"
          >
            <p className="text-sm font-bold leading-7 text-brand-light/85">
              <span className="ml-2 inline-block size-2 rounded-full bg-brand-yellow align-middle" />
              {content.note}
            </p>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
