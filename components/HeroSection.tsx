"use client";

import { Sparkles } from "lucide-react";
import { useRef } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { bitunixReferralUrl, siteContent } from "@/lib/content";

export function HeroSection() {
  const scope = useRef<HTMLElement | null>(null);
  const content = siteContent.hero;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      });

      gsap.to("[data-hero-depth]", {
        y: -30,
        opacity: 0.82,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative overflow-hidden px-5 pb-6 pt-5 sm:px-6 sm:pt-11 lg:px-8 lg:pb-14 lg:pt-14"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[linear-gradient(180deg,rgba(143,0,255,0.18),transparent_72%)]" />
      <div
        data-hero-depth=""
        className="absolute left-1/2 top-8 -z-10 h-56 w-[42rem] -translate-x-1/2 rotate-[-8deg] rounded-[4rem] border border-brand-purple/10 bg-brand-purple/[0.13] blur-3xl"
      />
      <div
        data-hero-depth=""
        className="absolute -left-20 top-36 -z-10 h-52 w-72 rotate-12 rounded-[3rem] border border-brand-pink/10 bg-brand-pink/[0.055] blur-3xl"
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-brand-purple/60 to-transparent" />
      <div className="mx-auto grid max-w-6xl items-start gap-5 sm:gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div data-hero-reveal="" className="order-2 lg:order-1">
          <RegistrationForm />
        </div>

        <div className="order-1 lg:order-2 lg:pt-10">
          <p
            data-hero-reveal=""
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white/[0.045] px-3 py-1.5 text-xs font-bold text-brand-light sm:mb-4 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1
            data-hero-reveal=""
            className="max-w-4xl text-[2.12rem] font-black leading-[1.14] text-brand-white sm:text-6xl lg:text-7xl"
          >
            {content.title}
          </h1>
          <p
            data-hero-reveal=""
            className="mt-3 max-w-2xl text-sm font-bold leading-7 text-brand-light/85 sm:mt-5 sm:text-lg sm:font-normal lg:leading-9"
          >
            {content.subtitle}
          </p>
          <p
            data-hero-reveal=""
            className="mt-3 text-sm font-black text-brand-purple sm:mt-4"
          >
            {content.supportLine}
          </p>

          <div data-hero-reveal="" className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Button
              href="#registration"
              className="w-full border border-brand-purple/70 bg-brand-purple px-6 shadow-[0_0_40px_rgba(143,0,255,0.42)] hover:scale-[1.01] hover:bg-brand-purple sm:w-auto"
            >
              {content.primaryCta}
            </Button>
            <Button
              href={bitunixReferralUrl}
              target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
              rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
              variant="secondary"
              className="hidden w-full border-brand-purple/35 bg-ink/65 shadow-pink-glow sm:inline-flex sm:w-auto"
            >
              {content.referralCta}
            </Button>
          </div>

          <div
            data-hero-reveal=""
            className="mt-6 hidden flex-col gap-3 text-sm text-brand-light/75 sm:mt-7 sm:flex sm:flex-row sm:items-center"
          >
            <span className="rounded-full border border-brand-yellow/35 bg-brand-yellow/10 px-4 py-2 font-bold text-brand-yellow">
              {content.capacity}
            </span>
            <span>{content.note}</span>
          </div>

          <div
            data-hero-reveal=""
            className="mt-8 hidden rounded-3xl border border-brand-purple/15 bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-5 sm:block"
          >
            <p className="text-xs font-black text-brand-purple">Purple Evolution</p>
            <p className="mt-3 text-sm font-bold leading-7 text-brand-light/80">
              مسیر آموزشی ۸ اپیزودی برای شناخت رفتار، احساسات و تصمیم‌های تریدر در بازار.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
