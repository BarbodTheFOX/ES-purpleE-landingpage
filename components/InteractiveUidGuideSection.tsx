"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
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
        gsap.set("[data-uid-intro], [data-uid-step-card]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set("[data-uid-progress]", { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        "[data-uid-intro]",
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
        "[data-uid-progress]",
        { scaleX: 0, transformOrigin: "right center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 78%",
            end: "bottom 60%",
            scrub: 0.3,
          },
        },
      );

      ScrollTrigger.batch("[data-uid-step-card]", {
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

      const triggers = gsap.utils
        .toArray<HTMLElement>("[data-uid-step-card]")
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
      className="relative px-5 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div data-uid-intro="">
            <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
            <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-brand-light/78 sm:text-base sm:leading-8">
              مسیر ورود کوتاه است: ثبت‌نام با لینک Eventum، برداشتن UID، و ثبت اطلاعات همین‌جا.
            </p>
            <div className="mt-7 hidden lg:block">
              <Button href="#registration">{content.cta}</Button>
              <p className="mt-4 text-sm font-bold leading-7 text-brand-gray">
                {content.microCopy}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-brand-purple/14 bg-white/[0.03] p-3.5 sm:p-5 lg:rounded-[2rem] lg:p-7">
            <div className="relative mb-6 hidden lg:block">
              <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
              <div
                data-uid-progress=""
                className="absolute right-0 top-5 h-px bg-brand-purple shadow-glow"
              />
              <div className="relative grid grid-cols-3 gap-4">
                {content.steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = activeStep > index;

                  return (
                    <span
                      key={step.title}
                      className={`relative z-10 flex size-10 items-center justify-center rounded-full border text-sm font-black transition ${
                        isActive || isPassed
                          ? "border-brand-purple bg-brand-purple text-brand-white shadow-glow"
                          : "border-brand-purple/25 bg-night text-brand-gray"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                      ) : (
                        persianNumberFormatter.format(index + 1)
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {content.steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <article
                    key={step.title}
                    data-uid-step-card=""
                    className={`rounded-2xl border p-4 opacity-0 transition duration-300 lg:rounded-3xl lg:p-5 ${
                      isActive
                        ? "border-brand-purple/55 bg-brand-purple/10 shadow-[0_18px_45px_rgba(143,0,255,0.14)]"
                        : "border-brand-purple/15 bg-ink/62"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between lg:mb-5">
                      <span
                        className={`flex size-9 items-center justify-center rounded-full border text-sm font-black lg:size-10 ${
                          isActive
                            ? "border-brand-purple bg-brand-purple text-brand-white"
                            : "border-brand-purple/25 bg-night text-brand-light"
                        }`}
                      >
                        {persianNumberFormatter.format(index + 1)}
                      </span>
                      {index < content.steps.length - 1 && (
                        <ArrowLeft className="hidden size-5 text-brand-purple/60 lg:block" />
                      )}
                    </div>
                    <h3 className="text-base font-black text-brand-white lg:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold leading-7 text-brand-light/75 lg:mt-3">
                      {step.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 lg:hidden">
              <Button href="#registration" className="w-full">
                {content.cta}
              </Button>
              <p className="mt-3 text-center text-xs font-bold leading-6 text-brand-gray">
                {content.microCopy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
