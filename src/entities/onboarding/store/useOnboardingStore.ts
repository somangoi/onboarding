import { create } from "zustand";
import { persist } from "zustand/middleware";
import { onboardingReducer, initialState, canMoveNext } from "../model/reducer";
import type { OnboardingState, OnboardingAction } from "../model/types";

interface OnboardingStore extends OnboardingState {
  dispatch: (action: OnboardingAction) => void;
  canMoveToNext: () => boolean;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      dispatch: (action) => {
        set((state) => onboardingReducer(state, action));
      },

      canMoveToNext: () => {
        return canMoveNext(get());
      },
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedUserType: state.selectedUserType,
        selectedInterests: state.selectedInterests,
        selectedIndustries: state.selectedIndustries,
        isCompleted: state.isCompleted,
      }),
    }
  )
);
