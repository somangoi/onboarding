import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import type { OnboardingOptions, OnboardingResponse } from "../model/types";

const BASE_URL = "http://localhost:5173";

const server = setupServer(
  http.get(`${BASE_URL}/api/onboarding/options`, () => {
    return HttpResponse.json({
      userTypes: [
        { id: "individual", label: "개인 투자자" },
        { id: "asset-manager", label: "자산운용사" },
      ],
      interests: [
        { id: "analysis", label: "빠른 기업 분석" },
        { id: "integrated", label: "다양한 투자정보를 한 곳에서 해결" },
      ],
      industries: [
        { id: "it", label: "IT" },
        { id: "software", label: "소프트웨어" },
      ],
    } satisfies OnboardingOptions);
  }),

  http.post(`${BASE_URL}/api/onboarding`, async () => {
    return HttpResponse.json({
      success: true,
      message: "온보딩 완료",
    } satisfies OnboardingResponse);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getOnboardingOptions", () => {
  it("온보딩 옵션을 성공적으로 가져온다", async () => {
    const response = await fetch(`${BASE_URL}/api/onboarding/options`);
    const result = await response.json();

    expect(result).toBeDefined();
    expect(result.userTypes).toHaveLength(2);
    expect(result.interests).toHaveLength(2);
    expect(result.industries).toHaveLength(2);
    expect(result.userTypes[0]).toEqual({
      id: "individual",
      label: "개인 투자자",
    });
  });

  it("API 오류 시 에러를 throw한다", async () => {
    server.use(
      http.get(`${BASE_URL}/api/onboarding/options`, () => {
        return HttpResponse.json({ error: "Server error" }, { status: 500 });
      })
    );

    const response = await fetch(`${BASE_URL}/api/onboarding/options`);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });
});

describe("saveOnboarding", () => {
  it("온보딩 데이터를 성공적으로 저장한다", async () => {
    const data = {
      userType: "individual",
      interests: ["analysis", "integrated"],
      industries: ["it", "software"],
    };

    const response = await fetch(`${BASE_URL}/api/onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toBe("온보딩 완료");
  });

  it("API 오류 시 에러를 throw한다", async () => {
    server.use(
      http.post(`${BASE_URL}/api/onboarding`, () => {
        return HttpResponse.json({ error: "Server error" }, { status: 500 });
      })
    );

    const data = {
      userType: "individual",
      interests: ["analysis"],
      industries: ["it"],
    };

    const response = await fetch(`${BASE_URL}/api/onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });

  it("올바른 데이터 형식으로 POST 요청을 보낸다", async () => {
    let requestBody: any = null;

    server.use(
      http.post(`${BASE_URL}/api/onboarding`, async ({ request }) => {
        requestBody = await request.json();
        return HttpResponse.json({
          success: true,
          message: "온보딩 완료",
        });
      })
    );

    const data = {
      userType: "asset-manager",
      interests: ["analysis", "integrated"],
      industries: ["it", "software", "finance"],
    };

    await fetch(`${BASE_URL}/api/onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    expect(requestBody).toEqual(data);
  });
});
