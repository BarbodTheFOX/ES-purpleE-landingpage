"use client";

import { AlertTriangle } from "lucide-react";
import { useRef } from "react";
import { MixedText } from "@/components/ui/DirectionalText";
import { Section } from "@/components/ui/Section";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

export function ProblemSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.problem;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-problem-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-problem-card]", {
        opacity: 0,
        y: 34,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.from("[data-problem-icon]", {
        filter: "drop-shadow(0 0 0 rgba(143,0,255,0))",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });
    },
    { scope },
  );

  return (
    <Section
      eyebrow={content.eyebrow}
      title={content.title}
      className="pb-5 sm:pb-6 lg:pb-6"
    >
      <div ref={scope} className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        {"text" in content && (
          <div
            data-problem-card=""
            className="rounded-[2rem] border border-brand-purple/18 bg-gradient-to-br from-brand-purple/10 to-white/[0.025] p-5 sm:p-7"
          >
            <p className="text-xl font-black leading-10 text-brand-white sm:text-3xl sm:leading-[1.6]">
              <MixedText text={content.statement} />
            </p>
            <p className="mt-5 text-sm font-bold leading-8 text-brand-light/82 sm:text-base">
              <MixedText text={content.text} />
            </p>
          </div>
        )}
        <div className="grid gap-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              data-problem-card=""
              className="group rounded-2xl border border-brand-purple/12 bg-white/[0.025] p-4 transition hover:border-brand-purple/35 hover:bg-white/[0.045]"
            >
              <AlertTriangle
                data-problem-icon=""
                className="mb-3 size-5 text-brand-purple"
                aria-hidden="true"
              />
              <h3 className="text-base font-black text-brand-white">
                <MixedText text={item.title} />
              </h3>
              <p className="mt-2 text-sm font-bold leading-7 text-brand-light/75">
                <MixedText text={item.text} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
