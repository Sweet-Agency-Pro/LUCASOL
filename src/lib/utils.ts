import { type ClassValue, clsx } from "clsx";

// Simple clsx implementation (no dependency needed)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, "");
}
