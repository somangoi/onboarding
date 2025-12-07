import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveOnboarding } from "./onboarding";
import type { OnboardingRequest } from "../model/types";

export function useSaveOnboarding() {
  return useMutation({
    mutationFn: (data: OnboardingRequest) => saveOnboarding(data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toast.error(error.message || "온보딩 저장에 실패했습니다.");
    },
  });
}
