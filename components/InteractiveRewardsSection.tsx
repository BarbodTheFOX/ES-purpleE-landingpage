"use client";

import { Crown, FileText, Gift, Route, Trophy, WalletCards } from "lucide-react";
import { useRef, useState } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

export function InteractiveRewardsSection() {
  const scope = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeReward, setActiveReward] = useState(0);
  const content = siteContent.rewards;
  const icons = [Trophy, Gift, Crown, Route, WalletCards, FileText];
  const mobileRewardTexts = [
    "جوایز اصلی کمپین برای شرکت‌کنندگان واجد شرایط.",
    "۲۴ بونوس ۵۰ دلاری در طول مسیر کمپین.",
    "دسترسی VIP Level 3 برای همراهان منتخب.",
    "ورود به مسیر کمپین‌ها و مسابقات TCP.",
    "شانس حضور در ورکشاپ حضوری Eventum.",
    "کالکشن‌های پرمیوم برای ثبت‌نام معتبر.",
  ];
  const ActiveIcon = icons[activeReward];
  const activeCard = content.pdfCards[activeReward];

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-reward-mobile-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-reward-mobile-card]", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const stage = scope.current?.querySelector<HTMLElement>("[data-reward-stage]");

        if (!scope.current || !stage) {
          return undefined;
        }

        const trigger = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${content.pdfCards.length * 520}`,
          pin: stage,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              content.pdfCards.length - 1,
              Math.floor(self.progress * content.pdfCards.length),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveReward(nextIndex);
            }
          },
        });

        gsap.from("[data-reward-stage-copy]", {
          opacity: 0,
          y: 26,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 65%",
          },
        });

        return () => trigger.kill();
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="rewards"
      className="relative overflow-hidden py-10 lg:min-h-screen lg:px-8 lg:py-0"
    >
      <div className="absolute inset-x-0 top-0 hidden h-px bg-gradient-to-l from-transparent via-brand-purple/45 to-transparent lg:block" />
      <div
        data-reward-stage=""
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 sm:px-6 lg:min-h-screen lg:px-0"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div data-reward-stage-copy="">
            <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
            <h2 className="max-w-xl text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-brand-light/80 sm:mt-5 sm:text-base sm:leading-8">
              {content.intro}
            </p>

            <div className="mt-8 hidden lg:block">
              <div className="mb-4 flex items-center justify-between text-xs font-black text-brand-gray">
                <span>پیشرفت مزایا</span>
                <span>
                  {persianNumberFormatter.format(activeReward + 1)} /{" "}
                  {persianNumberFormatter.format(content.pdfCards.length)}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-purple shadow-glow transition-all duration-300"
                  style={{
                    width: `${((activeReward + 1) / content.pdfCards.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div data-reward-stage-copy="" className="relative">
            <div className="hidden rounded-[2rem] border border-brand-purple/20 bg-white/[0.035] p-5 lg:block">
              <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-brand-purple/15 bg-ink/80 p-8">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-brand-purple/70 to-transparent" />
                <div className="flex items-start justify-between gap-6">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-brand-purple/30 bg-brand-purple/10">
                    <ActiveIcon className="size-7 text-brand-purple" aria-hidden="true" />
                  </span>
                  <span className="font-poppins text-sm font-black text-brand-gray">
                    {persianNumberFormatter.format(activeReward + 1).padStart(2, "۰")}
                  </span>
                </div>

                <div className="mt-12">
                  {content.pdfCards.map((card, index) => {
                    const isActive = activeReward === index;

                    return (
                      <div
                        key={card.title}
                        className={`absolute inset-x-8 bottom-8 transition duration-500 ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                        aria-hidden={!isActive}
                      >
                        <p className="font-poppins text-5xl font-black leading-none text-brand-white">
                          {card.value}
                        </p>
                        <h3 className="mt-5 text-2xl font-black text-brand-white">
                          {card.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm font-bold leading-8 text-brand-light/78">
                          {card.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2">
                {content.pdfCards.map((card, index) => {
                  const Icon = icons[index];
                  const isActive = activeReward === index;

                  return (
                    <button
                      key={card.title}
                      type="button"
                      onClick={() => {
                        activeIndexRef.current = index;
                        setActiveReward(index);
                      }}
                      className={`flex min-h-14 items-center justify-center rounded-2xl border transition ${
                        isActive
                          ? "border-brand-purple bg-brand-purple/18 shadow-glow"
                          : "border-brand-purple/15 bg-white/[0.03] text-brand-gray"
                      }`}
                      aria-label={card.title}
                    >
                      <Icon
                        className={isActive ? "size-5 text-brand-purple" : "size-5 text-brand-gray"}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
              {content.pdfCards.map((card, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={card.title}
                    data-reward-mobile-card=""
                    className="min-w-[82%] snap-center rounded-3xl border border-brand-purple/16 bg-white/[0.045] p-5 sm:min-w-[21rem]"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-purple/10">
                        <Icon className="size-5 text-brand-purple" aria-hidden="true" />
                      </span>
                      <span className="font-poppins text-xs font-black text-brand-gray">
                        {persianNumberFormatter.format(index + 1)}
                      </span>
                    </div>
                    <p className="font-poppins text-2xl font-black text-brand-purple">
                      {card.value}
                    </p>
                    <h3 className="mt-3 text-lg font-black text-brand-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-7 text-brand-light/78 sm:hidden">
                      {mobileRewardTexts[index]}
                    </p>
                    <p className="mt-3 hidden text-sm font-bold leading-7 text-brand-light/78 sm:block">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
