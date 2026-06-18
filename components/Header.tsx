"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { siteContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MixedText } from "@/components/ui/DirectionalText";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";

export function Header() {
  const scope = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(scope.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        scope.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      gsap.to("[data-header-logo]", {
        scale: 1.025,
        boxShadow: "0 0 34px rgba(143, 0, 255, 0.36)",
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const trigger = ScrollTrigger.create({
        start: 24,
        end: 999999,
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      });

      return () => trigger.kill();
    },
    { scope },
  );

  return (
    <header
      ref={scope}
      className={`sticky top-0 z-40 border-b px-5 backdrop-blur-xl transition-[padding,background-color,border-color,box-shadow] duration-300 sm:px-6 lg:px-8 ${
        isScrolled
          ? "border-brand-purple/30 bg-ink/88 py-2.5 shadow-[0_12px_42px_rgba(143,0,255,0.13)]"
          : "border-brand-purple/20 bg-ink/75 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3">
          <Image
            data-header-logo=""
            src="/assets/brand/eventum-sign.jpg"
            alt="Purple Evolution"
            width={44}
            height={44}
            className="size-10 shrink-0 rounded-2xl border border-brand-purple/25 object-cover shadow-[0_0_24px_rgba(143,0,255,0.28)] sm:size-11"
            priority
          />
          <span className="leading-tight">
            <span className="block font-poppins text-sm font-black text-brand-white">
              <MixedText text={siteContent.brand.campaign} />
            </span>
            <span className="block font-poppins text-xs text-brand-light/80">
              <MixedText text={siteContent.brand.eventum} />
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-brand-light/80 md:flex">
          {siteContent.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 transition hover:text-brand-white"
            >
              <MixedText text={item.label} />
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-brand-purple shadow-[0_0_16px_rgba(143,0,255,0.6)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <Button
          href="#registration"
          className="hidden shadow-[0_0_34px_rgba(143,0,255,0.22)] hover:scale-[1.03] active:scale-[0.98] md:inline-flex"
        >
          <span>{siteContent.nav.cta}</span>
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
        </Button>

        <Button
          href="#registration"
          variant="secondary"
          className="active:scale-[0.98] md:hidden"
        >
          {siteContent.nav.cta}
        </Button>
      </div>
    </header>
  );
}
