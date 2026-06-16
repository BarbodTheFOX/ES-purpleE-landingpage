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
  const activeIndexRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const content = siteContent.howItWorks;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-uid-step]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-uid-step]", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-uid-step-card]").forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 72%",
          end: "bottom 42%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const stage = scope.current?.querySelector<HTMLElement>("[data-uid-stage]");

        if (!scope.current || !stage) {
          return undefined;
        }

        const trigger = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${content.steps.length * 460}`,
          pin: stage,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              content.steps.length - 1,
              Math.floor(self.progress * content.steps.length),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveStep(nextIndex);
            }
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
      className="relative px-5 py-10 sm:px-6 lg:min-h-screen lg:px-8 lg:py-0"
    >
      <div
        data-uid-stage=""
        className="mx-auto flex w-full max-w-6xl flex-col justify-center lg:min-h-screen"
      >
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
            <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-brand-light/78 sm:mt-5 sm:leading-8">
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
            <div className="relative hidden pb-8 lg:block">
              <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
              <div
                className="absolute right-0 top-5 h-px bg-brand-purple shadow-glow transition-all duration-300"
                style={{ width: `${((activeStep + 1) / content.steps.length) * 100}%` }}
              />
              <div className="relative grid grid-cols-3 gap-4">
                {content.steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = activeStep > index;

                  return (
                    <div key={step.title} data-uid-step="">
                      <span
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
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {content.steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <div
                    key={step.title}
                    data-uid-step=""
                    data-uid-step-card=""
                    className={`rounded-2xl border p-4 transition duration-300 lg:rounded-3xl lg:p-5 ${
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
                  </div>
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
