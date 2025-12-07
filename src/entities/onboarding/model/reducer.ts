import type { OnboardingState, OnboardingAction, OnboardingStep } from "./types";

export const initialState: OnboardingState = {
  currentStep: 0,
  selectedUserType: null,
  selectedInterests: [],
  selectedIndustries: [],
  isCompleted: false,
};

export const canMoveNext = (state: OnboardingState): boolean => {
  switch (state.currentStep) {
    case 0:
      return true;
    case 1:
      return state.selectedUserType !== null;
    case 2:
      return state.selectedInterests.length > 0;
    case 3:
      return state.selectedIndustries.length > 0;
    case 4:
      return false;
    default:
      return false;
  }
};

const getNextStep = (currentStep: OnboardingStep): OnboardingStep => {
  if (currentStep >= 4) return 4;
  return (currentStep + 1) as OnboardingStep;
};

const getPrevStep = (currentStep: OnboardingStep): OnboardingStep => {
  if (currentStep <= 0) return 0;
  return (currentStep - 1) as OnboardingStep;
};

const toggleArrayItem = (array: string[], item: string): string[] => {
  const index = array.indexOf(item);
  if (index > -1) {
    return array.filter((_, i) => i !== index);
  }
  return [...array, item];
};

export const onboardingReducer = (state: OnboardingState, action: OnboardingAction): OnboardingState => {
  switch (action.type) {
    case "NEXT": {
      if (!canMoveNext(state)) {
        return state;
      }
      const nextStep = getNextStep(state.currentStep);
      return {
        ...state,
        currentStep: nextStep,
        isCompleted: nextStep === 4,
      };
    }

    case "PREV": {
      const prevStep = getPrevStep(state.currentStep);
      return {
        ...state,
        currentStep: prevStep,
        isCompleted: false,
      };
    }

    case "SKIP": {
      const nextStep = getNextStep(state.currentStep);
      return {
        ...state,
        currentStep: nextStep,
        isCompleted: nextStep === 4,
      };
    }

    case "RESET": {
      return initialState;
    }

    case "SET_USER_TYPE": {
      return {
        ...state,
        selectedUserType: action.payload,
      };
    }

    case "TOGGLE_INTEREST": {
      return {
        ...state,
        selectedInterests: toggleArrayItem(state.selectedInterests, action.payload),
      };
    }

    case "TOGGLE_INDUSTRY": {
      return {
        ...state,
        selectedIndustries: toggleArrayItem(state.selectedIndustries, action.payload),
      };
    }

    default:
      return state;
  }
};
