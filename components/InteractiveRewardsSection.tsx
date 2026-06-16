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

const mobileRewardTexts = [
  "جوایز اصلی کمپین برای شرکت‌کنندگان واجد شرایط.",
  "۲۴ بونوس ۵۰ دلاری در طول مسیر کمپین.",
  "دسترسی VIP Level 3 برای همراهان منتخب.",
  "ورود به مسیر کمپین‌ها و مسابقات TCP.",
  "شانس حضور در ورکشاپ حضوری Eventum.",
  "کالکشن‌های پرمیوم برای ثبت‌نام معتبر.",
];

export function InteractiveRewardsSection() {
  const scope = useRef<HTMLElement | null>(null);
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
        gsap.set("[data-reward-intro], [data-reward-card]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        "[data-reward-intro]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 72%",
          },
        },
      );

      ScrollTrigger.batch("[data-reward-card]", {
        start: "top 82%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 32, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.68,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="rewards"
      className="relative overflow-hidden px-5 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div data-reward-intro="" className="mb-7 max-w-3xl lg:mb-10">
          <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-brand-light/80 sm:text-base sm:leading-8">
            {content.intro}
          </p>
        </div>

        <div className="hidden grid-cols-3 gap-4 lg:grid">
          {content.pdfCards.map((card, index) => {
            const Icon = icons[index];
            const isFeatured = index === 0;

            return (
              <article
                key={card.title}
                data-reward-card=""
                className={`group rounded-[1.75rem] border bg-white/[0.035] p-6 opacity-0 transition duration-300 hover:-translate-y-1 hover:border-brand-purple/55 hover:bg-white/[0.055] ${
                  isFeatured
                    ? "col-span-2 min-h-[22rem] border-brand-purple/45 bg-brand-purple/10"
                    : "border-brand-purple/16"
                }`}
              >
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-brand-purple/25 bg-brand-purple/10">
                    <Icon className="size-6 text-brand-purple" aria-hidden="true" />
                  </span>
                  <span className="font-poppins text-xs font-black text-brand-gray">
                    {persianNumberFormatter.format(index + 1)}
                  </span>
                </div>
                <p
                  className={`font-poppins font-black leading-none text-brand-white ${
                    isFeatured ? "text-5xl" : "text-3xl"
                  }`}
                >
                  {card.value}
                </p>
                <h3 className="mt-5 text-xl font-black text-brand-white">{card.title}</h3>
                <p className="mt-4 text-sm font-bold leading-8 text-brand-light/78">
                  {card.text}
                </p>
                {"eligibility" in card && (
                  <span className="mt-5 inline-flex rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-xs font-black text-brand-light">
                    {card.eligibility}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div
          dir="ltr"
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
          onScroll={(event) => {
            const rail = event.currentTarget;
            const card = rail.firstElementChild as HTMLElement | null;

            if (!card) {
              return;
            }

            const gap = 12;
            const nextIndex = Math.round(rail.scrollLeft / (card.offsetWidth + gap));
            setActiveReward(Math.max(0, Math.min(content.pdfCards.length - 1, nextIndex)));
          }}
        >
          {content.pdfCards.map((card, index) => {
            const Icon = icons[index];
            const isFeatured = index === 0;

            return (
              <article
                key={card.title}
                data-reward-card=""
                dir="rtl"
                className={`min-w-[82%] snap-center rounded-3xl border p-5 opacity-0 sm:min-w-[21rem] ${
                  isFeatured
                    ? "border-brand-purple/45 bg-brand-purple/10 shadow-[0_18px_50px_rgba(143,0,255,0.18)]"
                    : "border-brand-purple/16 bg-white/[0.045]"
                }`}
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
                <h3 className="mt-3 text-lg font-black text-brand-white">{card.title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-brand-light/78 sm:hidden">
                  {mobileRewardTexts[index]}
                </p>
                <p className="mt-3 hidden text-sm font-bold leading-7 text-brand-light/78 sm:block">
                  {card.text}
                </p>
                {"eligibility" in card && (
                  <span className="mt-4 inline-flex rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-xs font-black text-brand-light">
                    {card.eligibility}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
          {content.pdfCards.map((card, index) => (
            <span
              key={card.title}
              className={`h-1.5 rounded-full transition-all ${
                activeReward === index ? "w-6 bg-brand-purple" : "w-1.5 bg-brand-light/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
