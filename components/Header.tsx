import { ArrowLeft } from "lucide-react";
import { siteContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MixedText } from "@/components/ui/DirectionalText";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-purple/20 bg-ink/75 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-purple text-sm font-black text-brand-white shadow-glow">
            PE
          </span>
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
              className="transition hover:text-brand-white"
            >
              <MixedText text={item.label} />
            </a>
          ))}
        </nav>

        <Button
          href="#registration"
          className="hidden md:inline-flex"
        >
          <span>{siteContent.nav.cta}</span>
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
        </Button>

        <Button href="#registration" variant="secondary" className="md:hidden">
          {siteContent.nav.cta}
        </Button>
      </div>
    </header>
  );
}
