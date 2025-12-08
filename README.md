# Epic AI 온보딩 프로젝트

React + TypeScript + Vite를 기반으로 한 Epic AI 투자 서비스의 사용자 온보딩 플로우 구현 프로젝트입니다.

## 과제 설명

사용자가 Epic AI 투자 서비스를 처음 사용할 때 개인화된 경험을 제공하기 위해, 사용자 유형, 관심사, 투자 관심 업종을 파악하는 다단계 온보딩 프로세스를 구현했습니다.

### 구현 내용 요약

#### 1. 온보딩 플로우

- **Step 1**: 사용자 유형 선택 (단일 선택)
- **Step 2**: 관심사 선택 (다중 선택)
- **Step 3**: 투자 관심 업종 선택 (다중 선택)
- **Step 4**: 완료 화면

#### 2. 주요 기능

- **Progress Indicator**: 각 단계별 진행 상황 시각화
- **Router Guard**: 단계별 접근 제어 - 이전 단계를 완료하지 않으면 다음 단계 접근 불가
- **State Persistence**: 새로고침 시에도 선택 내용 유지 (LocalStorage 활용)
- **Preloading**: 다음 단계 데이터 미리 로드로 원활한 UX 제공
- **Validation**: 각 단계별 필수 선택 조건 검증
- **Navigation**: 뒤로가기 버튼으로 이전 단계 재방문 가능
- **Skip 기능**: 선택 없이 다음 단계로 진행 가능

#### 3. 컴포넌트 구조

- **공통 컴포넌트**: Button, Header, Toaster
- **온보딩 전용 컴포넌트**:
  - StepHeader: 단계별 제목 및 부제목, 뒤로가기 버튼
  - StepFooter: 다음 단계 버튼 및 건너뛰기 버튼
  - ProgressDots: 진행 단계 표시
  - OptionCard/OptionGrid: 선택 옵션 UI

## 실행 방법

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)으로 접속합니다.

### 빌드

```bash
yarn build
```

### 테스트 실행

```bash
yarn test
```

### 린트 검사

```bash
yarn lint
```

## 주요 기술적 결정 사항

### 1. 온보딩 라우팅 전략 (TanStack Router v1)

복잡한 온보딩 플로우의 UI 일관성과 상태 동기화를 위해 TanStack Router의 핵심 기능들을 적극 활용했습니다.

- Pathless Layout (\_funnel) 적용
  - 배경: 온보딩 진입 페이지(Step 0)와 입력 단계(Step 1~4)는 동일한 URL 뎁스를 가지지만, 서로 다른 레이아웃 구조를 가짐
  - 결정: \_funnel 디렉토리를 활용한 Pathless Layout 도입
  - 효과: URL 구조(onboarding/step-1)를 해치지 않으면서, 입력 단계들에만 공통 레이아웃(Progress Bar, Container)을 효율적으로 적용 및 격리

- URL as Single Source of Truth
  - 배경: 전역 상태에 currentStep을 저장할 경우, 브라우저 뒤로 가기나 새로고침 시 UI와 실제 URL 간의 싱크가 어긋나는 문제 발생
  - 결정: currentStep 상태를 제거하고, useLocation 훅을 통해 URL 경로에서 현재 단계를 파생하여 사용
  - 효과: 브라우저 히스토리와 완벽하게 동기화되는 네비게이션 경험 제공

### 2. 접근 제어 및 데이터 관리

- 최고 도달 단계를 기반으로한 Route Guard
  - 배경: 건너뛰기 기능이 존재하므로, 단순히 '데이터 입력 여부'만으로는 다음 단계 접근 권한을 판단하기 어려움
  - 결정: useOnboardingStore에 maxStep 상태를 추가하고, TanStack Router의 `beforeLoad` 훅에서 이를 검증
  - 효과: 사용자가 정해진 순서를 따르도록 강제하면서도, 이미 도달했던 단계 내에서는 자유로운 이동을 보장

- Loader를 활용한 Fetch-on-Navigation
  - 배경: 다음 단계로 진입 후 데이터를 로딩하면 워터폴 현상과 레이아웃 시프트가 발생 가능
  - 결정: `loader`를 정의하여 네비게이션 시작 시점에 데이터를 preloading
  - 효과: 데이터 로딩이 완료된 후 화면을 전환하여 매끄러운 UX 제공 및 컴포넌트 내부의 로딩 상태 관리 복잡도 제거

### 3. 폴더 구조 설계

**디렉토리 구조**:

```
src/
├── entities/         # 비즈니스 엔티티 (onboarding store, api, validation)
├── features/         # 기능별 컴포넌트 (온보딩 전용 UI)
├── shared/           # 공통 컴포넌트, 유틸리티
└── routes/           # 페이지 라우트
```

- 계층별 관심사 분리
  - 배경: 애플리케이션 규모가 커짐에 따라 비즈니스 로직과 UI 코드가 뒤섞여 유지보수가 어려워지고, 컴포넌트 간 결합도가 높아지는 문제 발생 우려
  - 결정: FSD(Feature-Sliced Design) 방법론을 차용하여 entities(도메인), features(기능), shared(공통), routes(페이지)로 역할을 명확히 구분하는 계층형 아키텍처 도입
  - 효과: 각 레이어의 책임이 명확해져 코드 탐색 비용이 현저히 감소하고, 엄격한 단방향 의존성 규칙을 통해 순환 참조 문제를 원천 차단

## 기술 스택

### Core

- **React 19.2.0**: UI 라이브러리
- **TypeScript 5.9.3**: 정적 타입 검사
- **Vite 7.2.4**: 빌드 도구

### 라우팅 & 상태 관리

- **TanStack Router 1.139.14**: Type-safe 파일 기반 라우팅
- **TanStack Query 5.90.12**: 서버 상태 관리
- **Zustand 5.0.9**: 클라이언트 상태 관리

### 스타일링

- **Tailwind CSS 4.1.17**: 유틸리티 퍼스트 CSS 프레임워크
- **class-variance-authority**: 컴포넌트 variant 관리
- **clsx + tailwind-merge**: 조건부 클래스 결합

### 개발 도구

- **MSW 2.12.4**: API 모킹
- **Vitest 4.0.15**: 테스팅 프레임워크
- **ESLint + Prettier**: 코드 품질 및 포맷팅

## 프로젝트 구조

```
src/
├── entities/
│   └── onboarding/
│       ├── api/              # API 호출 및 React Query hooks
│       ├── model/            # 타입 정의 및 validation
│       └── store/            # Zustand store
├── features/
│   └── onboarding/
│       └── components/       # 온보딩 전용 컴포넌트
├── routes/
│   ├── __root.tsx           # Root 레이아웃
│   ├── index.tsx            # 랜딩 페이지
│   ├── _funnel.tsx          # 온보딩 레이아웃
│   └── _funnel/
│       ├── step-1.tsx       # 사용자 유형 선택
│       ├── step-2.tsx       # 관심사 선택
│       ├── step-3.tsx       # 업종 선택
│       └── step-4.tsx       # 완료 화면
├── shared/
│   ├── components/          # 공통 컴포넌트
│   └── lib/                 # 유틸리티 함수
└── mocks/                   # MSW 핸들러
```
