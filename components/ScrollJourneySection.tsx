"use client";

import { useRef, useState } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";
import { siteContent } from "@/lib/content";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

export function ScrollJourneySection() {
  const scope = useRef<HTMLElement | null>(null);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const content = siteContent.journey;
  const episodes = content.episodes || content.steps.map((step) => ({ topic: step, outcome: "" }));

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-scroll-journey-intro], [data-scroll-journey-item]", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set("[data-scroll-journey-fill]", { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        "[data-scroll-journey-intro]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 74%",
          },
        },
      );

      gsap.fromTo(
        "[data-scroll-journey-fill]",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 70%",
            end: "bottom 42%",
            scrub: 0.3,
          },
        },
      );

      ScrollTrigger.batch("[data-scroll-journey-item]", {
        start: "top 84%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.62,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });

      const triggers = gsap.utils
        .toArray<HTMLElement>("[data-scroll-journey-item]")
        .map((item, index) =>
          ScrollTrigger.create({
            trigger: item,
            start: "top 68%",
            end: "bottom 38%",
            onEnter: () => setActiveEpisode(index),
            onEnterBack: () => setActiveEpisode(index),
          }),
        );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="journey"
      className="relative px-5 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div data-scroll-journey-intro="" className="mb-6 max-w-3xl lg:mb-8">
          <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          {"subtitle" in content && (
            <p className="mt-4 text-sm font-bold leading-7 text-brand-light/78 sm:text-base sm:leading-8">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="absolute right-5 top-2 h-[calc(100%-1rem)] w-px bg-brand-purple/15 lg:left-1/2 lg:right-auto lg:-translate-x-1/2" />
          <div
            data-scroll-journey-fill=""
            className="absolute right-5 top-2 h-[calc(100%-1rem)] w-px bg-brand-purple shadow-glow lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
          />

          <div className="space-y-3 lg:space-y-6">
            {episodes.map((episode, index) => {
              const isActive = activeEpisode === index;
              const isLeftDesktop = index % 2 === 0;

              return (
                <article
                  key={episode.topic}
                  data-scroll-journey-item=""
                  dir="ltr"
                  className="relative pr-12 opacity-0 lg:grid lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] lg:items-start lg:gap-x-5 lg:pr-0"
                >
                  <span
                    className={`absolute right-1 top-3 z-10 flex size-8 items-center justify-center rounded-full border text-xs font-black transition lg:static lg:col-start-2 lg:mt-4 lg:size-9 lg:justify-self-center ${
                      isActive
                        ? "border-brand-purple bg-brand-purple text-brand-white shadow-glow"
                        : "border-brand-purple/35 bg-night text-brand-light"
                    }`}
                  >
                    {persianNumberFormatter.format(index + 1)}
                  </span>
                  <div
                    dir="rtl"
                    className={`rounded-2xl border p-3.5 transition duration-300 lg:row-start-1 lg:max-w-[31rem] lg:rounded-3xl lg:p-5 ${
                      isLeftDesktop
                        ? "lg:col-start-1 lg:justify-self-end"
                        : "lg:col-start-3 lg:justify-self-start"
                    } ${
                      isActive
                        ? "border-brand-purple/55 bg-brand-purple/10 shadow-[0_18px_50px_rgba(143,0,255,0.16)]"
                        : "border-brand-purple/14 bg-white/[0.035]"
                    }`}
                  >
                    <p className="mb-1 text-[0.68rem] font-black text-brand-purple lg:text-xs">
                      اپیزود {persianNumberFormatter.format(index + 1)}
                    </p>
                    <h3 className="text-sm font-black leading-7 text-brand-white lg:text-base">
                      {episode.topic}
                    </h3>
                    <p className="mt-2 text-xs font-bold leading-6 text-brand-light/72 lg:text-sm lg:leading-7">
                      {episode.outcome}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
