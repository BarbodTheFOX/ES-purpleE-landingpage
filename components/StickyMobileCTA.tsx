"use client";

import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/client";

export function StickyMobileCTA() {
  const scope = useRef<HTMLAnchorElement | null>(null);
  const [isNearForm, setIsNearForm] = useState(false);

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (!prefersReducedMotion()) {
        gsap.from(scope.current, {
          opacity: 0,
          y: 24,
          duration: 0.55,
          delay: 1,
          ease: "power3.out",
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: "#registration",
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => setIsNearForm(true),
        onLeaveBack: () => setIsNearForm(false),
      });

      return () => trigger.kill();
    },
    { scope },
  );

  return (
    <a
      ref={scope}
      href="#registration"
      className={`fixed bottom-4 left-4 right-4 z-50 flex min-h-12 items-center justify-center rounded-full border border-brand-purple/30 bg-brand-purple px-5 py-3 text-sm font-black text-brand-white shadow-glow transition duration-300 md:hidden ${
        isNearForm
          ? "pointer-events-none translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      ثبت‌نام در کمپین
      <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
    </a>
  );
}
