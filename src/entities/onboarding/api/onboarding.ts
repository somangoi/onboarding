import type { OnboardingOptions } from "../model/types";

/**
 * 온보딩 옵션 조회 API
 */
export async function getOnboardingOptions(): Promise<OnboardingOptions> {
  const response = await fetch("/api/onboarding/options");

  if (!response.ok) {
    throw new Error("Failed to fetch onboarding options");
  }

  return response.json();
}
