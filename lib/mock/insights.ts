import { ChartDataPoint, BestEmail } from "@/lib/types";

export const industryReplyRates: ChartDataPoint[] = [
  { name: "SaaS", value: 26.3 },
  { name: "제조", value: 17.9 },
  { name: "프랜차이즈", value: 22.2 },
  { name: "물류", value: 24.0 },
  { name: "HR/복지", value: 30.0 },
  { name: "리테일", value: 18.5 },
];

export const titleReplyRates: ChartDataPoint[] = [
  { name: "ROI 강조", value: 21.4 },
  { name: "질문형", value: 15.8 },
  { name: "경쟁력 강조", value: 30.8 },
  { name: "사례 중심", value: 14.3 },
  { name: "직접적 제안", value: 26.3 },
  { name: "효율화 강조", value: 16.7 },
];

export const positionReplyRates: ChartDataPoint[] = [
  { name: "C-Level", value: 28.5 },
  { name: "VP/이사", value: 24.2 },
  { name: "팀장급", value: 18.7 },
  { name: "매니저", value: 12.3 },
  { name: "실무자", value: 8.5 },
];

export const ctaReplyRates: ChartDataPoint[] = [
  { name: "미팅 제안", value: 22.5 },
  { name: "자료 공유", value: 18.3 },
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
    subject: "물류 영업, 경쟁사보다 한 발 앞서는 방법",
    industry: "물류",
    replyRate: 30.8,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\n물류 업계에서 디지털 영업 전환이 빠르게 진행되고 있습니다. 경쟁사보다 먼저 체계적인 영업 프로세스를 구축하는 것이 시장 선점의 핵심입니다.\n\n저희는 물류 기업 전용 영업 자동화 솔루션을 제공하며, 이미 국내 주요 물류 기업들이 활용하고 있습니다.\n\n20분 미팅으로 귀사에 맞는 전략을 논의해보시겠습니까?",
  },
  {
    id: "be-002",
    subject: "HR SaaS 기업이 영업 자동화로 달라진 점",
    industry: "HR/복지",
    replyRate: 30.0,
    ctaType: "데모 제안",
    body: "안녕하세요, OOO님.\n\nHR SaaS 기업들이 영업 자동화를 도입한 후 평균 미팅 전환율이 35% 개선되었습니다. 리드 발굴부터 콜드메일 작성, 팔로업까지 모든 과정을 자동화하여 영업팀이 실질적인 영업 활동에 집중할 수 있습니다.\n\n5분 데모로 직접 확인해보시겠습니까?",
  },
  {
    id: "be-003",
    subject: "영업팀 성과를 2배로 만드는 방법",
    industry: "SaaS",
    replyRate: 26.3,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\nSaaS 기업의 성장은 영업팀의 효율에 달려있습니다. 저희 솔루션은 AI가 최적의 타깃을 추천하고, 개인화된 메일을 자동 생성하여 영업팀의 생산성을 2배 이상 높입니다.\n\n유사 SaaS 기업의 성공 사례를 공유드리며, 15분 미팅으로 구체적인 활용 방안을 논의해보시겠습니까?",
  },
  {
    id: "be-004",
    subject: "가맹점 확장기, 파트너 영업을 자동화해야 하는 이유",
    industry: "프랜차이즈",
    replyRate: 22.2,
    ctaType: "자료 공유",
    body: "안녕하세요, OOO님.\n\n가맹점이 빠르게 늘어나는 시기에는 파트너 관리와 신규 파트너 발굴을 체계적으로 할 수 있는 시스템이 필수입니다.\n\n프랜차이즈 기업을 위한 영업 자동화 활용 가이드를 준비했습니다. 도움이 되실 것 같아 공유드립니다.",
  },
  {
    id: "be-005",
    subject: "제조업 영업 비용을 40% 절감하는 방법",
    industry: "제조",
    replyRate: 21.4,
    ctaType: "미팅 제안",
    body: "안녕하세요, OOO님.\n\n제조업에서 영업 비용 절감은 늘 큰 과제입니다. 저희 솔루션을 도입한 제조 기업들은 평균 40%의 영업 비용을 절감하면서도 미팅 전환율은 오히려 높아졌습니다.\n\n귀사에 맞는 최적화 방안을 15분 미팅으로 제안드리겠습니다.",
  },
];
