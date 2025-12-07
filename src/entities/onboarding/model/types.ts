/**
 * 온보딩 API 응답 타입 정의
 */
export interface Option {
  id: string;
  label: string;
}

// GET /api/onboarding/options 응답 타입
export interface OnboardingOptions {
  userTypes: Option[];
  interests: Option[];
  industries: Option[];
}

// POST /api/onboarding 요청 타입
export interface OnboardingRequest {
  userType: string;
  interests: string[];
  industries: string[];
}

// POST /api/onboarding 응답 타입
export interface OnboardingResponse {
  success: boolean;
  message: string;
}

export type OnboardingStep = 0 | 1 | 2 | 3 | 4;

export interface OnboardingState {
  // 현재 단계 (0: 시작, 1: 사용자 유형, 2: 관심사, 3: 산업 분야, 4: 완료)
  currentStep: OnboardingStep;
  selectedUserType: string | null;
  selectedInterests: string[];
  selectedIndustries: string[];
  isCompleted: boolean;
}

export type OnboardingAction =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SKIP" }
  | { type: "RESET" }
  | { type: "SET_USER_TYPE"; payload: string }
  | { type: "TOGGLE_INTEREST"; payload: string }
  | { type: "TOGGLE_INDUSTRY"; payload: string };
