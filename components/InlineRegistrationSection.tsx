"use client";

import Image from "next/image";
import { RegistrationForm } from "@/components/RegistrationForm";
import { siteContent } from "@/lib/content";

export function InlineRegistrationSection() {
  const content = siteContent.inlineRegistration;

  return (
    <section className="relative overflow-hidden px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-40 bg-brand-purple/[0.06] blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-sm font-bold text-brand-purple">{content.eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-brand-light/80 sm:text-base sm:leading-8">
            {content.text}
          </p>
          <div className="mt-6 hidden overflow-hidden rounded-[2rem] border border-brand-purple/16 bg-white/[0.035] p-5 lg:block">
            <Image
              src="/assets/purple-evolution/access_card.png"
              alt=""
              width={320}
              height={320}
              className="mx-auto h-auto w-52 drop-shadow-[0_22px_40px_rgba(0,0,0,0.38)]"
            />
          </div>
        </div>
        <RegistrationForm id="registration" />
      </div>
    </section>
  );
}
