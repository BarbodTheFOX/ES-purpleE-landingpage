"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";

const flowSteps = ["ثبت‌نام Bitunix", "دریافت UID", "ثبت فرم"];
const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

export function CampaignFlowStrip() {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-campaign-flow-step]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-campaign-flow-step]", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 84%",
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-5 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-purple/12 bg-white/[0.025] p-3">
        <div className="grid grid-cols-3 gap-2">
          {flowSteps.map((step, index) => (
            <div
              key={step}
              data-campaign-flow-step=""
              className="relative rounded-2xl bg-ink/70 px-2 py-3 text-center"
            >
              <span className="mx-auto mb-2 flex size-7 items-center justify-center rounded-full bg-brand-purple/14 font-poppins text-xs font-black text-brand-purple">
                {persianNumberFormatter.format(index + 1)}
              </span>
              <p className="text-[0.68rem] font-black leading-5 text-brand-light sm:text-xs">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
