import { queryOptions, useQuery } from "@tanstack/react-query";
import { getOnboardingOptions } from "./onboarding";

export const onboardingOptions = queryOptions({
  queryKey: ["onboarding", "options"],
  queryFn: getOnboardingOptions,
});

export function useOnboardingOptions() {
  return useQuery(onboardingOptions);
}
