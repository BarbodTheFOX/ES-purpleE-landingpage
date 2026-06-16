"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { bitunixReferralUrl, siteContent } from "@/lib/content";

export function FinalCTASection() {
  const scope = useRef<HTMLElement | null>(null);
  const content = siteContent.finalCta;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-final-cta]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-final-cta]", {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-brand-purple/12 to-white/[0.025] p-5 sm:p-8">
        <div data-final-cta="" className="max-w-3xl">
          <p className="text-xs font-black text-brand-purple">Purple Evolution</p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-brand-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-brand-light/82 sm:text-base sm:leading-8">
            {content.text}
          </p>
        </div>
        <div data-final-cta="" className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="#registration" className="w-full sm:w-auto">
            {content.primary}
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          </Button>
          <Button
            href={bitunixReferralUrl}
            target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
            rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {content.secondary}
            <ExternalLink className="mr-2 size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
