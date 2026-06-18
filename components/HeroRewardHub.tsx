"use client";

import Image from "next/image";
import { useRef } from "react";
import { MixedText } from "@/components/ui/DirectionalText";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";

const assetPath = "/assets/purple-evolution/";

const orbitItems = [
  {
    src: "bnb_coin.png",
    className: "right-4 top-5 w-14 sm:right-10 sm:top-10 sm:w-24",
    floatY: -14,
    duration: 3.2,
    rotation: 2,
  },
  {
    src: "sol_coin.png",
    className: "left-4 top-12 w-14 sm:left-12 sm:top-20 sm:w-24",
    floatY: -10,
    duration: 2.8,
    rotation: -2,
  },
  {
    src: "bonus_voucher.png",
    className: "left-5 bottom-12 w-16 sm:left-14 sm:bottom-20 sm:w-32",
    floatY: -8,
    duration: 2.6,
    rotation: 1.5,
  },
  {
    src: "vip_emblem.png",
    className: "right-7 bottom-12 w-16 sm:right-16 sm:bottom-20 sm:w-28",
    floatY: -12,
    duration: 3,
    rotation: -1.5,
  },
];

type HeroRewardHubProps = {
  stats: string[];
};

export function HeroRewardHub({ stats }: HeroRewardHubProps) {
  const scope = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const bottomCoreRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(scope.current, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(
          "[data-hub-center], [data-hub-orbit-item], [data-hub-core], [data-hub-stat]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "none",
          },
        );
        return;
      }

      const isMobile = window.innerWidth < 640;

      gsap.fromTo(
        scope.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hub-center]",
        { opacity: 0, y: 10, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.66,
          delay: 0.18,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        "[data-hub-orbit-item]",
        { opacity: 0, y: 20, scale: 0.86 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.68,
          stagger: 0.1,
          delay: 0.26,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        "[data-hub-core]",
        { opacity: 0, y: 12, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          delay: 0.54,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        "[data-hub-stat]",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.46,
          stagger: 0.05,
          delay: 0.62,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-hub-orbit-item]").forEach((item, index) => {
        const config = orbitItems[index];
        gsap.to(item, {
          y: isMobile ? Math.round(config.floatY * 0.55) : config.floatY,
          rotate: config.rotation,
          duration: isMobile ? config.duration + 0.4 : config.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1 + index * 0.25,
        });
      });

      if (bottomCoreRef.current) {
        gsap.to(bottomCoreRef.current, {
          scale: isMobile ? 1.04 : 1.08,
          filter: isMobile
            ? "drop-shadow(0 0 16px rgba(143, 0, 255, 0.58))"
            : "drop-shadow(0 0 26px rgba(143, 0, 255, 0.86))",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.9,
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 42,
          repeat: -1,
          ease: "none",
        });
      }
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      data-hub-card=""
      className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border border-brand-purple/22 bg-white/[0.035] p-3 shadow-[0_22px_80px_rgba(0,0,0,0.34)] sm:rounded-[2rem] sm:p-6"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-brand-purple to-transparent" />
      <div className="relative min-h-[17rem] overflow-hidden rounded-[1.25rem] border border-brand-purple/12 bg-[radial-gradient(circle_at_50%_48%,rgba(143,0,255,0.24),transparent_30%),linear-gradient(145deg,rgba(143,0,255,0.12),rgba(255,255,255,0.025))] p-4 sm:min-h-[25rem] sm:rounded-[1.6rem] sm:p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(191,206,214,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(191,206,214,0.035)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />
        <div className="absolute inset-6 rounded-[1.25rem] border border-brand-purple/10" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/12 blur-3xl sm:h-64 sm:w-64" />

        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/18 sm:h-72 sm:w-72"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-brand-purple shadow-[0_0_18px_rgba(143,0,255,0.85)]" />
          <span className="absolute bottom-6 right-6 size-1 rounded-full bg-brand-pink/70" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/14 sm:h-52 sm:w-52" />
        <div className="absolute left-1/2 top-1/2 h-px w-[76%] -translate-x-1/2 bg-gradient-to-l from-transparent via-brand-purple/45 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[76%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-brand-purple/32 to-transparent" />

        {orbitItems.map((asset) => (
          <Image
            key={asset.src}
            data-hub-orbit-item=""
            src={`${assetPath}${asset.src}`}
            alt=""
            width={220}
            height={220}
            priority
            className={`absolute z-20 drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)] ${asset.className}`}
          />
        ))}

        <div
          data-hub-center=""
          ref={centerRef}
          className="absolute left-1/2 top-[48%] z-30 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.7rem] border border-brand-purple/40 bg-ink/82 p-3 shadow-[0_0_58px_rgba(143,0,255,0.34)] sm:size-32 sm:rounded-[2rem] sm:p-4"
        >
          <Image
            src={`${assetPath}reward_box.png`}
            alt=""
            width={170}
            height={170}
            className="h-auto w-16 sm:w-24"
            priority
          />
        </div>

        <div
          data-hub-core=""
          ref={bottomCoreRef}
          className="absolute bottom-5 left-1/2 z-30 flex size-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-brand-purple/45 bg-brand-purple/15 shadow-[0_0_24px_rgba(143,0,255,0.48)] sm:bottom-8 sm:size-16 sm:rounded-[1.35rem]"
        >
          <Image
            src={`${assetPath}access_card.png`}
            alt=""
            width={96}
            height={96}
            className="h-8 w-8 object-contain sm:h-11 sm:w-11"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:mt-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <span
            key={stat}
            data-hub-stat=""
            className="rounded-2xl border border-brand-purple/14 bg-ink/70 px-2.5 py-2 font-poppins text-[0.68rem] font-black text-brand-light sm:px-3 sm:text-xs"
          >
            <MixedText text={stat} />
          </span>
        ))}
      </div>
    </div>
  );
}
