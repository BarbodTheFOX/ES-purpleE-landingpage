import { NextResponse } from "next/server";
import { siteContent } from "@/lib/content";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { registrationSchema } from "@/lib/validations/registration";
import type { RegistrationResponse } from "@/types/registration";

const tableName = "purple_evolution_registrations";
const messages = siteContent.api;
const RESERVED_SLOTS = 100;
const PREMIUM_CAPACITY = 500;
const MAX_REGISTRATION_NUMBER_RETRIES = 2;

function errorResponse(
  message: string,
  status: number,
  fields?: Record<string, string>,
) {
  return NextResponse.json<RegistrationResponse>(
    { success: false, message, fields },
    { status },
  );
}

function formatRegistrationMessage(template: string, registrationNumber: number) {
  return template.replace(
    "{registration_number}",
    registrationNumber.toLocaleString("fa-IR", { useGrouping: false }),
  );
}

function isUniqueViolationOnUid(error: { code?: string; message?: string; details?: string }) {
  const errorText = `${error.message || ""} ${error.details || ""}`;

  return error.code === "23505" && errorText.includes("bitunix_uid");
}

function isUniqueViolationOnRegistrationNumber(error: {
  code?: string;
  message?: string;
  details?: string;
}) {
  const errorText = `${error.message || ""} ${error.details || ""}`;

  return error.code === "23505" && errorText.includes("registration_number");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse(messages.invalidRequest, 400);
  }

  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    const fields = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, value]) => [
        key,
        value?.[0] || messages.invalidField,
      ]),
    );

    return errorResponse(messages.formErrors, 422, fields);
  }

  try {
    const supabase = createSupabaseServiceClient();

    const { data: duplicate, error: duplicateError } = await supabase
      .from(tableName)
      .select("id")
      .eq("bitunix_uid", parsed.data.bitunix_uid)
      .maybeSingle();

    if (duplicateError) {
      return errorResponse(messages.uidCheckFailed, 500);
    }

    if (duplicate) {
      return errorResponse(messages.duplicateUid, 409, {
        bitunix_uid: messages.duplicateUidField,
      });
    }

    for (let attempt = 0; attempt <= MAX_REGISTRATION_NUMBER_RETRIES; attempt += 1) {
      const { count, error: countError } = await supabase
        .from(tableName)
        .select("id", { count: "exact", head: true })
        .neq("status", "rejected");

      if (countError || count === null) {
        return errorResponse(messages.capacityFailed, 500);
      }

      const registrationNumber = RESERVED_SLOTS + count + 1;
      const isFirst500 = registrationNumber <= PREMIUM_CAPACITY;

      const { error: insertError } = await supabase.from(tableName).insert({
        ...parsed.data,
        registration_number: registrationNumber,
        is_first_500: isFirst500,
        status: "pending",
      });

      if (!insertError) {
        const message = formatRegistrationMessage(
          isFirst500 ? messages.first500Success : messages.standardSuccess,
          registrationNumber,
        );

        return NextResponse.json<RegistrationResponse>({
          success: true,
          is_first_500: isFirst500,
          registration_number: registrationNumber,
          message,
        });
      }

      if (isUniqueViolationOnUid(insertError)) {
        return errorResponse(messages.duplicateUid, 409, {
          bitunix_uid: messages.duplicateUidField,
        });
      }

      if (
        isUniqueViolationOnRegistrationNumber(insertError) &&
        attempt < MAX_REGISTRATION_NUMBER_RETRIES
      ) {
        continue;
      }

      if (isUniqueViolationOnRegistrationNumber(insertError)) {
        return errorResponse(messages.registrationNumberConflict, 409);
      }

      return errorResponse(messages.insertFailed, 500);
    }

    return errorResponse(messages.registrationNumberConflict, 409);
  } catch {
    return errorResponse(messages.serverUnavailable, 500);
  }
}
