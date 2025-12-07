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

