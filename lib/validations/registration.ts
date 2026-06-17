import { z } from "zod";
import { mainChallenges, siteContent, tradingLevels } from "@/lib/content";
import { normalizeDigits } from "@/lib/utils/normalizeDigits";

const messages = siteContent.validation;

const optionalText = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (typeof value !== "string") {
      return null;
    }

    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  });

const optionalEmail = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (typeof value !== "string") {
      return null;
    }

    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  })
  .pipe(z.string().email(messages.emailInvalid).nullable());

export const registrationSchema = z.object({
  full_name: z
    .string({ required_error: messages.fullNameRequired })
    .trim()
    .min(3, messages.fullNameMin),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? normalizeDigits(value) : value),
    z
      .string({ required_error: messages.phoneRequired })
      .trim()
      .regex(/^(\+98|0)?9\d{9}$/, messages.phoneInvalid),
  ),
  telegram_id: optionalText,
  instagram_id: optionalText,
  email: optionalEmail,
  bitunix_uid: z.preprocess(
    (value) => (typeof value === "string" ? normalizeDigits(value) : value),
    z
      .string({ required_error: messages.bitunixUidRequired })
      .trim()
      .min(4, messages.bitunixUidMin)
      .max(80, messages.bitunixUidMax),
  ),
  registered_with_referral: z
    .boolean()
    .refine((value) => value, messages.referralRequired),
  trading_level: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(tradingLevels, {
      errorMap: (_issue, context) => ({
        message:
          context.data === undefined
            ? messages.tradingLevelRequired
            : messages.tradingLevelInvalid,
      }),
    }),
  ),
  main_challenge: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(mainChallenges, {
      errorMap: (_issue, context) => ({
        message:
          context.data === undefined
            ? messages.mainChallengeRequired
            : messages.mainChallengeInvalid,
      }),
    }),
  ),
  consent: z
    .boolean()
    .refine((value) => value, messages.consentRequired),
});

export type RegistrationFormValues = {
  full_name: string;
  phone: string;
  telegram_id: string | null;
  instagram_id: string | null;
  email: string | null;
  bitunix_uid: string;
  registered_with_referral: boolean;
  trading_level: "" | (typeof tradingLevels)[number];
  main_challenge: "" | (typeof mainChallenges)[number];
  consent: boolean;
};

export type RegistrationInput = z.infer<typeof registrationSchema>;
