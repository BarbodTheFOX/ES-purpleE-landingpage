"use client";

import { Crown, FileText, Gift, Route, Trophy, WalletCards } from "lucide-react";
import { useRef, useState } from "react";
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
  const [activeReward, setActiveReward] = useState(0);
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
        y: 34,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reward-card]").forEach((card, index) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 58%",
            end: "bottom 42%",
            onEnter: () => setActiveReward(index),
            onEnterBack: () => setActiveReward(index),
            toggleActions: "play reverse play reverse",
          },
        })
          .to(
            card,
            {
              borderColor: "rgba(143, 0, 255, 0.52)",
              boxShadow: "0 24px 70px rgba(143, 0, 255, 0.18)",
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            0,
          );
      });
    },
    { scope },
  );

  const ActiveIcon = icons[activeReward];
  const activeCard = content.pdfCards[activeReward];

  return (
    <Section
      id="rewards"
      eyebrow={content.eyebrow}
      title={content.title}
      className="overflow-hidden"
    >
      <div ref={scope} className="relative">
        <div className="absolute left-0 top-12 hidden h-72 w-72 rounded-full bg-brand-purple/[0.08] blur-3xl lg:block" />
        <div className="relative grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <GlassCard className="relative overflow-hidden border-brand-purple/20 p-5 sm:p-7">
              <div className="absolute -left-16 -top-16 size-44 rounded-full bg-brand-purple/10 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-bold leading-7 text-brand-light/80">
                  {content.intro}
                </p>
                <div className="mt-7 rounded-3xl border border-brand-purple/25 bg-ink/70 p-5">
                  <ActiveIcon className="mb-5 size-7 text-brand-purple" aria-hidden="true" />
                  <p className="font-poppins text-4xl font-black leading-none text-brand-white sm:text-5xl">
                    {activeCard.value}
                  </p>
                  <h3 className="mt-4 text-lg font-black text-brand-white">
                    {activeCard.title}
                  </h3>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-purple shadow-glow transition-all duration-300"
                      style={{
                        width: `${((activeReward + 1) / content.pdfCards.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="mt-5 rounded-2xl border border-brand-purple/15 bg-white/[0.035] p-4 text-sm font-bold leading-7 text-brand-light/75">
                  {content.note}
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="grid gap-4">
          {content.pdfCards.map((card, index) => {
            const Icon = icons[index];
            const isActive = activeReward === index;

            return (
              <GlassCard
                key={card.title}
                data-reward-card=""
                className={`h-full scale-[0.985] border-brand-purple/20 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 transition-colors sm:p-6 ${
                  isActive ? "border-brand-purple/55 bg-white/[0.075]" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-purple/25 bg-brand-purple/10 ${
                      isActive ? "shadow-glow" : ""
                    }`}
                  >
                    <Icon className="size-5 text-brand-purple" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-poppins text-2xl font-black text-brand-purple">
                      {card.value}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-brand-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-light/80">
                      {card.text}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
          </div>
        </div>
      </div>
    </Section>
  );
}
