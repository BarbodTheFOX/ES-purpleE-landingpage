import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileDown, LockKeyhole } from "lucide-react";
import { MixedText } from "@/components/ui/DirectionalText";
import { siteContent } from "@/lib/content";

const activeGiftLinks: Record<string, string> = {
  "مجله فیلم‌های پیشنهادی": "/gifts/purple-evolution-movie-magazine.pdf",
  "مجله کتاب‌های معرفی‌شده مهمان‌ها": "/gifts/purple-evolution-book-magazine.pdf",
};

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
            <p className="mb-3 text-sm font-bold text-brand-purple">
              <MixedText text="Purple Evolution" />
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              <MixedText text={content.title} />
            </h1>
            <p className="mt-5 text-sm font-bold leading-8 text-brand-light/82 sm:text-base">
              <MixedText text={content.subtitle} />
            </p>
            <p className="mt-5 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/10 p-4 text-sm font-black leading-7 text-brand-yellow">
              <MixedText text={content.notice} />
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
          {content.items.map((card) => {
            const giftHref = activeGiftLinks[card.title];
            const isActive = Boolean(giftHref);

            return (
              <article
                key={card.title}
                className={`rounded-3xl border p-5 transition ${
                  isActive
                    ? "border-brand-purple/45 bg-brand-purple/10 shadow-[0_18px_55px_rgba(143,0,255,0.16)]"
                    : "border-brand-purple/16 bg-white/[0.035] opacity-72"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${
                      isActive ? "bg-brand-purple/18 shadow-glow" : "bg-brand-purple/10"
                    }`}
                  >
                    <Image
                      src="/assets/purple-evolution/pdf_folder.png"
                      alt=""
                      width={76}
                      height={76}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  {isActive ? (
                    <FileDown className="size-4 text-brand-green" aria-hidden="true" />
                  ) : (
                    <LockKeyhole className="size-4 text-brand-gray" aria-hidden="true" />
                  )}
                </div>
                <h2 className="text-base font-black leading-7">
                  <MixedText text={card.title} />
                </h2>
                <p className="mt-3 text-sm font-bold leading-7 text-brand-light/72">
                  <MixedText text={card.text} />
                </p>
                {isActive ? (
                  <a
                    href={giftHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-brand-purple px-4 py-2 text-xs font-black text-brand-white shadow-[0_0_28px_rgba(143,0,255,0.28)] transition hover:bg-brand-purple/85 active:scale-[0.98]"
                  >
                    {card.cta}
                  </a>
                ) : (
                  <span className="mt-5 inline-flex rounded-full border border-brand-yellow/25 bg-brand-yellow/10 px-3 py-1 text-xs font-black text-brand-yellow">
                    {giftsContent.pending}
                  </span>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
