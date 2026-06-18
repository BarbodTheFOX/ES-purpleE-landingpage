"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";
import { MixedText } from "@/components/ui/DirectionalText";
import { siteContent } from "@/lib/content";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

const mobileRewardTexts = [
  "جوایز اصلی کمپین برای شرکت‌کنندگان واجد شرایط.",
  "۲۴ بونوس ۵۰ دلاری در طول مسیر کمپین.",
  "دسترسی VIP Level 3 برای همراهان منتخب.",
  "۴۰۰ ظرفیت عمومی برای دسترسی به چنل VIP.",
  "سه فایل اختصاصی برای ثبت‌نام معتبر.",
  "ثبت UID از مسیر Eventum و Bitunix.",
];

const rewardAssets = [
  "bnb_coin.png",
  "bonus_voucher.png",
  "vip_emblem.png",
  "access_card.png",
  "pdf_folder.png",
  "reward_box.png",
];

export function InteractiveRewardsSection() {
  const scope = useRef<HTMLElement | null>(null);
  const [activeReward, setActiveReward] = useState(0);
  const content = siteContent.rewards;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-reward-intro], [data-reward-card], [data-reward-value], [data-reward-asset]", {
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

      gsap.fromTo(
        "[data-reward-value]",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.52,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 68%",
          },
        },
      );

      gsap.to("[data-reward-asset]", {
        y: -6,
        rotation: 1.5,
        duration: 3.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.14,
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
          <p className="mb-3 text-sm font-bold text-brand-purple">
            <MixedText text={content.eyebrow} />
          </p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
            <MixedText text={content.title} />
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-brand-light/80 sm:text-base sm:leading-8">
            <MixedText text={content.intro} />
          </p>
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          {(() => {
            const featured = content.pdfCards[0];

            return (
              <article
                data-reward-card=""
                className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-brand-purple/45 bg-brand-purple/10 p-8 opacity-0"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-brand-purple/70 to-transparent" />
                <Image
                  data-reward-asset=""
                  src="/assets/purple-evolution/bnb_coin.png"
                  alt=""
                  width={260}
                  height={260}
                  className="absolute left-5 top-8 w-28 opacity-85 drop-shadow-[0_22px_32px_rgba(0,0,0,0.42)]"
                />
                <Image
                  data-reward-asset=""
                  src="/assets/purple-evolution/sol_coin.png"
                  alt=""
                  width={260}
                  height={260}
                  className="absolute bottom-8 left-24 w-24 opacity-80 drop-shadow-[0_22px_32px_rgba(0,0,0,0.42)]"
                />
                <div className="mb-10 flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-brand-purple/30 bg-ink/60">
                    <Image
                      data-reward-asset=""
                      src="/assets/purple-evolution/reward_box.png"
                      alt=""
                      width={96}
                      height={96}
                      className="h-11 w-11 object-contain"
                    />
                  </span>
                  {"eligibility" in featured && (
                    <span className="rounded-full border border-brand-purple/25 bg-ink/60 px-4 py-2 text-xs font-black text-brand-light">
                      <MixedText text={featured.eligibility} />
                    </span>
                  )}
                </div>
                <p
                  data-reward-value=""
                  className="font-poppins text-6xl font-black leading-none text-brand-white drop-shadow-[0_0_28px_rgba(143,0,255,0.20)]"
                >
                  <MixedText text={featured.value} />
                </p>
                <h3 className="mt-6 text-2xl font-black text-brand-white">
                  <MixedText text={featured.title} />
                </h3>
                <p className="mt-5 max-w-2xl text-sm font-bold leading-8 text-brand-light/78">
                  <MixedText text={featured.text} />
                </p>
              </article>
            );
          })()}

          <div className="grid gap-3">
            {content.pdfCards.slice(1).map((card, index) => {
              const image = rewardAssets[index + 1];

              return (
                <article
                  key={card.title}
                  data-reward-card=""
                  className="group flex items-start gap-4 rounded-3xl border border-brand-purple/14 bg-white/[0.03] p-4 opacity-0 transition hover:border-brand-purple/40 hover:bg-white/[0.05]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10">
                    <Image
                      data-reward-asset=""
                      src={`/assets/purple-evolution/${image}`}
                      alt=""
                      width={72}
                      height={72}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p
                        data-reward-value=""
                        className="font-poppins text-2xl font-black text-brand-white drop-shadow-[0_0_20px_rgba(143,0,255,0.18)]"
                      >
                        <MixedText text={card.value} />
                      </p>
                      {"eligibility" in card && (
                        <span className="rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-[0.68rem] font-black text-brand-light">
                          <MixedText text={card.eligibility} />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-black text-brand-white">
                      <MixedText text={card.title} />
                    </h3>
                    <p className="mt-2 text-sm font-bold leading-7 text-brand-light/72">
                      <MixedText text={card.text} />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
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
            const isFeatured = index === 0;
            const image = rewardAssets[index];

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
                    <Image
                      data-reward-asset=""
                      src={`/assets/purple-evolution/${image}`}
                      alt=""
                      width={72}
                      height={72}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  <span className="font-poppins text-xs font-black text-brand-gray">
                    {persianNumberFormatter.format(index + 1)}
                  </span>
                </div>
                <p
                  data-reward-value=""
                  className="font-poppins text-2xl font-black text-brand-purple drop-shadow-[0_0_18px_rgba(143,0,255,0.20)]"
                >
                  <MixedText text={card.value} />
                </p>
                <h3 className="mt-3 text-lg font-black text-brand-white">
                  <MixedText text={card.title} />
                </h3>
                <p className="mt-3 text-sm font-bold leading-7 text-brand-light/78 sm:hidden">
                  <MixedText text={mobileRewardTexts[index]} />
                </p>
                <p className="mt-3 hidden text-sm font-bold leading-7 text-brand-light/78 sm:block">
                  <MixedText text={card.text} />
                </p>
                {"eligibility" in card && (
                  <span className="mt-4 inline-flex rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-xs font-black text-brand-light">
                    <MixedText text={card.eligibility} />
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
