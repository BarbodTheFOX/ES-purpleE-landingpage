"use client";

import { UserCheck } from "lucide-react";
import { useRef } from "react";
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

export function WhoIsItForSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.whoIsItFor;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-who-card]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-who-card]", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 76%",
        },
      });
    },
    { scope },
  );

  return (
    <Section eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.title}
              data-who-card=""
              className="rounded-3xl border border-brand-purple/16 bg-white/[0.035] p-5"
            >
              <UserCheck className="mb-5 size-6 text-brand-purple" aria-hidden="true" />
              <h3 className="text-lg font-black text-brand-white">
                <MixedText text={card.title} />
              </h3>
              <p className="mt-3 text-sm font-bold leading-7 text-brand-light/76">
                <MixedText text={card.text} />
              </p>
            </article>
          ))}
        </div>
        <div data-who-card="" className="sm:max-w-xs">
          <Button href="#registration" className="w-full">
            {content.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
