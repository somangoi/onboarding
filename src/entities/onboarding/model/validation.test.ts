import { describe, it, expect } from "vitest";
import { canMoveFromStep1, canMoveFromStep2, canMoveFromStep3 } from "./validation";

describe("validation", () => {
  describe("canMoveFromStep1", () => {
    it("사용자 유형이 선택되지 않으면 false", () => {
      expect(canMoveFromStep1(null)).toBe(false);
    });

    it("사용자 유형이 선택되면 true", () => {
      expect(canMoveFromStep1("developer")).toBe(true);
    });
  });

  describe("canMoveFromStep2", () => {
    it("관심사가 비어있으면 false", () => {
      expect(canMoveFromStep2([])).toBe(false);
    });

    it("관심사가 하나 이상 선택되면 true", () => {
      expect(canMoveFromStep2(["ai"])).toBe(true);
      expect(canMoveFromStep2(["ai", "ml"])).toBe(true);
    });
  });

  describe("canMoveFromStep3", () => {
    it("산업 분야가 비어있으면 false", () => {
      expect(canMoveFromStep3([])).toBe(false);
    });

    it("산업 분야가 하나 이상 선택되면 true", () => {
      expect(canMoveFromStep3(["tech"])).toBe(true);
      expect(canMoveFromStep3(["tech", "finance"])).toBe(true);
    });
  });
});
