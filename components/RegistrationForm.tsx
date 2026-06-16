"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import {
  bitunixReferralUrl,
  mainChallenges,
  siteContent,
  tradingLevels,
} from "@/lib/content";
import {
  registrationSchema,
  type RegistrationFormValues,
  type RegistrationInput,
} from "@/lib/validations/registration";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap/client";
import type { RegistrationResponse } from "@/types/registration";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-xs font-bold text-brand-red">{message}</p>;
}

export function RegistrationForm() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.form;
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [successType, setSuccessType] = useState<"first500" | "standard" | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      telegram_id: "",
      instagram_id: "",
      email: "",
      bitunix_uid: "",
      registered_with_referral: false,
      trading_level: "",
      main_challenge: "",
      consent: false,
    },
  });

  useGSAP(
    () => {
      registerGsap();

      if (!scope.current) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set("[data-form-panel]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-form-panel]", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
        },
      });
    },
    { scope },
  );

  async function onSubmit(values: RegistrationFormValues) {
    setServerMessage(null);
    setSuccessType(null);
    const parsedValues = registrationSchema.parse(values) satisfies RegistrationInput;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedValues),
      });

      const payload = (await response.json()) as RegistrationResponse;

      if (!payload.success) {
        if (payload.fields) {
          Object.entries(payload.fields).forEach(([field, message]) => {
            setError(field as keyof RegistrationFormValues, {
              type: "server",
              message,
            });
          });
        }

        setServerMessage(payload.message);
        return;
      }

      setSuccessType(payload.is_first_500 ? "first500" : "standard");
      setServerMessage(payload.message);
      reset();
    } catch {
      setServerMessage(content.genericError);
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-2xl border border-brand-purple/20 bg-ink/70 px-4 text-sm text-brand-white outline-none transition placeholder:text-brand-gray/65 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/15";
  const labelClass = "text-sm font-bold text-brand-white";

  return (
    <Section id="registration" eyebrow={content.eyebrow} title={content.title}>
      <div ref={scope} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div data-form-panel="">
          <GlassCard className="p-6 shadow-soft-purple">
            <p className="text-sm leading-8 text-brand-light/75">{content.subtitle}</p>
            <div className="mt-6 rounded-2xl border border-brand-purple/25 bg-brand-purple/10 p-4">
              <p className="text-sm font-bold text-brand-white">{content.referralHelp}</p>
              <a
                href={bitunixReferralUrl}
                target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
                rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
                className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-purple transition hover:text-brand-pink"
              >
                {content.referralLink}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </GlassCard>
        </div>

        <div data-form-panel="">
          <GlassCard className="p-5 shadow-soft-purple sm:p-6">
            {successType && (
              <div className="mb-5 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-4">
                <h3 className="text-base font-black text-brand-green">
                  {content.successTitle}
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-light/85">
                  {serverMessage ||
                    (successType === "first500"
                      ? content.first500Success
                      : content.standardSuccess)}
                </p>
              </div>
            )}

            {serverMessage && !successType && (
              <div className="mb-5 rounded-2xl border border-brand-red/35 bg-brand-red/10 p-4 text-sm font-bold leading-7 text-brand-red">
                {serverMessage}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="rounded-2xl border border-brand-purple/15 bg-white/[0.03] p-4">
                <h3 className="mb-4 text-sm font-black text-brand-purple">
                  {content.groups.personal}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>{content.fields.full_name.label}</span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.full_name.placeholder}
                      autoComplete="name"
                      {...register("full_name")}
                    />
                    <FieldError message={errors.full_name?.message} />
                  </label>

                  <label>
                    <span className={labelClass}>{content.fields.phone.label}</span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.phone.placeholder}
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </label>

                  <label>
                    <span className={labelClass}>{content.fields.telegram_id.label}</span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.telegram_id.placeholder}
                      dir="ltr"
                      {...register("telegram_id")}
                    />
                    <FieldError message={errors.telegram_id?.message} />
                  </label>

                  <label>
                    <span className={labelClass}>{content.fields.instagram_id.label}</span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.instagram_id.placeholder}
                      dir="ltr"
                      {...register("instagram_id")}
                    />
                    <FieldError message={errors.instagram_id?.message} />
                  </label>

                  <label className="sm:col-span-2">
                    <span className={labelClass}>{content.fields.email.label}</span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.email.placeholder}
                      type="email"
                      autoComplete="email"
                      dir="ltr"
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-purple/15 bg-white/[0.03] p-4">
                <h3 className="mb-4 text-sm font-black text-brand-purple">
                  {content.groups.bitunix}
                </h3>
                <label>
                  <span className={labelClass}>{content.fields.bitunix_uid.label}</span>
                  <input
                    className={inputClass}
                    placeholder={content.fields.bitunix_uid.placeholder}
                    dir="ltr"
                    {...register("bitunix_uid")}
                  />
                  <FieldError message={errors.bitunix_uid?.message} />
                </label>
              </div>

              <div className="rounded-2xl border border-brand-purple/15 bg-white/[0.03] p-4">
                <h3 className="mb-4 text-sm font-black text-brand-purple">
                  {content.groups.trading}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>{content.fields.trading_level.label}</span>
                    <select
                      className={inputClass}
                      defaultValue=""
                      {...register("trading_level")}
                    >
                      <option value="" disabled>
                        {content.fields.trading_level.placeholder}
                      </option>
                      {tradingLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.trading_level?.message} />
                  </label>

                  <label>
                    <span className={labelClass}>{content.fields.main_challenge.label}</span>
                    <select
                      className={inputClass}
                      defaultValue=""
                      {...register("main_challenge")}
                    >
                      <option value="" disabled>
                        {content.fields.main_challenge.placeholder}
                      </option>
                      {mainChallenges.map((challenge) => (
                        <option key={challenge} value={challenge}>
                          {challenge}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.main_challenge?.message} />
                  </label>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-brand-purple/15 bg-white/[0.03] p-4">
                <h3 className="text-sm font-black text-brand-purple">
                  {content.groups.confirmation}
                </h3>
                <label className="flex items-start gap-3 rounded-2xl border border-brand-purple/20 bg-white/[0.045] p-4">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 rounded border-brand-purple/25 bg-ink accent-brand-purple"
                    {...register("registered_with_referral")}
                  />
                  <span>
                    <span className="text-sm font-bold leading-7 text-brand-light">
                      {content.fields.registered_with_referral}
                    </span>
                    <FieldError message={errors.registered_with_referral?.message} />
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-brand-purple/20 bg-white/[0.045] p-4">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 rounded border-brand-purple/25 bg-ink accent-brand-purple"
                    {...register("consent")}
                  />
                  <span>
                    <span className="text-sm font-bold leading-7 text-brand-light">
                      {content.fields.consent}
                    </span>
                    <FieldError message={errors.consent?.message} />
                  </span>
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? content.submitting : content.submit}
              </Button>
              <p className="text-center text-xs font-bold leading-6 text-brand-gray">
                {content.submitNote}
              </p>
            </form>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
