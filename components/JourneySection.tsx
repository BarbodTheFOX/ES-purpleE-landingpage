"use client";

import { useRef } from "react";
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

export function JourneySection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.journey;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-journey-item]", { opacity: 1, y: 0 });
        gsap.set("[data-journey-progress]", { scaleY: 1 });
        gsap.set("[data-journey-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-journey-progress]", {
        transformOrigin: "top center",
        scaleY: 0,
      });

      gsap.to("[data-journey-progress]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      });

      gsap.from("[data-journey-item]", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 68%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-journey-item]").forEach((item) => {
        const node = item.querySelector<HTMLElement>("[data-journey-node]");
        const card = item.querySelector<HTMLElement>("[data-journey-card]");

        if (!node || !card) {
          return;
        }

        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 62%",
            end: "bottom 38%",
            toggleActions: "play reverse play reverse",
          },
        })
          .to(
            node,
            {
              scale: 1.1,
              boxShadow: "0 0 44px rgba(143, 0, 255, 0.68)",
              duration: 0.22,
              ease: "power2.out",
            },
            0,
          )
          .to(
            card,
            {
              borderColor: "rgba(143, 0, 255, 0.58)",
              boxShadow: "0 20px 70px rgba(143, 0, 255, 0.22)",
              backgroundColor: "rgba(255, 255, 255, 0.075)",
              duration: 0.22,
              ease: "power2.out",
            },
            0,
          );
      });
    },
    { scope },
  );

  return (
    <Section id="journey" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="relative mx-auto max-w-4xl py-4 lg:max-w-5xl">
        <div className="absolute right-5 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand-purple/5 via-brand-purple/20 to-brand-purple/5 lg:right-1/2 lg:translate-x-1/2" />
        <div
          data-journey-progress=""
          className="absolute right-5 top-6 h-[calc(100%-3rem)] w-px bg-brand-purple shadow-glow lg:right-1/2 lg:translate-x-1/2"
        />
        <div className="space-y-6">
        {content.steps.map((step, index) => {
          const isLeftDesktop = index % 2 === 0;

          return (
            <div
              key={step}
              data-journey-item=""
              className={`relative flex gap-4 pr-14 lg:w-1/2 lg:pr-0 ${
                isLeftDesktop
                  ? "lg:mr-auto lg:flex-row-reverse lg:pl-10"
                  : "lg:ml-auto lg:pr-10"
              }`}
            >
              <span
                data-journey-node=""
                className={`absolute right-0 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-brand-purple/50 bg-brand-purple text-sm font-black text-brand-white shadow-glow lg:top-5 ${
                  isLeftDesktop ? "lg:right-[-1.25rem]" : "lg:left-[-1.25rem] lg:right-auto"
                }`}
              >
                {persianNumberFormatter.format(index + 1)}
              </span>
              <div
                data-journey-card=""
                className="relative w-full rounded-2xl border border-brand-purple/20 bg-white/[0.055] p-5 backdrop-blur transition-colors"
              >
                <p className="mb-2 text-xs font-black text-brand-purple/80">
                  اپیزود {persianNumberFormatter.format(index + 1)}
                </p>
                <p className="text-sm font-bold leading-7 text-brand-light sm:text-base">
                  {step}
                </p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </Section>
  );
}
