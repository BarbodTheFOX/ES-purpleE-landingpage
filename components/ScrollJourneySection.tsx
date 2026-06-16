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
  const activeIndexRef = useRef(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const content = siteContent.journey;

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-scroll-journey-item]", { opacity: 1, y: 0 });
        gsap.set("[data-scroll-journey-mobile-fill]", { scaleY: 1 });
        return;
      }

      gsap.set("[data-scroll-journey-mobile-fill]", {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.to("[data-scroll-journey-mobile-fill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      gsap.from("[data-scroll-journey-item]", {
        opacity: 0,
        y: 26,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-journey-item]").forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          end: "bottom 42%",
          onEnter: () => setActiveEpisode(index),
          onEnterBack: () => setActiveEpisode(index),
        });
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const stage = scope.current?.querySelector<HTMLElement>("[data-scroll-journey-stage]");

        if (!scope.current || !stage) {
          return undefined;
        }

        const trigger = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${content.steps.length * 390}`,
          pin: stage,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              content.steps.length - 1,
              Math.floor(self.progress * content.steps.length),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveEpisode(nextIndex);
            }
          },
        });

        return () => trigger.kill();
      });

      return () => media.revert();
    },
    { scope },
  );

  const activeStep = content.steps[activeEpisode];

  return (
    <section
      ref={scope}
      id="journey"
      className="relative px-5 py-10 sm:px-6 lg:min-h-screen lg:px-8 lg:py-0"
    >
      <div
        data-scroll-journey-stage=""
        className="mx-auto flex w-full max-w-6xl flex-col justify-center lg:min-h-screen"
      >
        <div className="mb-6 max-w-3xl lg:mb-0">
          <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="rounded-[2rem] border border-brand-purple/18 bg-white/[0.035] p-6">
            <div className="mb-6 flex items-center justify-between text-xs font-black text-brand-gray">
              <span>اپیزود فعال</span>
              <span>
                {persianNumberFormatter.format(activeEpisode + 1)} /{" "}
                {persianNumberFormatter.format(content.steps.length)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-purple shadow-glow transition-all duration-300"
                style={{
                  width: `${((activeEpisode + 1) / content.steps.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-10 min-h-[17rem] rounded-3xl border border-brand-purple/25 bg-ink/72 p-6">
              <p className="font-poppins text-6xl font-black leading-none text-brand-purple">
                {persianNumberFormatter.format(activeEpisode + 1)}
              </p>
              <p className="mt-5 text-sm font-black text-brand-purple/85">
                اپیزود {persianNumberFormatter.format(activeEpisode + 1)}
              </p>
              <h3 className="mt-3 text-2xl font-black leading-10 text-brand-white">
                {activeStep}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {content.steps.map((step, index) => {
              const isActive = activeEpisode === index;
              const isPassed = activeEpisode > index;

              return (
                <div
                  key={step}
                  className={`rounded-3xl border p-4 transition duration-300 ${
                    isActive
                      ? "border-brand-purple/65 bg-brand-purple/10 shadow-soft-purple"
                      : isPassed
                        ? "border-brand-purple/25 bg-white/[0.045]"
                        : "border-brand-purple/12 bg-white/[0.025] opacity-60"
                  }`}
                >
                  <p className="mb-2 text-xs font-black text-brand-purple">
                    {persianNumberFormatter.format(index + 1)}
                  </p>
                  <p className="text-sm font-bold leading-7 text-brand-light">
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative lg:hidden">
          <div className="absolute right-5 top-2 h-[calc(100%-1rem)] w-px bg-brand-purple/15" />
          <div
            data-scroll-journey-mobile-fill=""
            className="absolute right-5 top-2 h-[calc(100%-1rem)] w-px bg-brand-purple shadow-glow"
          />
          <div className="space-y-3">
            {content.steps.map((step, index) => {
              const isActive = activeEpisode === index;

              return (
                <div
                  key={step}
                  data-scroll-journey-item=""
                  className="relative pr-12"
                >
                  <span
                    className={`absolute right-1 top-3 z-10 flex size-8 items-center justify-center rounded-full border text-xs font-black transition ${
                      isActive
                        ? "border-brand-purple bg-brand-purple text-brand-white shadow-glow"
                        : "border-brand-purple/35 bg-night text-brand-light"
                    }`}
                  >
                    {persianNumberFormatter.format(index + 1)}
                  </span>
                  <div
                    className={`rounded-2xl border p-3.5 transition duration-300 ${
                      isActive
                        ? "border-brand-purple/55 bg-brand-purple/10"
                        : "border-brand-purple/14 bg-white/[0.035]"
                    }`}
                  >
                    <p className="mb-1 text-[0.68rem] font-black text-brand-purple">
                      اپیزود {persianNumberFormatter.format(index + 1)}
                    </p>
                    <p className="text-sm font-bold leading-6 text-brand-light">
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
