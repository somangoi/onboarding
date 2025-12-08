import { describe, it, expect, beforeEach } from "vitest";
import { useOnboardingStore } from "./useOnboardingStore";

describe("useOnboardingStore", () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  describe("setUserType", () => {
    it("사용자 유형을 설정", () => {
      const { setUserType } = useOnboardingStore.getState();

      setUserType("developer");

      expect(useOnboardingStore.getState().selectedUserType).toBe("developer");
    });

    it("기존 사용자 유형을 변경", () => {
      const { setUserType } = useOnboardingStore.getState();

      setUserType("developer");
      setUserType("designer");

      expect(useOnboardingStore.getState().selectedUserType).toBe("designer");
    });
  });

  describe("toggleInterest", () => {
    it("관심사를 추가", () => {
      const { toggleInterest } = useOnboardingStore.getState();

      toggleInterest("ai");

      expect(useOnboardingStore.getState().selectedInterests).toEqual(["ai"]);
    });

    it("기존 관심사를 제거", () => {
      const { toggleInterest } = useOnboardingStore.getState();

      toggleInterest("ai");
      toggleInterest("ml");
      toggleInterest("ai");

      expect(useOnboardingStore.getState().selectedInterests).toEqual(["ml"]);
    });

    it("여러 관심사 토글", () => {
      const { toggleInterest } = useOnboardingStore.getState();

      toggleInterest("ai");
      toggleInterest("ml");
      toggleInterest("blockchain");

      expect(useOnboardingStore.getState().selectedInterests).toEqual(["ai", "ml", "blockchain"]);

      toggleInterest("ml");

      expect(useOnboardingStore.getState().selectedInterests).toEqual(["ai", "blockchain"]);
    });
  });

  describe("toggleIndustry", () => {
    it("산업 분야를 추가", () => {
      const { toggleIndustry } = useOnboardingStore.getState();

      toggleIndustry("tech");

      expect(useOnboardingStore.getState().selectedIndustries).toEqual(["tech"]);
    });

    it("기존 산업 분야를 제거", () => {
      const { toggleIndustry } = useOnboardingStore.getState();

      toggleIndustry("tech");
      toggleIndustry("finance");
      toggleIndustry("tech");

      expect(useOnboardingStore.getState().selectedIndustries).toEqual(["finance"]);
    });

    it("여러 산업 분야 토글", () => {
      const { toggleIndustry } = useOnboardingStore.getState();

      toggleIndustry("tech");
      toggleIndustry("finance");
      toggleIndustry("healthcare");

      expect(useOnboardingStore.getState().selectedIndustries).toEqual(["tech", "finance", "healthcare"]);

      toggleIndustry("finance");

      expect(useOnboardingStore.getState().selectedIndustries).toEqual(["tech", "healthcare"]);
    });
  });

  describe("reset", () => {
    it("모든 상태가 초기화됨", () => {
      const { setUserType, toggleInterest, toggleIndustry, reset } = useOnboardingStore.getState();

      setUserType("developer");
      toggleInterest("ai");
      toggleIndustry("tech");

      reset();

      const state = useOnboardingStore.getState();
      expect(state.selectedUserType).toBeNull();
      expect(state.selectedInterests).toEqual([]);
      expect(state.selectedIndustries).toEqual([]);
    });
  });

  describe("전체 플로우 통합 테스트", () => {
    it("정상 플로우: 모든 선택 완료", () => {
      const { setUserType, toggleInterest, toggleIndustry } = useOnboardingStore.getState();

      setUserType("developer");
      expect(useOnboardingStore.getState().selectedUserType).toBe("developer");

      toggleInterest("ai");
      expect(useOnboardingStore.getState().selectedInterests).toEqual(["ai"]);

      toggleIndustry("tech");
      expect(useOnboardingStore.getState().selectedIndustries).toEqual(["tech"]);
    });

    it("스킵 플로우: 선택하지 않고 진행", () => {
      const state = useOnboardingStore.getState();
      expect(state.selectedUserType).toBeNull();
      expect(state.selectedInterests).toEqual([]);
      expect(state.selectedIndustries).toEqual([]);
    });

    it("로고 클릭 시 초기화", () => {
      const { setUserType, toggleInterest, reset } = useOnboardingStore.getState();

      setUserType("developer");
      toggleInterest("ai");

      reset();

      const state = useOnboardingStore.getState();
      expect(state.selectedUserType).toBeNull();
      expect(state.selectedInterests).toEqual([]);
      expect(state.selectedIndustries).toEqual([]);
    });
  });
});
