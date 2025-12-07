/**
 * 온보딩 상태머신 테스트
 */
import { describe, it, expect } from "vitest";
import { onboardingReducer, initialState } from "./reducer";
import type { OnboardingState } from "./types";

describe("onboardingReducer", () => {
  describe("NEXT 액션", () => {
    it("Step 0에서 Step 1로 이동", () => {
      const result = onboardingReducer(initialState, { type: "NEXT" });
      expect(result.currentStep).toBe(1);
      expect(result.isCompleted).toBe(false);
    });

    it("사용자 유형 선택 없이는 Step 1에서 선택완료 버튼 클릭 불가", () => {
      const state: OnboardingState = { ...initialState, currentStep: 1 };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(1);
    });

    it("사용자 유형 선택 후 Step 1에서 선택완료 버튼 클릭 가능", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 1,
        selectedUserType: "developer",
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(2);
    });

    it("관심사 선택 없이는 Step 2에서 선택완료 버튼 클릭 불가", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 2,
        selectedUserType: "developer",
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(2);
    });

    it("관심사 선택 후 Step 2에서 선택완료 버튼 클릭 가능", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 2,
        selectedUserType: "developer",
        selectedInterests: ["ai"],
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(3);
    });

    it("산업 분야 선택 없이는 Step 3에서 선택완료 버튼 클릭 불가", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 3,
        selectedUserType: "developer",
        selectedInterests: ["ai"],
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(3);
    });

    it("산업 분야 선택 후 Step 3에서 선택완료 버튼 클릭 가능", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 3,
        selectedUserType: "developer",
        selectedInterests: ["ai"],
        selectedIndustries: ["tech"],
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(4);
      expect(result.isCompleted).toBe(true);
    });

    it("Step 4에서는 더 이상 이동 불가", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 4,
        isCompleted: true,
      };
      const result = onboardingReducer(state, { type: "NEXT" });
      expect(result.currentStep).toBe(4);
    });
  });

  describe("PREV 액션", () => {
    it("Step 1에서 Step 0으로 이동", () => {
      const state: OnboardingState = { ...initialState, currentStep: 1 };
      const result = onboardingReducer(state, { type: "PREV" });
      expect(result.currentStep).toBe(0);
      expect(result.isCompleted).toBe(false);
    });

    it("Step 0에서는 이전 단계로 이동 불가", () => {
      const result = onboardingReducer(initialState, { type: "PREV" });
      expect(result.currentStep).toBe(0);
    });

    it("완료 상태에서 이전 단계로 이동 시 isCompleted false로 변경", () => {
      const state: OnboardingState = {
        ...initialState,
        currentStep: 4,
        isCompleted: true,
      };
      const result = onboardingReducer(state, { type: "PREV" });
      expect(result.currentStep).toBe(3);
      expect(result.isCompleted).toBe(false);
    });
  });

  describe("SKIP 액션", () => {
    it("Step 1에서 선택 없이 스킵 가능", () => {
      const state: OnboardingState = { ...initialState, currentStep: 1 };
      const result = onboardingReducer(state, { type: "SKIP" });
      expect(result.currentStep).toBe(2);
    });

    it("Step 2에서 선택 없이 스킵 가능", () => {
      const state: OnboardingState = { ...initialState, currentStep: 2 };
      const result = onboardingReducer(state, { type: "SKIP" });
      expect(result.currentStep).toBe(3);
    });

    it("Step 3에서 선택 없이 스킵 가능", () => {
      const state: OnboardingState = { ...initialState, currentStep: 3 };
      const result = onboardingReducer(state, { type: "SKIP" });
      expect(result.currentStep).toBe(4);
      expect(result.isCompleted).toBe(true);
    });
  });

  describe("RESET 액션", () => {
    it("모든 상태가 초기화됨", () => {
      const state: OnboardingState = {
        currentStep: 3,
        selectedUserType: "developer",
        selectedInterests: ["ai", "ml"],
        selectedIndustries: ["tech"],
        isCompleted: false,
      };
      const result = onboardingReducer(state, { type: "RESET" });
      expect(result).toEqual(initialState);
    });
  });

  describe("SET_USER_TYPE 액션", () => {
    it("사용자 유형을 설정", () => {
      const result = onboardingReducer(initialState, {
        type: "SET_USER_TYPE",
        payload: "developer",
      });
      expect(result.selectedUserType).toBe("developer");
    });

    it("기존 사용자 유형을 변경", () => {
      const state: OnboardingState = {
        ...initialState,
        selectedUserType: "developer",
      };
      const result = onboardingReducer(state, {
        type: "SET_USER_TYPE",
        payload: "designer",
      });
      expect(result.selectedUserType).toBe("designer");
    });
  });

  describe("TOGGLE_INTEREST 액션", () => {
    it("관심사를 추가", () => {
      const result = onboardingReducer(initialState, {
        type: "TOGGLE_INTEREST",
        payload: "ai",
      });
      expect(result.selectedInterests).toEqual(["ai"]);
    });

    it("기존 관심사를 제거", () => {
      const state: OnboardingState = {
        ...initialState,
        selectedInterests: ["ai", "ml"],
      };
      const result = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "ai",
      });
      expect(result.selectedInterests).toEqual(["ml"]);
    });

    it("여러 관심사 토글", () => {
      let state = onboardingReducer(initialState, {
        type: "TOGGLE_INTEREST",
        payload: "ai",
      });
      state = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "ml",
      });
      state = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "blockchain",
      });
      expect(state.selectedInterests).toEqual(["ai", "ml", "blockchain"]);

      state = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "ml",
      });
      expect(state.selectedInterests).toEqual(["ai", "blockchain"]);
    });
  });

  describe("TOGGLE_INDUSTRY 액션", () => {
    it("산업 분야를 추가", () => {
      const result = onboardingReducer(initialState, {
        type: "TOGGLE_INDUSTRY",
        payload: "tech",
      });
      expect(result.selectedIndustries).toEqual(["tech"]);
    });

    it("기존 산업 분야를 제거", () => {
      const state: OnboardingState = {
        ...initialState,
        selectedIndustries: ["tech", "finance"],
      };
      const result = onboardingReducer(state, {
        type: "TOGGLE_INDUSTRY",
        payload: "tech",
      });
      expect(result.selectedIndustries).toEqual(["finance"]);
    });

    it("여러 산업 분야 토글", () => {
      let state = onboardingReducer(initialState, {
        type: "TOGGLE_INDUSTRY",
        payload: "tech",
      });
      state = onboardingReducer(state, {
        type: "TOGGLE_INDUSTRY",
        payload: "finance",
      });
      state = onboardingReducer(state, {
        type: "TOGGLE_INDUSTRY",
        payload: "healthcare",
      });
      expect(state.selectedIndustries).toEqual(["tech", "finance", "healthcare"]);

      state = onboardingReducer(state, {
        type: "TOGGLE_INDUSTRY",
        payload: "finance",
      });
      expect(state.selectedIndustries).toEqual(["tech", "healthcare"]);
    });
  });

  describe("전체 플로우 통합 테스트", () => {
    it("정상 플로우: Step 0 → Step 4까지 완료", () => {
      let state = initialState;

      // Step 0 → Step 1
      state = onboardingReducer(state, { type: "NEXT" });
      expect(state.currentStep).toBe(1);

      // 사용자 유형 선택
      state = onboardingReducer(state, {
        type: "SET_USER_TYPE",
        payload: "developer",
      });

      // Step 1 → Step 2
      state = onboardingReducer(state, { type: "NEXT" });
      expect(state.currentStep).toBe(2);

      // 관심사 선택
      state = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "ai",
      });

      // Step 2 → Step 3
      state = onboardingReducer(state, { type: "NEXT" });
      expect(state.currentStep).toBe(3);

      // 산업 분야 선택
      state = onboardingReducer(state, {
        type: "TOGGLE_INDUSTRY",
        payload: "tech",
      });

      // Step 3 → Step 4
      state = onboardingReducer(state, { type: "NEXT" });
      expect(state.currentStep).toBe(4);
      expect(state.isCompleted).toBe(true);
    });

    it("스킵 플로우: 모든 단계 스킵하여 완료", () => {
      let state = initialState;

      // Step 0 → Step 1
      state = onboardingReducer(state, { type: "NEXT" });

      // Step 1 → Step 2 (스킵)
      state = onboardingReducer(state, { type: "SKIP" });
      expect(state.currentStep).toBe(2);

      // Step 2 → Step 3 (스킵)
      state = onboardingReducer(state, { type: "SKIP" });
      expect(state.currentStep).toBe(3);

      // Step 3 → Step 4 (스킵)
      state = onboardingReducer(state, { type: "SKIP" });
      expect(state.currentStep).toBe(4);
      expect(state.isCompleted).toBe(true);

      // 선택 데이터 없음 확인
      expect(state.selectedUserType).toBeNull();
      expect(state.selectedInterests).toEqual([]);
      expect(state.selectedIndustries).toEqual([]);
    });

    it("로고 클릭 시 초기화", () => {
      let state = initialState;

      // 일부 진행
      state = onboardingReducer(state, { type: "NEXT" });
      state = onboardingReducer(state, {
        type: "SET_USER_TYPE",
        payload: "developer",
      });
      state = onboardingReducer(state, { type: "NEXT" });
      state = onboardingReducer(state, {
        type: "TOGGLE_INTEREST",
        payload: "ai",
      });

      // 초기화
      state = onboardingReducer(state, { type: "RESET" });
      expect(state).toEqual(initialState);
    });
  });
});
