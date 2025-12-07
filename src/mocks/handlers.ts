import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
  }),

  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: "John Doe",
    });
  }),

  http.get("/api/onboarding/options", () => {
    return HttpResponse.json({
      userTypes: [
        { id: "individual", label: "개인 투자자" },
        { id: "asset-manager", label: "자산운용사" },
        { id: "fund-manager", label: "펀드매니저" },
        { id: "researcher", label: "리서치 연구원" },
        { id: "corporate", label: "기업 시장조사" },
        { id: "foreign", label: "외국인 투자자" },
      ],
      interests: [
        { id: "analysis", label: "빠른 기업 분석" },
        { id: "integrated", label: "다양한 투자정보를 한 곳에서 해결" },
        { id: "exclusive", label: "epic AI에서만 볼 수 있는 투자 정보" },
        { id: "automation", label: "데이터 분석을 대신 해주는 편리함" },
        { id: "notification", label: "투자정보를 놓치지 않게 알려줌" },
        { id: "copilot", label: "Copilot의 전문적인 질의응답" },
      ],
      industries: [
        { id: "it", label: "IT" },
        { id: "software", label: "소프트웨어" },
        { id: "healthcare", label: "건강관리" },
        { id: "consumer", label: "경기관련소비재" },
        { id: "finance", label: "금융" },
        { id: "industrial", label: "산업/운송" },
        { id: "materials", label: "소재" },
        { id: "utilities", label: "유틸리티" },
        { id: "battery", label: "이차전지" },
        { id: "automotive", label: "자동차와 자동차부품" },
        { id: "holding", label: "지주회사" },
        { id: "telecom", label: "통신서비스" },
        { id: "staples", label: "필수소비재" },
      ],
    });
  }),

  http.post("/api/onboarding", async ({ request }) => {
    const body = await request.json();
    console.log("온보딩 데이터 저장:", body);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json({
      success: true,
      message: "온보딩 완료",
    });
  }),
];
