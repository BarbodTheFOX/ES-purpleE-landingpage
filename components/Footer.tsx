import { siteContent } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-brand-purple/20 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm leading-7 text-brand-gray md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-poppins font-black text-brand-white">{siteContent.brand.campaign}</p>
          <p>{siteContent.brand.eventum}</p>
        </div>
        <p className="max-w-3xl">{siteContent.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
