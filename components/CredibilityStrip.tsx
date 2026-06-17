"use client";

import { ShieldCheck } from "lucide-react";
import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { MixedText } from "@/components/ui/DirectionalText";
import { siteContent } from "@/lib/content";

export function CredibilityStrip() {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-credibility-chip]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-credibility-chip]", {
        opacity: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.06,
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
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-2 rounded-3xl border border-brand-purple/12 bg-white/[0.025] p-3 sm:grid-cols-3 lg:grid-cols-5">
          {siteContent.credibility.items.map((item) => (
            <div
              key={item}
              data-credibility-chip=""
              className="flex min-h-14 items-center gap-2 rounded-2xl bg-ink/72 px-3 py-3 text-xs font-black leading-5 text-brand-light"
            >
              <ShieldCheck className="size-4 shrink-0 text-brand-purple" aria-hidden="true" />
              <span>
                <MixedText text={item} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
