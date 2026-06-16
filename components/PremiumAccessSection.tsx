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
  const activeIndexRef = useRef(0);
  const [activeCard, setActiveCard] = useState(0);
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

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const stage = scope.current?.querySelector<HTMLElement>("[data-premium-stage]");

        if (!scope.current || !stage) {
          return undefined;
        }

        const trigger = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${content.cards.length * 360}`,
          pin: stage,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              content.cards.length - 1,
              Math.floor(self.progress * content.cards.length),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveCard(nextIndex);
            }
          },
        });

        return () => trigger.kill();
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <Section
      id="premium-access"
      eyebrow={content.eyebrow}
      title={content.title}
      className="lg:min-h-screen lg:py-0"
    >
      <div ref={scope}>
        <GlassCard
          data-premium-stage=""
          className="relative flex overflow-hidden border-brand-purple/20 p-5 sm:p-8 lg:min-h-screen lg:flex-col lg:justify-center"
        >
          <div className="absolute bottom-0 right-0 size-64 translate-x-1/4 translate-y-1/4 rounded-full bg-brand-purple/16 blur-3xl" />
          <div className="relative mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-l from-brand-purple/55 to-transparent" />
            <span className="size-2 rounded-full bg-brand-yellow shadow-[0_0_18px_rgba(255,241,102,0.45)]" />
          </div>
          <div className="relative grid gap-4 sm:grid-cols-3">
            {content.cards.map((card, index) => {
              const Icon = index === 0 ? Sparkles : index === 1 ? Hash : BadgeCheck;

              return (
                <div
                  key={card.label}
                  data-premium-card=""
                  className={`rounded-2xl border bg-ink/60 p-5 transition duration-300 hover:border-brand-purple/45 hover:bg-white/[0.055] ${
                    activeCard === index
                      ? "border-brand-purple/60 bg-brand-purple/10 shadow-soft-purple"
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
                </div>
              );
            })}
          </div>
          <div className="relative mt-6 rounded-2xl border border-brand-purple/20 bg-white/[0.035] p-4">
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
