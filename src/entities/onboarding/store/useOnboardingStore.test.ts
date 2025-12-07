import { describe, it, expect, beforeEach } from "vitest";
import { useOnboardingStore } from "./useOnboardingStore";

describe("useOnboardingStore", () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  describe("setUserType", () => {
    it("사용자 유형을 설정", () => {
      const { setUserType, selectedUserType } = useOnboardingStore.getState();

      setUserType("developer");

      expect(selectedUserType).toBe("developer");
    });

    it("기존 사용자 유형을 변경", () => {
      const { setUserType, selectedUserType } = useOnboardingStore.getState();

      setUserType("developer");
      setUserType("designer");

      expect(selectedUserType).toBe("designer");
    });
  });

  describe("toggleInterest", () => {
    it("관심사를 추가", () => {
      const { toggleInterest, selectedInterests } = useOnboardingStore.getState();

      toggleInterest("ai");

      expect(selectedInterests).toEqual(["ai"]);
    });

    it("기존 관심사를 제거", () => {
      const { toggleInterest, selectedInterests } = useOnboardingStore.getState();

      toggleInterest("ai");
      toggleInterest("ml");
      toggleInterest("ai");

      expect(selectedInterests).toEqual(["ml"]);
    });

    it("여러 관심사 토글", () => {
      const { toggleInterest, selectedInterests } = useOnboardingStore.getState();

      toggleInterest("ai");
      toggleInterest("ml");
      toggleInterest("blockchain");

      expect(selectedInterests).toEqual(["ai", "ml", "blockchain"]);

      toggleInterest("ml");

      expect(selectedInterests).toEqual(["ai", "blockchain"]);
    });
  });

  describe("toggleIndustry", () => {
    it("산업 분야를 추가", () => {
      const { toggleIndustry, selectedIndustries } = useOnboardingStore.getState();

      toggleIndustry("tech");

      expect(selectedIndustries).toEqual(["tech"]);
    });

    it("기존 산업 분야를 제거", () => {
      const { toggleIndustry, selectedIndustries } = useOnboardingStore.getState();

      toggleIndustry("tech");
      toggleIndustry("finance");
      toggleIndustry("tech");

      expect(selectedIndustries).toEqual(["finance"]);
    });

    it("여러 산업 분야 토글", () => {
      const { toggleIndustry, selectedIndustries } = useOnboardingStore.getState();

      toggleIndustry("tech");
      toggleIndustry("finance");
      toggleIndustry("healthcare");

      expect(selectedIndustries).toEqual(["tech", "finance", "healthcare"]);

      toggleIndustry("finance");

      expect(selectedIndustries).toEqual(["tech", "healthcare"]);
    });
  });

  describe("reset", () => {
    it("모든 상태가 초기화됨", () => {
      const { setUserType, toggleInterest, toggleIndustry, reset, selectedUserType, selectedInterests, selectedIndustries } = useOnboardingStore.getState();

      setUserType("developer");
      toggleInterest("ai");
      toggleIndustry("tech");

      reset();

      expect(selectedUserType).toBeNull();
      expect(selectedInterests).toEqual([]);
      expect(selectedIndustries).toEqual([]);
    });
  });

  describe("전체 플로우 통합 테스트", () => {
    it("정상 플로우: 모든 선택 완료", () => {
      const { setUserType, toggleInterest, toggleIndustry, selectedUserType, selectedInterests, selectedIndustries } = useOnboardingStore.getState();

      setUserType("developer");
      expect(selectedUserType).toBe("developer");

      toggleInterest("ai");
      expect(selectedInterests).toEqual(["ai"]);

      toggleIndustry("tech");
      expect(selectedIndustries).toEqual(["tech"]);
    });

    it("스킵 플로우: 선택하지 않고 진행", () => {
      const { selectedUserType, selectedInterests, selectedIndustries } = useOnboardingStore.getState();
      expect(selectedUserType).toBeNull();
      expect(selectedInterests).toEqual([]);
      expect(selectedIndustries).toEqual([]);
    });

    it("로고 클릭 시 초기화", () => {
      const { setUserType, toggleInterest, reset, selectedUserType, selectedInterests, selectedIndustries } = useOnboardingStore.getState();

      setUserType("developer");
      toggleInterest("ai");

      reset();

      expect(selectedUserType).toBeNull();
      expect(selectedInterests).toEqual([]);
      expect(selectedIndustries).toEqual([]);
    });
  });
});
