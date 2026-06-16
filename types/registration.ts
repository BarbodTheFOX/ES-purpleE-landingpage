import type { RegistrationInput } from "@/lib/validations/registration";

export type RegistrationRecord = RegistrationInput & {
  id: string;
  registration_number: number;
  is_first_500: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type RegistrationResponse =
  | {
      success: true;
      is_first_500: boolean;
      registration_number: number;
      message: string;
    }
  | {
      success: false;
      message: string;
      fields?: Record<string, string>;
    };
