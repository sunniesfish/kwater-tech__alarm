# K Water Tech 알람 애플리케이션

[서비스 링크](https://kwater-tech-alarm.netlify.app/)

## 프로젝트 소개

K Water Tech 알람 애플리케이션은 알람 설정 및 알람음악 업로드 기능을 제공하는 PWA 서비스 입니다.

### 주요 특징

- **오프라인 지원**: 인터넷 연결 없이도 알람 기능 사용 가능
- **설치 가능**: 홈 화면에 추가하여 앱처럼 사용 가능
- **반응형 디자인**: 모바일과 데스크톱 화면에 최적화된 별도 UI/UX

## 기술 스택

### 프론트엔드

- **React 19**: 사용자 인터페이스 구축
- **TypeScript 5**: 정적 타입 시스템으로 코드 안정성 향상
- **Vite**: 빠른 개발 환경 및 최적화된 빌드 제공
- **Zustand**: 간결하고 확장 가능한 상태 관리
- **Tailwind CSS**: 유틸리티 기반 스타일링 시스템
- **shadcn/ui**: 접근성 높은 UI 컴포넌트 라이브러리
- **Radix UI**: 하위 수준 UI 프리미티브 컴포넌트

### 데이터 저장

- **IndexedDB**: 브라우저 내 로컬 데이터 저장 (알람 및 음악 파일)
- **idb**: IndexedDB 작업을 간소화하는 라이브러리

### PWA 기능

- **Service Workers**: 오프라인 기능 및 백그라운드 동기화
- **Web Manifest**: 설치 가능한 앱 구성
- **Workbox**: PWA 최적화 도구 (vite-plugin-pwa 사용)

## 프로젝트 구조

```
kwater-tech__alarm/
├── public/           # 정적 자산 및 PWA 매니페스트
├── src/
│   ├── components/   # 재사용 가능한 UI 컴포넌트
│   │   ├── alarm/    # 알람 관련 컴포넌트
│   │   ├── common/   # 공통 컴포넌트
│   │   ├── desktop/  # 데스크톱 전용 컴포넌트
│   │   ├── mobile/   # 모바일 전용 컴포넌트
│   │   ├── music/    # 음악 관련 컴포넌트
│   │   └── ui/       # 기본 UI 컴포넌트
│   ├── lib/          # 유틸리티 및 헬퍼 함수
│   ├── store/        # Zustand 상태 관리
│   ├── type/         # TypeScript 타입 정의
│   ├── workers/      # Service Worker 관련 코드
│   ├── App.tsx       # 메인 애플리케이션 컴포넌트
│   └── main.tsx      # 진입점
├── index.html        # HTML 템플릿
├── tailwind.config.js # Tailwind 설정
├── tsconfig.json     # TypeScript 설정
├── vite.config.ts    # Vite 설정
└── package.json      # 의존성 및 스크립트
```

## 기능 상세

### 알람 관리

- **알람 생성**: 시간, 제목, 반복 설정, 음악 선택 지원
- **알람 삭제**: 불필요한 알람 제거
- **알람음 업로드**: 알람 용 음악 업로드 및 저장

### 디바이스 최적화

- **모바일/데스크톱 뷰**: 디바이스 유형에 따른 최적화된 UI 제공
- **PWA 설치 프롬프트**: 사용자 경험 향상을 위한 앱 설치 안내

### 사용자 경험

- **직관적인 UI**: 쉽고 빠른 알람 설정
- **사운드 선택**: 다양한 알람 소리 중 선택 가능
