import { MixedText } from "@/components/ui/DirectionalText";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative px-5 py-11 sm:px-6 sm:py-14 lg:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-8 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-bold text-brand-purple">
                <MixedText text={eyebrow} />
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-black leading-tight text-brand-white sm:text-4xl">
                <MixedText text={title} />
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
