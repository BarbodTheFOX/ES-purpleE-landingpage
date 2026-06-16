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

export function FAQSection() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.faq;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-faq-item]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-faq-item]", {
        opacity: 0,
        y: 22,
        duration: 0.62,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 74%",
        },
      });
    },
    { scope },
  );

  return (
    <Section id="faq" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-3">
        {content.items.map((item, index) => (
          <div key={item.question} data-faq-item="">
            <details className="group rounded-2xl border border-white/10 bg-white/[0.055] p-5 open:bg-white/[0.075]">
              <summary className="cursor-pointer list-none text-base font-black text-brand-white">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-brand-purple transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-brand-light/75">{item.answer}</p>
            </details>
          </div>
        ))}
      </div>
    </Section>
  );
}
