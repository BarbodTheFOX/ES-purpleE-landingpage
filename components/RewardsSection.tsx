"use client";

import { Crown, FileText, Gift, Route, Trophy, WalletCards } from "lucide-react";
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

export function RewardsSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.rewards;
  const icons = [Trophy, Gift, Crown, Route, WalletCards, FileText];

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-reward-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-reward-card]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
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
    <Section id="rewards" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-5">
        <p className="max-w-3xl text-sm leading-8 text-brand-light/80 sm:text-base">
          {content.intro}
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.pdfCards.map((card, index) => {
            const Icon = icons[index];

            return (
              <GlassCard
                key={card.title}
                data-reward-card=""
                className="h-full border-brand-purple/20 bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-5 sm:p-6"
              >
                <Icon className="mb-5 size-6 text-brand-purple" aria-hidden="true" />
                <h3 className="text-lg font-black text-brand-white">{card.title}</h3>
                <p className="mt-3 font-poppins text-2xl font-black text-brand-purple">
                  {card.value}
                </p>
                <p className="mt-4 text-sm leading-7 text-brand-light/80">{card.text}</p>
              </GlassCard>
            );
          })}
        </div>
        <p className="rounded-2xl border border-brand-purple/15 bg-white/[0.035] p-4 text-sm font-bold leading-7 text-brand-light/80">
          {content.note}
        </p>
      </div>
    </Section>
  );
}
