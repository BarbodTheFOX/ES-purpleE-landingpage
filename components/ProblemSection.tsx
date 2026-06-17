"use client";

import { AlertTriangle } from "lucide-react";
import { useRef } from "react";
import { MixedText } from "@/components/ui/DirectionalText";
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

      gsap.fromTo(
        "[data-problem-card]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          clearProps: "transform",
          duration: 0.58,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 82%",
          },
        },
      );

      gsap.from("[data-problem-icon]", {
        filter: "drop-shadow(0 0 0 rgba(143,0,255,0))",
        duration: 0.72,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 82%",
        },
      });
    },
    { scope },
  );

  return (
    <section className="relative scroll-mt-28 overflow-visible px-5 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8 lg:pb-12 lg:pt-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 max-w-3xl lg:mb-7">
          <p className="mb-3 text-sm font-bold text-brand-purple">
            <MixedText text={content.eyebrow} />
          </p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl">
            <MixedText text={content.title} />
          </h2>
        </div>

        <div ref={scope} className="space-y-4 overflow-visible lg:space-y-5">
          {"text" in content && (
            <div
              data-problem-card=""
              className="rounded-[2rem] border border-brand-purple/18 bg-gradient-to-br from-brand-purple/10 to-white/[0.025] p-5 sm:p-7 lg:p-8"
            >
              <p className="max-w-4xl text-xl font-black leading-10 text-brand-white sm:text-3xl sm:leading-[1.55]">
                <MixedText text={content.statement} />
              </p>
              <p className="mt-4 max-w-5xl text-sm font-bold leading-8 text-brand-light/82 sm:text-base">
                <MixedText text={content.text} />
              </p>
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item) => (
              <div
                key={item.title}
                data-problem-card=""
                className="group h-full rounded-2xl border border-brand-purple/12 bg-white/[0.025] p-4 transition hover:border-brand-purple/35 hover:bg-white/[0.045]"
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
      </div>
    </section>
  );
}
