import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function GiftsPage() {
  const content = siteContent.giftsPage;
  const giftsContent = siteContent.pdfGifts;

  return (
    <main className="min-h-screen bg-night px-5 py-8 text-brand-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-black text-brand-light/75 transition hover:text-brand-white"
        >
          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          بازگشت به صفحه کمپین
        </Link>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold text-brand-purple">Purple Evolution</p>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 text-sm font-bold leading-8 text-brand-light/82 sm:text-base">
              {content.subtitle}
            </p>
            <p className="mt-5 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/10 p-4 text-sm font-black leading-7 text-brand-yellow">
              {content.notice}
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-purple/16 bg-white/[0.035] p-5">
            <Image
              src="/assets/purple-evolution/pdf_folder.png"
              alt=""
              width={380}
              height={380}
              priority
              className="mx-auto h-auto w-56 drop-shadow-[0_26px_44px_rgba(0,0,0,0.42)]"
            />
          </div>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          {content.items.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-brand-purple/16 bg-white/[0.035] p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-purple/10">
                  <Image
                    src="/assets/purple-evolution/pdf_folder.png"
                    alt=""
                    width={76}
                    height={76}
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <LockKeyhole className="size-4 text-brand-gray" aria-hidden="true" />
              </div>
              <h2 className="text-base font-black leading-7">{card.title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-brand-light/72">
                {card.text}
              </p>
              <span className="mt-5 inline-flex rounded-full border border-brand-yellow/25 bg-brand-yellow/10 px-3 py-1 text-xs font-black text-brand-yellow">
                {giftsContent.pending}
              </span>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
