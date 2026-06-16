"use client";

import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
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
  const content = siteContent.howItWorks;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-how-card]", { opacity: 1, y: 0 });
        return;
      }

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
    },
    { scope },
  );

  return (
    <Section eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.steps.map((step, index) => (
            <div key={step.title} data-how-card="">
              <div className="h-full rounded-2xl border border-brand-purple/20 bg-white/[0.045] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-purple text-sm font-black text-brand-white shadow-glow">
                    {persianNumberFormatter.format(index + 1)}
                  </span>
                  {index < content.steps.length - 1 && (
                    <ArrowLeft className="hidden size-5 text-brand-purple/70 lg:block" />
                  )}
                </div>
                <h3 className="text-lg font-black text-brand-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-light/75">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div data-how-card="" className="flex flex-col gap-3 sm:max-w-sm">
          <Button href="#registration" className="w-full">
            {content.cta}
          </Button>
          <p className="text-sm font-bold leading-7 text-brand-gray">
            {content.microCopy}
          </p>
        </div>
      </div>
    </Section>
  );
}
