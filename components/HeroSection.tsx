"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
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

      gsap.from("[data-hero-label]", {
        opacity: 0,
        y: 18,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.to("[data-hero-orb]", {
        y: -54,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
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

      gsap.to("[data-scroll-cue]", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.15,
        ease: "sine.inOut",
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative overflow-hidden px-5 pb-14 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-radial-purple" />
      <div
        data-hero-depth=""
        className="absolute left-1/2 top-10 -z-10 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-brand-purple/[0.18] blur-3xl"
      />
      <div
        data-hero-depth=""
        className="absolute -left-24 top-32 -z-10 size-64 rounded-full bg-brand-pink/[0.08] blur-3xl"
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-brand-purple/60 to-transparent" />
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <p
            data-hero-reveal=""
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white/[0.06] px-4 py-2 text-xs font-bold text-brand-light sm:text-sm"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1
            data-hero-reveal=""
            className="max-w-4xl text-[2.45rem] font-black leading-[1.14] text-brand-white sm:text-6xl lg:text-7xl"
          >
            {content.title}
          </h1>
          <p
            data-hero-reveal=""
            className="mt-5 max-w-2xl text-base leading-8 text-brand-light/85 sm:text-lg lg:leading-9"
          >
            {content.subtitle}
          </p>
          <p
            data-hero-reveal=""
            className="mt-4 text-sm font-black text-brand-purple"
          >
            {content.supportLine}
          </p>

          <div data-hero-reveal="" className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              className="w-full border-brand-purple/35 bg-ink/65 shadow-pink-glow sm:w-auto"
            >
              {content.referralCta}
            </Button>
          </div>

          <div
            data-hero-reveal=""
            className="mt-6 flex flex-col gap-3 text-sm text-brand-light/75 sm:mt-7 sm:flex-row sm:items-center"
          >
            <span className="rounded-full border border-brand-yellow/35 bg-brand-yellow/10 px-4 py-2 font-bold text-brand-yellow">
              {content.capacity}
            </span>
            <span>{content.note}</span>
          </div>

          <div
            data-hero-reveal=""
            className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-2xl"
          >
            {content.stats.map((stat) => (
              <span
                key={stat}
                className="rounded-2xl border border-brand-purple/15 bg-white/[0.045] px-3 py-2 text-center text-xs font-black text-brand-light"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-reveal="" className="pt-2 lg:pt-0">
          <GlassCard className="relative min-h-[320px] overflow-hidden border-brand-purple/20 p-5 shadow-soft-purple sm:min-h-[410px] sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(143,0,255,0.14),transparent_36%),radial-gradient(circle_at_54%_42%,rgba(143,0,255,0.18),transparent_34%)]" />
            <div
              data-hero-orb=""
              className="absolute left-1/2 top-1/2 size-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/[0.28] blur-3xl sm:size-[23rem]"
            />
            <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-l from-transparent via-brand-purple/50 to-transparent" />
            <div className="absolute bottom-12 left-8 h-px w-28 rotate-[-28deg] bg-gradient-to-l from-brand-purple/50 to-transparent" />
            <div className="absolute right-7 top-8 rounded-2xl border border-brand-purple/20 bg-ink/65 px-4 py-3 backdrop-blur">
              <p className="font-poppins text-3xl font-black text-brand-white">
                {content.visual.centerNumber}
              </p>
              <p className="mt-1 text-xs font-bold text-brand-light">
                {content.visual.centerLabel}
              </p>
            </div>
            <div data-hero-label="" className="absolute bottom-7 right-7 max-w-[15rem] rounded-2xl border border-brand-purple/20 bg-ink/70 p-4 backdrop-blur">
              <p className="text-xs font-black text-brand-purple">Purple Evolution</p>
              <p className="mt-3 text-sm font-bold leading-7 text-brand-light">
                روانشناسی ترید، کنترل هیجان، روتین و تصمیم‌گیری
              </p>
            </div>
            <div className="absolute left-7 top-24 hidden max-w-[10rem] rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-xs font-bold leading-6 text-brand-light sm:block">
              مسیر ذهنی تریدر، نه سیگنال معاملاتی
            </div>
            <a
              data-scroll-cue=""
              href="#journey"
              className="absolute bottom-5 left-5 inline-flex size-11 items-center justify-center rounded-full border border-brand-purple/20 bg-white/10 text-brand-light transition hover:bg-white/[0.15]"
              aria-label={content.visual.journeyAria}
            >
              <ArrowDown className="size-5" aria-hidden="true" />
            </a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
