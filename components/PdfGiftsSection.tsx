"use client";

import Image from "next/image";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

export function PdfGiftsSection() {
  const scope = useRef<HTMLElement | null>(null);
  const content = siteContent.pdfGifts;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-pdf-gift]", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.from("[data-pdf-gift]", {
        opacity: 0,
        y: 26,
        scale: 0.98,
        duration: 0.65,
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
    <section ref={scope} id="pdf-gifts" className="px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div data-pdf-gift="">
          <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-brand-light/82 sm:text-base sm:leading-8">
            {content.text}
          </p>
          <Button href="#registration" className="mt-6 w-full sm:w-auto">
            {content.cta}
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {content.cards.map((card, index) => (
            <article
              key={card.title}
              data-pdf-gift=""
              className="relative overflow-hidden rounded-3xl border border-brand-purple/16 bg-white/[0.035] p-4 opacity-0"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-purple/10">
                  <Image
                    src="/assets/purple-evolution/pdf_folder.png"
                    alt=""
                    width={96}
                    height={96}
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <LockKeyhole className="size-4 text-brand-gray" aria-hidden="true" />
              </div>
              <p className="font-poppins text-xs font-black text-brand-purple">
                PDF {new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(index + 1)}
              </p>
              <h3 className="mt-2 min-h-14 text-base font-black leading-7 text-brand-white">
                {card.title}
              </h3>
              <p className="mt-3 text-xs font-bold leading-6 text-brand-light/72">
                {card.text}
              </p>
              <span className="mt-4 inline-flex rounded-full border border-brand-yellow/25 bg-brand-yellow/10 px-3 py-1 text-xs font-black text-brand-yellow">
                {content.pending}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
