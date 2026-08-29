/**
 * API base URL for browser and server-side calls.
 *
 * - Local: NEXT_PUBLIC_API_URL=http://localhost:3001/api (see .env.example)
 * - Vercel: leave unset — browser uses same-origin `/api` (rewritten to NestJS)
 */
export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (typeof window !== "undefined") {
    return "/api";
  }

  return "http://localhost:3001/api";
}

export function isApiBaseConfigured(): boolean {
  return Boolean(getApiBaseUrl());
}
