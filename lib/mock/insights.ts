import { ChartDataPoint, BestEmail } from "@/lib/types";

export const industryReplyRates: ChartDataPoint[] = [
  { name: "IT/플랫폼", value: 26.3 },
  { name: "핀테크", value: 22.5 },
  { name: "게임", value: 30.0 },
  { name: "제조/에너지", value: 17.9 },
  { name: "이커머스", value: 24.0 },
  { name: "엔터", value: 28.5 },
];

export const titleReplyRates: ChartDataPoint[] = [
  { name: "문제 해결형", value: 30.8 },
  { name: "질문형", value: 22.5 },
  { name: "ESG 강조", value: 21.4 },
  { name: "사례 중심", value: 14.3 },
  { name: "직접적 제안", value: 26.3 },
  { name: "솔루션형", value: 16.7 },
];

export const positionReplyRates: ChartDataPoint[] = [
  { name: "CHRO/CPO", value: 28.5 },
  { name: "HR 디렉터", value: 24.2 },
  { name: "피플팀장", value: 22.0 },
  { name: "복지 매니저", value: 18.7 },
  { name: "총무 담당", value: 12.3 },
];

export const ctaReplyRates: ChartDataPoint[] = [
  { name: "미팅 제안", value: 22.5 },
  { name: "서비스 소개서", value: 18.3 },
  { name: "데모 제안", value: 25.1 },
  { name: "통화 제안", value: 20.8 },
  { name: "질문형 CTA", value: 15.2 },
];

export const hourlyReplyRates: ChartDataPoint[] = [
  { name: "08시", value: 12.0 },
  { name: "09시", value: 18.5 },
  { name: "10시", value: 24.2 },
  { name: "11시", value: 22.8 },
  { name: "12시", value: 8.3 },
  { name: "13시", value: 10.5 },
  { name: "14시", value: 21.7 },
  { name: "15시", value: 19.3 },
  { name: "16시", value: 16.8 },
  { name: "17시", value: 14.2 },
  { name: "18시", value: 6.5 },
];

export const bestEmails: BestEmail[] = [
  {
    id: "be-001",
    subject: "재택근무, 직원 건강관리는 어떻게 하고 계세요?",
    industry: "IT/원격근무",
    replyRate: 30.8,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\n재택근무가 일상이 되면서 직원 건강관리가 새로운 과제가 되었습니다. 사무실 인근 헬스장 계약은 의미가 없어졌고, 분산된 직원들에게 균등한 복지를 제공하기 어려우시죠.\n\n다짐은 전국 4,000개 운동시설을 하나의 앱으로 연결합니다. 재택근무 중인 직원도 자택 근처에서 자유롭게 운동할 수 있습니다.\n\n20분 미팅으로 귀사에 맞는 운동 복지를 설계해드리겠습니다.",
  },
  {
    id: "be-002",
    subject: "게임 개발자 건강관리, 체계적으로 시작하세요",
    industry: "게임",
    replyRate: 30.0,
    ctaType: "데모 제안",
    body: "안녕하세요, OOO님.\n\n장시간 앉아서 근무하는 개발자들의 건강관리가 갈수록 중요해지고 있습니다. 사내 헬스장만으로는 다양한 운동 니즈를 충족하기 어렵습니다.\n\n다짐은 헬스, 필라테스, 수영, 클라이밍 등 46가지 운동종목을 제공합니다. 최대 3개 시설을 동시에 이용할 수 있어 직원 선택폭이 넓어집니다.\n\n5분 데모로 관리자 화면을 직접 확인해보시겠습니까?",
  },
  {
    id: "be-003",
    subject: "임직원 건강관리, 다짐 하나로 해결하세요",
    industry: "IT/플랫폼",
    replyRate: 26.3,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\nIT 기업 임직원의 운동 부족은 업계 공통 과제입니다. 다짐은 복잡한 정산 없이 선결제 포인트 방식으로 간편하게 운영되는 기업 운동 복지 서비스입니다.\n\n전국 4,000개 제휴시설에서 할인 혜택까지 제공되어 경제적입니다.\n\n15분 미팅으로 귀사에 맞는 도입 방안을 논의해보시겠습니까?",
  },
  {
    id: "be-004",
    subject: "ESG 건강경영, 임직원 운동 복지로 시작하세요",
    industry: "대기업",
    replyRate: 21.4,
    ctaType: "자료 공유",
    body: "안녕하세요, OOO님.\n\nESG 경영에서 임직원 건강 부문이 중요해지고 있습니다. 다짐은 전국 단위로 형평성 있는 운동 복지를 제공하여 ESG 건강 KPI 달성에 기여합니다.\n\n대기업 맞춤 운동 복지 도입 가이드를 준비했습니다. 참고가 되실 것 같아 공유드립니다.",
  },
  {
    id: "be-005",
    subject: "직원들이 진짜 쓰는 운동 복지가 있습니다",
    industry: "스타트업",
    replyRate: 22.2,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\n복지 예산을 투입해도 직원들이 잘 사용하지 않는 문제, 겪고 계시지 않으세요? 다짐은 원하는 시간에 원하는 장소에서 운동할 수 있어 실제 이용률이 높습니다.\n\n채용 경쟁에서도 차별화된 복지는 큰 강점이 됩니다.\n\n15분 미팅으로 귀사에 맞는 방안을 제안드리겠습니다.",
  },
];
