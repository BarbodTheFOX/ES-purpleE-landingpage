"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MixedText } from "@/components/ui/DirectionalText";
import { Section } from "@/components/ui/Section";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

export function HowItWorksSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const content = siteContent.howItWorks;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-how-card]", { opacity: 1, y: 0 });
        gsap.set("[data-how-progress]", { scaleX: 1 });
        return;
      }

      gsap.set("[data-how-progress]", {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap.to("[data-how-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
          end: "bottom 48%",
          scrub: true,
        },
      });

      gsap.from("[data-how-card]", {
        opacity: 0,
        y: 26,
        duration: 0.68,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-how-step-card]").forEach((card, index) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 62%",
            end: "bottom 38%",
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
            toggleActions: "play reverse play reverse",
          },
        }).to(card, {
          borderColor: "rgba(143, 0, 255, 0.52)",
          boxShadow: "0 20px 60px rgba(143, 0, 255, 0.16)",
          duration: 0.22,
          ease: "power2.out",
        });
      });
    },
    { scope },
  );

  return (
    <Section eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-5">
        <div className="relative rounded-3xl border border-brand-purple/15 bg-white/[0.03] p-4 sm:p-5 lg:p-6">
          <div className="absolute left-6 right-6 top-[3.6rem] hidden h-px bg-white/10 lg:block" />
          <div
            data-how-progress=""
            className="absolute left-6 right-6 top-[3.6rem] hidden h-px bg-brand-purple shadow-glow lg:block"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.title}
                  data-how-card=""
                  data-how-step-card=""
                  className={`relative h-full rounded-2xl border border-brand-purple/20 bg-ink/65 p-5 transition-colors ${
                    isActive ? "border-brand-purple/55 bg-white/[0.065]" : ""
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className={`relative z-10 flex size-10 items-center justify-center rounded-full border border-brand-purple/45 text-sm font-black text-brand-white transition ${
                        isActive
                          ? "bg-brand-purple shadow-glow"
                          : "bg-night text-brand-light"
                      }`}
                    >
                      {persianNumberFormatter.format(index + 1)}
                    </span>
                    {index < content.steps.length - 1 && (
                      <ArrowLeft className="hidden size-5 text-brand-purple/70 lg:block" />
                    )}
                  </div>
                  <h3 className="text-lg font-black text-brand-white">
                    <MixedText text={step.title} />
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-light/75">
                    <MixedText text={step.text} />
                  </p>
                  {isActive && (
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-brand-purple/10 px-3 py-1 text-xs font-black text-brand-light">
                      <CheckCircle2 className="size-4 text-brand-purple" aria-hidden="true" />
                      قدم فعال
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div data-how-card="" className="grid gap-3 sm:max-w-sm">
          <Button href="#registration" className="w-full">
            {content.cta}
          </Button>
          <p className="text-sm font-bold leading-7 text-brand-gray">
            <MixedText text={content.microCopy} />
          </p>
        </div>
      </div>
    </Section>
  );
}
