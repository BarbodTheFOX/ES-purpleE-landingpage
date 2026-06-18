"use client";

import { useEffect, useRef, useState } from "react";
import { MixedText } from "@/components/ui/DirectionalText";
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
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  useEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      const inner = panelInnerRefs.current[index];

      if (!panel || !inner) {
        return;
      }

      gsap.killTweensOf([panel, inner]);

      if (prefersReducedMotion()) {
        panel.style.height = openIndex === index ? "auto" : "0px";
        panel.style.opacity = openIndex === index ? "1" : "0";
        inner.style.transform = "translateY(0px)";
        return;
      }

      if (openIndex === index) {
        gsap.fromTo(
          panel,
          { height: panel.offsetHeight || 0, opacity: panel.offsetHeight ? 1 : 0 },
          {
            height: inner.scrollHeight,
            opacity: 1,
            duration: 0.32,
            ease: "power3.out",
            onComplete: () => {
              panel.style.height = "auto";
            },
          },
        );
        gsap.fromTo(
          inner,
          { y: -6, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" },
        );
        return;
      }

      gsap.set(panel, { height: panel.scrollHeight, opacity: panel.scrollHeight ? 1 : 0 });
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.24,
        ease: "power2.inOut",
      });
      gsap.to(inner, {
        y: -4,
        opacity: 0,
        duration: 0.18,
        ease: "power2.out",
      });
    });
  }, [openIndex]);

  return (
    <Section id="faq" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="space-y-3">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
          <div key={item.question} data-faq-item="">
            <div
              className={`rounded-2xl border p-5 transition duration-300 ${
                isOpen
                  ? "border-brand-purple/35 bg-white/[0.075] shadow-[0_18px_46px_rgba(143,0,255,0.10)]"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              <button
                type="button"
                className="w-full cursor-pointer list-none text-base font-black text-brand-white"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="flex items-start justify-between gap-4">
                  <span
                    dir="rtl"
                    className="min-w-0 flex-1 whitespace-normal text-right leading-7"
                  >
                    <MixedText text={item.question} />
                  </span>
                  <span
                    className={`shrink-0 text-brand-purple transition duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                className="h-0 overflow-hidden opacity-0"
                aria-hidden={!isOpen}
              >
                <div
                  ref={(element) => {
                    panelInnerRefs.current[index] = element;
                  }}
                  className="pt-4"
                >
                  <p
                    dir="rtl"
                    className="whitespace-normal text-right text-sm leading-7 text-brand-light/75"
                  >
                    <MixedText text={item.answer} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
