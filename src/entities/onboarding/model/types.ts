/**
 * 온보딩 관련 타입 정의
 */

/** 선택 옵션 타입 */
export interface Option {
  id: string;
  label: string;
}

/** GET /api/onboarding/options 응답 타입 */
export interface OnboardingOptions {
  userTypes: Option[];
  interests: Option[];
  industries: Option[];
}

/** POST /api/onboarding 요청 타입 */
export interface OnboardingRequest {
  userType: string;
  interests: string[];
  industries: string[];
}

/** POST /api/onboarding 응답 타입 */
export interface OnboardingResponse {
  success: boolean;
  message: string;
}

/** 온보딩 상태 인터페이스 */
export interface OnboardingState {
  /** 현재 단계 (1: 사용자 유형, 2: 관심사, 3: 산업 분야) */
  currentStep: 1 | 2 | 3;
  /** 선택된 사용자 유형 */
  selectedUserType: string | null;
  /** 선택된 관심사 목록 */
  selectedInterests: string[];
  /** 선택된 산업 분야 목록 */
  selectedIndustries: string[];
  /** 온보딩 완료 여부 */
  isCompleted: boolean;
}
