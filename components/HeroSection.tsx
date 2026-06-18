"use client";

import { ExternalLink, Gift, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroRewardHub } from "@/components/HeroRewardHub";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Button } from "@/components/ui/Button";
import { MixedText } from "@/components/ui/DirectionalText";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { bitunixReferralUrl, siteContent } from "@/lib/content";

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
        gsap.set("[data-hero-reveal], [data-hero-title-line]", {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        });
        return;
      }

      gsap.fromTo(
        "[data-hero-title-line]",
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to("[data-hero-glow]", {
        x: 18,
        y: 8,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
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
        <div
          data-hero-glow=""
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_18%,rgba(143,0,255,0.22),transparent_32%),linear-gradient(180deg,rgba(143,0,255,0.10),transparent_62%)]"
        />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-brand-purple/70 to-transparent" />
        <div
          data-hero-depth=""
          className="absolute left-1/2 top-16 -z-10 h-56 w-[34rem] -translate-x-1/2 -rotate-6 rounded-[3rem] border border-brand-purple/10 bg-brand-purple/[0.08] blur-3xl"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <HeroRewardHub stats={content.stats.slice(0, 6)} />
          </div>

          <div className="order-1 lg:order-2 lg:pt-3">
            <p
              data-hero-reveal=""
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white/[0.045] px-3 py-1.5 text-xs font-bold text-brand-light sm:px-4 sm:py-2 sm:text-sm"
            >
              <Gift className="size-4 text-brand-purple" aria-hidden="true" />
              <MixedText text={content.eyebrow} />
            </p>
            <h1
              aria-label={content.title}
              className="max-w-4xl text-right text-[2.05rem] font-black leading-[1.04] tracking-tight text-brand-white min-[380px]:text-[2.2rem] sm:text-5xl sm:leading-[1.03] lg:text-[3.45rem] xl:text-[3.9rem]"
            >
              <span data-hero-title-line="" className="block">
                وارد
              </span>
              <span data-hero-title-line="" className="block">
                <bdi dir="ltr" className="inline-block whitespace-nowrap">
                  Purple Evolution
                </bdi>
              </span>
              <span data-hero-title-line="" className="block">
                شو
              </span>
              <span
                data-hero-title-line=""
                className="mt-2 block whitespace-nowrap text-[0.68em] leading-[1.18] min-[380px]:text-[0.7em] sm:mt-3 sm:text-[0.72em] lg:text-[0.74em]"
              >
                برای جوایز و هدایای اختصاصی
              </span>
            </h1>
            <p
              data-hero-reveal=""
              className="mt-4 max-w-2xl text-sm font-bold leading-7 text-brand-light/86 sm:text-lg sm:leading-9"
            >
              <MixedText text={content.subtitle} />
            </p>
            <p data-hero-reveal="" className="mt-3 text-sm font-black text-brand-purple">
              <MixedText text={content.supportLine} />
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
                <MixedText text={content.capacity} />
              </span>
              <span>
                <MixedText text={content.note} />
              </span>
            </div>

            <a
              data-hero-reveal=""
              href={bitunixReferralUrl}
              target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
              rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
              className="mt-5 inline-flex items-center text-sm font-black text-brand-light/78 transition hover:text-brand-white"
            >
              <MixedText text="ثبت‌نام در Bitunix با لینک Eventum" />
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
                <p className="text-xs font-black text-brand-purple">
                  <MixedText text="Purple Evolution" />
                </p>
                <p className="text-sm font-black text-brand-white">
                  <MixedText text="ثبت‌نام Purple Evolution" />
                </p>
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
