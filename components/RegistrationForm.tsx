"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
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

function OptionalBadge() {
  return <span className="mr-2 text-xs font-bold text-brand-gray">اختیاری</span>;
}

export function RegistrationForm() {
  const scope = useRef<HTMLDivElement | null>(null);
  const content = siteContent.form;
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [successType, setSuccessType] = useState<"first500" | "standard" | null>(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [activeFormStep, setActiveFormStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
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
        gsap.set("[data-form-group]", { opacity: 1, y: 0 });
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

      gsap.from("[data-form-group]", {
        opacity: 0,
        y: 16,
        duration: 0.48,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
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
          moveToFirstProblemField(
            Object.keys(payload.fields) as Array<keyof RegistrationFormValues>,
          );
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
    "mt-2 min-h-12 w-full rounded-2xl border border-brand-purple/16 bg-ink/75 px-4 text-sm text-brand-white outline-none transition placeholder:text-brand-gray/65 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/15";
  const labelClass = "text-sm font-bold text-brand-white";
  const groupClass =
    "rounded-2xl border border-brand-purple/12 bg-white/[0.025] p-3.5 sm:p-4";
  const groupTitleClass =
    "mb-4 flex items-center gap-2 text-sm font-black text-brand-purple";
  const groupNumberClass =
    "flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-purple/14 font-poppins text-xs text-brand-white";
  const stepLabels = [
    "نام و موبایل",
    "UID بیتونیکس",
    "سطح و چالش",
    "تأیید نهایی",
  ];

  function getMobileStepClass(step: number) {
    return activeFormStep === step ? "block" : "hidden md:block";
  }

  async function goToNextStep(fields: Array<keyof RegistrationFormValues>) {
    const isValid = await trigger(fields);

    if (isValid) {
      setActiveFormStep((current) => Math.min(current + 1, stepLabels.length - 1));
    }
  }

  function getStepForField(field: keyof RegistrationFormValues) {
    if (field === "bitunix_uid") {
      return 1;
    }

    if (field === "trading_level" || field === "main_challenge") {
      return 2;
    }

    if (field === "registered_with_referral" || field === "consent") {
      return 3;
    }

    return 0;
  }

  function moveToFirstProblemField(fields: Array<keyof RegistrationFormValues>) {
    const firstField = fields[0];

    if (
      fields.some((field) =>
        ["telegram_id", "instagram_id", "email"].includes(field),
      )
    ) {
      setShowOptionalFields(true);
    }

    if (firstField) {
      setActiveFormStep(getStepForField(firstField));
    }
  }

  function handleInvalidSubmit(formErrors: FieldErrors<RegistrationFormValues>) {
    moveToFirstProblemField(Object.keys(formErrors) as Array<keyof RegistrationFormValues>);
  }

  return (
    <div id="registration" ref={scope} className="scroll-mt-24">
      <div data-form-panel="">
          <GlassCard className="border-brand-purple/20 p-3.5 shadow-[0_18px_55px_rgba(143,0,255,0.16)] sm:p-5">
            <div className="mb-4 rounded-2xl border border-brand-purple/16 bg-brand-purple/[0.08] p-3.5 sm:p-4">
              <p className="text-xs font-black text-brand-purple">{content.eyebrow}</p>
              <h2 className="mt-2 text-lg font-black leading-8 text-brand-white sm:text-xl">
                {content.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-brand-light/80">
                {content.instruction}
              </p>
              <Button
                href={bitunixReferralUrl}
                target={bitunixReferralUrl.startsWith("http") ? "_blank" : undefined}
                rel={bitunixReferralUrl.startsWith("http") ? "noreferrer" : undefined}
                variant="secondary"
                className="mt-4 w-full border-brand-purple/35 bg-ink/70"
              >
                {content.referralLink}
                <ExternalLink className="mr-2 size-4" aria-hidden="true" />
              </Button>
            </div>
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

            <form
              className="space-y-3.5 sm:space-y-4"
              onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}
              noValidate
            >
              <div className="md:hidden">
                <div className="mb-3 flex items-center justify-between gap-2">
                  {stepLabels.map((label, index) => {
                    const isActive = activeFormStep === index;
                    const isDone = activeFormStep > index;

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveFormStep(index)}
                        className={`h-1.5 flex-1 rounded-full transition ${
                          isActive || isDone ? "bg-brand-purple" : "bg-white/12"
                        }`}
                        aria-label={label}
                      />
                    );
                  })}
                </div>
                <p className="mb-3 text-xs font-black text-brand-light/75">
                  مرحله {activeFormStep + 1} از ۴: {stepLabels[activeFormStep]}
                </p>
              </div>

              <div data-form-group="" className={`${groupClass} ${getMobileStepClass(0)}`}>
                <h3 className={groupTitleClass}>
                  <span className={groupNumberClass}>۱</span>
                  {stepLabels[0]}
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
                </div>

                <button
                  type="button"
                  onClick={() => setShowOptionalFields((current) => !current)}
                  className="mt-4 flex w-full items-center justify-between rounded-2xl border border-brand-purple/14 bg-white/[0.035] px-4 py-3 text-sm font-black text-brand-light sm:hidden"
                  aria-expanded={showOptionalFields}
                >
                  اطلاعات اختیاری
                  <ChevronDown
                    className={`size-4 text-brand-purple transition ${
                      showOptionalFields ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={
                    showOptionalFields
                      ? "mt-4 grid gap-4 sm:grid-cols-2"
                      : "hidden sm:mt-4 sm:grid sm:grid-cols-2 sm:gap-4"
                  }
                >
                  <label>
                    <span className={labelClass}>
                      {content.fields.telegram_id.label}
                      <OptionalBadge />
                    </span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.telegram_id.placeholder}
                      dir="ltr"
                      {...register("telegram_id")}
                    />
                    <FieldError message={errors.telegram_id?.message} />
                  </label>

                  <label>
                    <span className={labelClass}>
                      {content.fields.instagram_id.label}
                      <OptionalBadge />
                    </span>
                    <input
                      className={inputClass}
                      placeholder={content.fields.instagram_id.placeholder}
                      dir="ltr"
                      {...register("instagram_id")}
                    />
                    <FieldError message={errors.instagram_id?.message} />
                  </label>

                  <label className="sm:col-span-2">
                    <span className={labelClass}>
                      {content.fields.email.label}
                      <OptionalBadge />
                    </span>
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
                <Button
                  type="button"
                  onClick={() => goToNextStep(["full_name", "phone"])}
                  className="mt-4 w-full md:hidden"
                >
                  ادامه
                </Button>
              </div>

              <div data-form-group="" className={`${groupClass} ${getMobileStepClass(1)}`}>
                <h3 className={groupTitleClass}>
                  <span className={groupNumberClass}>۲</span>
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
                <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveFormStep(0)}
                    className="w-full"
                  >
                    قبلی
                  </Button>
                  <Button
                    type="button"
                    onClick={() => goToNextStep(["bitunix_uid"])}
                    className="w-full"
                  >
                    ادامه
                  </Button>
                </div>
              </div>

              <div data-form-group="" className={`${groupClass} ${getMobileStepClass(2)}`}>
                <h3 className={groupTitleClass}>
                  <span className={groupNumberClass}>۳</span>
                  {stepLabels[2]}
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
                <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveFormStep(1)}
                    className="w-full"
                  >
                    قبلی
                  </Button>
                  <Button
                    type="button"
                    onClick={() => goToNextStep(["trading_level", "main_challenge"])}
                    className="w-full"
                  >
                    ادامه
                  </Button>
                </div>
              </div>

              <div data-form-group="" className={`${groupClass} ${getMobileStepClass(3)} space-y-3`}>
                <h3 className={groupTitleClass}>
                  <span className={groupNumberClass}>۴</span>
                  {stepLabels[3]}
                </h3>
                <label className="flex items-start gap-3 rounded-2xl border border-brand-purple/14 bg-white/[0.035] p-3.5 sm:p-4">
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

                <label className="flex items-start gap-3 rounded-2xl border border-brand-purple/14 bg-white/[0.035] p-3.5 sm:p-4">
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
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveFormStep(2)}
                  className="w-full md:hidden"
                >
                  قبلی
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`${activeFormStep === 3 ? "inline-flex" : "hidden"} w-full md:inline-flex`}
              >
                {isSubmitting ? content.submitting : content.submit}
              </Button>
              <p className="text-center text-xs font-bold leading-6 text-brand-gray">
                {content.submitNote}
              </p>
              <div className="rounded-2xl border border-brand-purple/12 bg-white/[0.025] p-4">
                <h3 className="text-sm font-black text-brand-white">
                  {content.afterSubmit.title}
                </h3>
                <ol className="mt-3 space-y-2">
                  {content.afterSubmit.items.map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-2 text-xs font-bold leading-6 text-brand-light/78"
                    >
                      <span className="font-poppins text-brand-purple">
                        {(index + 1).toLocaleString("fa-IR", { useGrouping: false })}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </form>
          </GlassCard>
      </div>
    </div>
  );
}
