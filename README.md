# SalesAI - B2B 영업 자동화 콘솔

AI 기반 B2B 영업 자동화 시스템의 프론트엔드 운영 콘솔입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하세요.

## 기술 스택

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (차트)
- Lucide React (아이콘)
- date-fns (날짜 포맷)

## 폴더 구조

```
app/
  (dashboard)/          # 대시보드 레이아웃 그룹
    dashboard/          # 메인 대시보드
    accounts/           # 계정 리스트 + 상세
    contacts/           # 담당자 리스트
    email-studio/       # 콜드메일 작성
    campaigns/          # 캠페인 리스트 + 상세
    insights/           # 인사이트 분석
    settings/           # 설정
components/
  layout/               # Sidebar, Header
  shared/               # 공통 컴포넌트 (KpiCard, StatusBadge 등)
lib/
  mock/                 # 더미 데이터
  types.ts              # 타입 정의
  utils.ts              # 유틸리티
```

## 주요 기능

- **Dashboard**: KPI 카드, 추천 리드 테이블, 활동 타임라인, 업종별 차트, AI 제안
- **Accounts**: 필터/검색/정렬, 회사 상세 (AI 분석, 시그널, 추천 담당자)
- **Contacts**: 역할별 탭 필터, 담당자 카드, 프로필 사이드 패널
- **Email Studio**: 2단 레이아웃 (리서치 + 에디터), AI 재생성, 검수, 승인/예약
- **Campaigns**: 캠페인 KPI, 시퀀스 성과, A/B 테스트, 답장 분포 차트
- **Insights**: 5종 분석 차트, 성공 패턴 요약, Best Performing Emails
- **Settings**: 일반/템플릿/금지표현/승인정책/팀원 관리

## 페이지 간 연결

- Dashboard 추천 리드 → Account Detail
- Account Detail 담당자 선택 → Email Studio
- Accounts 테이블 액션 → Email Studio
- Campaigns 리스트 → Campaign Detail
- Insights Best Email → 미리보기 모달
