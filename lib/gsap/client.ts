"use client";

import gsapCore from "gsap";
import { useGSAP as useGsapHook } from "@gsap/react";
import { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export const gsap = gsapCore;
export const ScrollTrigger = ScrollTriggerPlugin;
export const useGSAP = useGsapHook;

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

registerGsap();
