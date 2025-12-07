import { useQuery } from "@tanstack/react-query";
import { getOnboardingOptions } from "./onboarding";

export function useOnboardingOptions() {
  return useQuery({
    queryKey: ["onboarding", "options"],
    queryFn: getOnboardingOptions,
  });
}
