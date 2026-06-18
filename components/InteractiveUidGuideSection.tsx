"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MixedText } from "@/components/ui/DirectionalText";
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

export function InteractiveUidGuideSection() {
  const scope = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const content = siteContent.howItWorks;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-join-copy], [data-join-step], [data-join-node]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set("[data-join-line]", { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        "[data-join-copy]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 76%",
          },
        },
      );

      gsap.fromTo(
        "[data-join-line]",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.3,
          },
        },
      );

      ScrollTrigger.batch("[data-join-step]", {
        start: "top 82%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.62,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });

      ScrollTrigger.batch("[data-join-node]", {
        start: "top 82%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { scale: 0.86 },
            {
              scale: 1,
              duration: 0.48,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: true,
            },
          );
        },
      });

      const triggers = gsap.utils
        .toArray<HTMLElement>("[data-join-step]")
        .map((card, index) =>
          ScrollTrigger.create({
            trigger: card,
            start: "top 66%",
            end: "bottom 38%",
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          }),
        );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="how-to-join"
      className="relative px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12">
          <div data-join-copy="" className="lg:sticky lg:top-28">
            <p className="mb-3 text-sm font-bold text-brand-purple">
              <MixedText text={content.eyebrow} />
            </p>
            <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
              <MixedText text={content.title} />
            </h2>
            <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-brand-light/78 sm:text-base sm:leading-8">
              <MixedText text={content.intro} />
            </p>
            <div className="mt-7 hidden lg:block">
              <Button href="#registration">{content.cta}</Button>
              <p className="mt-4 text-sm font-bold leading-7 text-brand-gray">
                <MixedText text={content.microCopy} />
              </p>
            </div>
          </div>

          <div className="relative rounded-[1.5rem] border border-brand-purple/14 bg-white/[0.025] p-4 sm:p-5 lg:rounded-[2rem] lg:p-7">
            <div
              className="pointer-events-none absolute bottom-8 right-8 top-8 w-px bg-white/10 sm:right-9 lg:right-12"
              aria-hidden="true"
            >
              <div
                data-join-line=""
                className="absolute inset-x-0 top-0 h-full w-px origin-top scale-y-0 bg-brand-purple shadow-[0_0_24px_rgba(143,0,255,0.55)]"
              />
            </div>

            <div className="relative space-y-4 sm:space-y-5">
              {content.steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPassed = activeStep > index;

                return (
                  <article
                    key={step.title}
                    data-join-step=""
                    className={`relative flex gap-4 rounded-2xl border p-4 pr-0 opacity-0 transition duration-300 sm:gap-5 sm:p-5 sm:pr-0 lg:rounded-3xl lg:p-5 lg:pr-0 ${
                      isActive
                        ? "border-brand-purple/55 bg-brand-purple/10 shadow-[0_18px_45px_rgba(143,0,255,0.14)]"
                        : "border-brand-purple/14 bg-ink/58"
                    }`}
                  >
                    <span
                      data-join-node=""
                      className={`relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-black transition sm:size-11 ${
                        isActive || isPassed
                          ? "border-brand-purple bg-brand-purple text-brand-white shadow-glow"
                          : "border-brand-purple/25 bg-night text-brand-light"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                      ) : (
                        persianNumberFormatter.format(index + 1)
                      )}
                    </span>
                    <div className="min-w-0 flex-1 py-0.5 pl-1 pr-3 sm:pr-4">
                      <p className="mb-1.5 text-xs font-black text-brand-purple/90">
                        مرحله {persianNumberFormatter.format(index + 1)}
                      </p>
                      <h3 className="text-base font-black leading-7 text-brand-white sm:text-lg">
                        <MixedText text={step.title} />
                      </h3>
                      <p className="mt-2 text-sm font-bold leading-7 text-brand-light/75">
                        <MixedText text={step.text} />
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 lg:hidden">
              <Button href="#registration" className="w-full">
                {content.cta}
              </Button>
              <p className="mt-3 text-center text-xs font-bold leading-6 text-brand-gray">
                <MixedText text={content.microCopy} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
