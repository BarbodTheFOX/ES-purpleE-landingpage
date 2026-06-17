"use client";

import Image from "next/image";
import { ExternalLink, Gift, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { bitunixReferralUrl, siteContent } from "@/lib/content";

const assetPath = "/assets/purple-evolution/";

const floatingAssets = [
  {
    src: "bnb_coin.png",
    alt: "",
    className: "right-1 top-5 w-14 sm:right-8 sm:top-8 sm:w-24",
  },
  {
    src: "sol_coin.png",
    alt: "",
    className: "left-2 top-12 w-14 sm:left-10 sm:top-20 sm:w-24",
  },
  {
    src: "vip_emblem.png",
    alt: "",
    className: "right-7 bottom-7 w-16 sm:right-16 sm:bottom-12 sm:w-28",
  },
  {
    src: "bonus_voucher.png",
    alt: "",
    className: "left-5 bottom-9 w-16 sm:left-14 sm:bottom-16 sm:w-32",
  },
];

export function HeroSection() {
  const scope = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const content = siteContent.hero;

  useEffect(() => {
    if (!isFormOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFormOpen]);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-reveal], [data-hero-asset]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from("[data-hero-asset]", {
        opacity: 0,
        y: 22,
        scale: 0.94,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.to("[data-hero-depth]", {
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.35,
        },
      });
    },
    { scope },
  );

  useGSAP(
    () => {
      if (!isFormOpen || !modalRef.current || prefersReducedMotion()) {
        return;
      }

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" },
      );
    },
    { dependencies: [isFormOpen] },
  );

  return (
    <>
      <section
        ref={scope}
        id="top"
        className="relative overflow-hidden px-5 pb-7 pt-5 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-16 lg:pt-16"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_18%,rgba(143,0,255,0.22),transparent_32%),linear-gradient(180deg,rgba(143,0,255,0.10),transparent_62%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-brand-purple/70 to-transparent" />
        <div
          data-hero-depth=""
          className="absolute left-1/2 top-16 -z-10 h-56 w-[34rem] -translate-x-1/2 -rotate-6 rounded-[3rem] border border-brand-purple/10 bg-brand-purple/[0.08] blur-3xl"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <div
              data-hero-reveal=""
              className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border border-brand-purple/22 bg-white/[0.035] p-3 shadow-[0_22px_80px_rgba(0,0,0,0.34)] sm:rounded-[2rem] sm:p-6"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-brand-purple to-transparent" />
              <div className="relative min-h-[15.5rem] rounded-[1.25rem] border border-brand-purple/12 bg-[linear-gradient(145deg,rgba(143,0,255,0.12),rgba(255,255,255,0.025))] p-4 sm:min-h-[25rem] sm:rounded-[1.6rem] sm:p-5">
                <div className="absolute inset-5 rounded-[1.25rem] border border-brand-purple/10" />
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/25 bg-brand-purple/10 shadow-[0_0_70px_rgba(143,0,255,0.30)]" />
                <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-l from-transparent via-brand-purple/55 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-brand-purple/40 to-transparent" />

                {floatingAssets.map((asset) => (
                  <Image
                    key={asset.src}
                    data-hero-asset=""
                    src={`${assetPath}${asset.src}`}
                    alt={asset.alt}
                    width={220}
                    height={220}
                    priority
                    className={`absolute z-10 drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)] ${asset.className}`}
                  />
                ))}

                <div
                  data-hero-asset=""
                  className="absolute left-1/2 top-1/2 z-20 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.6rem] border border-brand-purple/35 bg-ink/80 p-3 shadow-[0_0_55px_rgba(143,0,255,0.28)] sm:size-32 sm:rounded-[2rem] sm:p-4"
                >
                  <Image
                    src={`${assetPath}reward_box.png`}
                    alt=""
                    width={160}
                    height={160}
                    className="h-auto w-16 sm:w-24"
                    priority
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:mt-4 sm:grid-cols-3">
                {content.stats.slice(0, 6).map((stat) => (
                  <span
                    key={stat}
                    data-hero-reveal=""
                    className="rounded-2xl border border-brand-purple/14 bg-ink/70 px-2.5 py-2 font-poppins text-[0.68rem] font-black text-brand-light sm:px-3 sm:text-xs"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pt-3">
            <p
              data-hero-reveal=""
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white/[0.045] px-3 py-1.5 text-xs font-bold text-brand-light sm:px-4 sm:py-2 sm:text-sm"
            >
              <Gift className="size-4 text-brand-purple" aria-hidden="true" />
              {content.eyebrow}
            </p>
            <h1
              data-hero-reveal=""
              aria-label={content.title}
              className="max-w-4xl text-[1.72rem] font-black leading-tight tracking-tight text-brand-white min-[380px]:text-[1.9rem] sm:text-5xl lg:text-[3.55rem] xl:text-[4rem]"
            >
              <span className="block">
                <span>وارد </span>
                <span className="inline-block whitespace-nowrap">Purple Evolution</span>
                <span> شو</span>
              </span>
              <span className="mt-1 block">برای جوایز و هدایای اختصاصی</span>
            </h1>
            <p
              data-hero-reveal=""
              className="mt-4 max-w-2xl text-sm font-bold leading-7 text-brand-light/86 sm:text-lg sm:leading-9"
            >
              {content.subtitle}
            </p>
            <p data-hero-reveal="" className="mt-3 text-sm font-black text-brand-purple">
              {content.supportLine}
            </p>

            <div data-hero-reveal="" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="w-full border border-brand-purple/70 px-7 shadow-[0_0_44px_rgba(143,0,255,0.35)] sm:w-auto"
              >
                {content.primaryCta}
              </Button>
              <Button
                href="#rewards"
                variant="secondary"
                className="w-full border-brand-purple/30 bg-ink/70 sm:w-auto"
              >
                {content.referralCta}
              </Button>
            </div>

            <div
              data-hero-reveal=""
              className="mt-5 flex flex-col gap-2 text-sm text-brand-light/76 sm:mt-7 sm:flex-row sm:items-center"
            >
              <span className="rounded-full border border-brand-yellow/32 bg-brand-yellow/10 px-4 py-2 font-black text-brand-yellow">
                {content.capacity}
              </span>
              <span>{content.note}</span>
            </div>

            <a
              data-hero-reveal=""
              href={bitunixReferralUrl}
              target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
              rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
              className="mt-5 inline-flex items-center text-sm font-black text-brand-light/78 transition hover:text-brand-white"
            >
              ثبت‌نام در Bitunix با لینک Eventum
              <ExternalLink className="mr-2 size-4 text-brand-purple" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-[80] bg-night/88 p-0 backdrop-blur-xl sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="فرم ثبت‌نام Purple Evolution"
        >
          <div
            ref={modalRef}
            className="relative h-full overflow-y-auto bg-night px-4 py-5 sm:mx-auto sm:h-auto sm:max-h-[calc(100vh-2.5rem)] sm:max-w-2xl sm:rounded-[2rem] sm:border sm:border-brand-purple/25 sm:bg-ink/95 sm:p-5"
          >
            <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-2xl border border-brand-purple/14 bg-ink/90 p-3 backdrop-blur">
              <div>
                <p className="text-xs font-black text-brand-purple">Purple Evolution</p>
                <p className="text-sm font-black text-brand-white">ثبت‌نام Purple Evolution</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-brand-purple/20 text-brand-light transition hover:border-brand-purple hover:text-brand-white"
                aria-label="بستن فرم"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <RegistrationForm id="registration-modal" />
          </div>
        </div>
      )}
    </>
  );
}
