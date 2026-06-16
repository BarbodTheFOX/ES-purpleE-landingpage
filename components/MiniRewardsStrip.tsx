"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";

export function MiniRewardsStrip() {
  const scope = useRef<HTMLElement | null>(null);
  const featuredStats = [
    { value: "۸ اپیزود", label: "مسیر آموزشی" },
    { value: "۲ BNB", label: "جایزه اصلی" },
    { value: "۱۶ SOL", label: "جایزه کریپتویی" },
    { value: "۲۴ × ۵۰ دلار", label: "بونوس" },
    { value: "تا ۲۰۰ VIP", label: "Level 3" },
    { value: "۶ نفر ورکشاپ", label: "منتخب Eventum" },
  ];

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-mini-reward]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-mini-reward]", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 82%",
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-0 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible sm:rounded-3xl sm:border sm:border-brand-purple/15 sm:bg-white/[0.03] sm:p-3 lg:grid-cols-6">
          {featuredStats.map((stat) => (
            <div
              key={stat.value}
              data-mini-reward=""
              className="min-w-[9.5rem] snap-start rounded-2xl border border-brand-purple/14 bg-ink/78 px-4 py-3 text-right sm:min-w-0 sm:text-center"
            >
              <p className="font-poppins text-lg font-black leading-none text-brand-white sm:text-sm">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.68rem] font-bold text-brand-light/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
