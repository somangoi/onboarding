import type { OnboardingOptions, OnboardingRequest, OnboardingResponse } from "../model/types";

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

export async function saveOnboarding(data: OnboardingRequest): Promise<OnboardingResponse> {
  const response = await fetch("/api/onboarding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save onboarding data");
  }

  return response.json();
}
