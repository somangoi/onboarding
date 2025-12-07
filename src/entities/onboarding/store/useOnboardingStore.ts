import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingStore {
  selectedUserType: string | null;
  selectedInterests: string[];
  selectedIndustries: string[];

  setUserType: (userType: string) => void;
  toggleInterest: (interest: string) => void;
  toggleIndustry: (industry: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      selectedUserType: null,
      selectedInterests: [],
      selectedIndustries: [],

      setUserType: (userType) => set({ selectedUserType: userType }),

      toggleInterest: (interest) =>
        set((state) => ({
          selectedInterests: state.selectedInterests.includes(interest)
            ? state.selectedInterests.filter((i) => i !== interest)
            : [...state.selectedInterests, interest],
        })),

      toggleIndustry: (industry) =>
        set((state) => ({
          selectedIndustries: state.selectedIndustries.includes(industry)
            ? state.selectedIndustries.filter((i) => i !== industry)
            : [...state.selectedIndustries, industry],
        })),

      reset: () =>
        set({
          selectedUserType: null,
          selectedInterests: [],
          selectedIndustries: [],
        }),
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        selectedUserType: state.selectedUserType,
        selectedInterests: state.selectedInterests,
        selectedIndustries: state.selectedIndustries,
      }),
    }
  )
);
