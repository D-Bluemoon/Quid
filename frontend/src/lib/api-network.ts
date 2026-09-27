/**
 * Detect fetch/network failures when the API is configured but unreachable
 * (e.g. backend not running on localhost:3001).
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    const message = error.message.toLowerCase();
    return (
      message.includes("failed to fetch") ||
      message.includes("networkerror") ||
      message.includes("network request failed")
    );
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("failed to fetch") ||
      message.includes("networkerror") ||
      message.includes("network request failed")
    );
  }

  return false;
}

/** Backend missing, wrong path, or not running — safe to fall back to local-only mode. */
export class ApiUnreachableError extends Error {
  constructor(message = "Backend API is not reachable") {
    super(message);
    this.name = "ApiUnreachableError";
  }
}

export function isApiUnreachableError(error: unknown): boolean {
  if (error instanceof ApiUnreachableError) return true;
  return isNetworkError(error);
}
