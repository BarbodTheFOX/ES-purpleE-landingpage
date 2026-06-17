import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const mixedTokenPattern =
  /(Purple Evolution|VIP Level 3|VIP Channel|Bitunix|Eventum Space|Eventum|UID|PDF|[\d۰-۹٠-٩]+(?:\s*[+×x]\s*[\d۰-۹٠-٩$]+)?\s*(?:BNB|SOL)|[\d۰-۹٠-٩]+\s*(?:BNB|SOL)|\$[\d۰-۹٠-٩]+|BNB|SOL|VIP)/g;

type LtrTextProps = {
  children: ReactNode;
  className?: string;
};

export function LtrText({ children, className }: LtrTextProps) {
  return (
    <bdi
      dir="ltr"
      className={cn("inline-block whitespace-nowrap unicode-bidi-isolate", className)}
    >
      {children}
    </bdi>
  );
}

export function MixedText({ text }: { text: string }) {
  const parts = text.split(mixedTokenPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) {
          return null;
        }

        if (mixedTokenPattern.test(part)) {
          mixedTokenPattern.lastIndex = 0;
          return <LtrText key={`${part}-${index}`}>{part}</LtrText>;
        }

        mixedTokenPattern.lastIndex = 0;
        return part;
      })}
    </>
  );
}
