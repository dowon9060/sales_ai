import { Contact } from "@/lib/types";

export const mockContacts: Contact[] = [
  // 카카오
  { id: "con-001", accountId: "acc-001", accountName: "카카오", name: "박소영", title: "피플팀 총괄", department: "피플팀", role: "decision_maker", aiConfidence: 95, emailStatus: "valid", email: "sy.park@kakaocorp.com", recommendedApproach: "대규모 임직원 복지 효율화와 만족도 향상 포인트를 중심으로 접근", recommendedFirstLine: "카카오의 임직원 복지 예산 확대 소식을 접하고 연락드립니다." },
  { id: "con-002", accountId: "acc-001", accountName: "카카오", name: "김태형", title: "복지운영 매니저", department: "피플팀", role: "practitioner", aiConfidence: 80, emailStatus: "valid", email: "th.kim@kakaocorp.com", recommendedApproach: "복지 운영 실무 효율화와 관리 편의성 강조", recommendedFirstLine: "4,200명 임직원의 운동 복지를 하나의 플랫폼으로 관리하는 방법을 소개드립니다." },
  { id: "con-003", accountId: "acc-001", accountName: "카카오", name: "이현우", title: "CHRO", department: "경영", role: "decision_maker", aiConfidence: 92, emailStatus: "valid", email: "hw.lee@kakaocorp.com", recommendedApproach: "경영진 관점의 복지 투자 ROI와 임직원 건강경영 가치 제시", recommendedFirstLine: "임직원 건강이 기업 경쟁력으로 이어지는 시대, 다짐이 함께하겠습니다." },
  { id: "con-004", accountId: "acc-001", accountName: "카카오", name: "정수빈", title: "총무팀장", department: "총무팀", role: "influencer", aiConfidence: 75, emailStatus: "unverified", email: "sb.jung@kakaocorp.com", recommendedApproach: "복지 운영 비용 절감과 정산 간편화 강조", recommendedFirstLine: "복잡한 정산 없이 간편하게 운영할 수 있는 운동 복지 서비스를 제안드립니다." },

  // 토스
  { id: "con-005", accountId: "acc-002", accountName: "토스", name: "한지민", title: "People & Culture Lead", department: "피플팀", role: "decision_maker", aiConfidence: 93, emailStatus: "valid", email: "jm.han@toss.im", recommendedApproach: "건강경영 선언에 맞는 체계적 운동 복지 솔루션 제안", recommendedFirstLine: "토스의 건강경영 선언에 딱 맞는 임직원 운동 복지 솔루션을 소개드립니다." },
  { id: "con-006", accountId: "acc-002", accountName: "토스", name: "오세진", title: "복지기획 매니저", department: "피플팀", role: "influencer", aiConfidence: 85, emailStatus: "valid", email: "sj.oh@toss.im", recommendedApproach: "신규 사옥 이전 시 복지 재설계 타이밍 강조", recommendedFirstLine: "강남 제2사옥 이전을 앞두고 운동 복지를 함께 준비해보시는 건 어떨까요?" },
  { id: "con-007", accountId: "acc-002", accountName: "토스", name: "구본석", title: "총무 리드", department: "경영지원", role: "practitioner", aiConfidence: 72, emailStatus: "valid", email: "bs.gu@toss.im", recommendedApproach: "기존 헬스장 계약 대비 비용 효율성 비교 제시", recommendedFirstLine: "기존 헬스장 단일 계약보다 효율적인 운동 복지 운영 방식이 있습니다." },

  // 컬리
  { id: "con-008", accountId: "acc-003", accountName: "컬리", name: "송예은", title: "HR 디렉터", department: "인사팀", role: "decision_maker", aiConfidence: 90, emailStatus: "valid", email: "ye.song@kurly.com", recommendedApproach: "전국 분산 근무자 복지 형평성 해결 방안 제안", recommendedFirstLine: "컬리 본사와 물류센터 직원 모두가 누릴 수 있는 운동 복지를 제안드립니다." },
  { id: "con-009", accountId: "acc-003", accountName: "컬리", name: "임재호", title: "조직문화 매니저", department: "인사팀", role: "influencer", aiConfidence: 78, emailStatus: "valid", email: "jh.lim@kurly.com", recommendedApproach: "직원 건강관리와 조직 활력 연결", recommendedFirstLine: "건강한 직원이 최고의 서비스를 만듭니다. 다짐이 도와드리겠습니다." },
  { id: "con-010", accountId: "acc-003", accountName: "컬리", name: "황민정", title: "복지담당", department: "인사팀", role: "practitioner", aiConfidence: 65, emailStatus: "valid", email: "mj.hwang@kurly.com", recommendedApproach: "포인트 기반 복지 운영의 실무적 편리함 강조", recommendedFirstLine: "구성원 등록부터 포인트 발급까지, 간편한 운동 복지 관리를 경험해보세요." },

  // 두나무
  { id: "con-011", accountId: "acc-004", accountName: "두나무", name: "최동훈", title: "CPO", department: "경영", role: "decision_maker", aiConfidence: 88, emailStatus: "valid", email: "dh.choi@dunamu.com", recommendedApproach: "내부 설문 결과를 근거로 운동 복지 도입 필요성 강조", recommendedFirstLine: "임직원 설문에서 운동 복지 수요 1위라는 결과, 다짐이 해결책이 될 수 있습니다." },
  { id: "con-012", accountId: "acc-004", accountName: "두나무", name: "노하영", title: "HR 매니저", department: "인사팀", role: "influencer", aiConfidence: 82, emailStatus: "valid", email: "hy.noh@dunamu.com", recommendedApproach: "복지 포인트 제도 전환과 다짐 포인트 방식 연계", recommendedFirstLine: "목적형 복지 포인트 전환을 검토 중이시라면, 다짐의 선결제 포인트 방식이 딱 맞습니다." },
  { id: "con-013", accountId: "acc-004", accountName: "두나무", name: "유성민", title: "총무팀장", department: "경영지원", role: "practitioner", aiConfidence: 70, emailStatus: "unverified", email: "sm.yoo@dunamu.com", recommendedApproach: "정산 간편화와 부정 사용 방지 강조", recommendedFirstLine: "복잡한 영수증 처리 없이 투명하게 관리되는 운동 복지를 소개드립니다." },

  // 삼성SDS
  { id: "con-014", accountId: "acc-005", accountName: "삼성SDS", name: "강승호", title: "인사담당 상무", department: "인사팀", role: "decision_maker", aiConfidence: 91, emailStatus: "valid", email: "sh.kang@samsungsds.com", recommendedApproach: "대기업 임직원 건강증진 프로젝트와 연계한 체계적 솔루션 제안", recommendedFirstLine: "삼성SDS의 직원 건강증진 프로젝트에 다짐 기업 운동 복지가 기여할 수 있습니다." },
  { id: "con-015", accountId: "acc-005", accountName: "삼성SDS", name: "문정아", title: "복지팀장", department: "복지팀", role: "influencer", aiConfidence: 86, emailStatus: "valid", email: "ja.moon@samsungsds.com", recommendedApproach: "전국 사업장별 형평성 있는 운동 복지 제공 방안", recommendedFirstLine: "서울, 수원, 부산 등 전국 사업장 직원 모두에게 동일한 운동 복지를 제공하세요." },
  { id: "con-016", accountId: "acc-005", accountName: "삼성SDS", name: "이경수", title: "총무파트장", department: "총무팀", role: "practitioner", aiConfidence: 74, emailStatus: "valid", email: "ks.lee@samsungsds.com", recommendedApproach: "관리자 대시보드를 통한 실사용 현황 모니터링 강조", recommendedFirstLine: "12,000명의 운동 복지 이용 현황을 한눈에 파악할 수 있는 관리 도구를 소개드립니다." },
  { id: "con-017", accountId: "acc-005", accountName: "삼성SDS", name: "배지영", title: "CHO", department: "경영", role: "decision_maker", aiConfidence: 89, emailStatus: "valid", email: "jy.bae@samsungsds.com", recommendedApproach: "건강경영과 ESG의 교차점에서 운동 복지 가치 제시", recommendedFirstLine: "건강경영이 ESG의 핵심인 시대, 다짐과 함께 시작하세요." },

  // 배달의민족
  { id: "con-018", accountId: "acc-006", accountName: "배달의민족", name: "김하늘", title: "피플팀장", department: "피플팀", role: "decision_maker", aiConfidence: 87, emailStatus: "valid", email: "hn.kim@woowahan.com", recommendedApproach: "다지역 오피스 통합 복지 관리 방안 제안", recommendedFirstLine: "서울, 부산, 대전 모든 거점 오피스 직원이 동일하게 이용할 수 있는 복지를 제안드립니다." },
  { id: "con-019", accountId: "acc-006", accountName: "배달의민족", name: "양수현", title: "복지기획 매니저", department: "피플팀", role: "influencer", aiConfidence: 80, emailStatus: "valid", email: "sh.yang@woowahan.com", recommendedApproach: "기존 복지 이용률 저조 문제 해결 방안 제시", recommendedFirstLine: "직원들이 실제로 사용하는 복지, 다짐으로 이용률을 높여보세요." },
  { id: "con-020", accountId: "acc-006", accountName: "배달의민족", name: "전재원", title: "경영지원 리드", department: "경영지원", role: "practitioner", aiConfidence: 68, emailStatus: "valid", email: "jw.jeon@woowahan.com", recommendedApproach: "비용 투명성과 정산 편의성 강조", recommendedFirstLine: "실제 사용 금액을 투명하게 확인하고, 정산은 간편하게 처리하세요." },
  { id: "con-021", accountId: "acc-006", accountName: "배달의민족", name: "조민서", title: "건강관리 담당", department: "피플팀", role: "practitioner", aiConfidence: 62, emailStatus: "unverified", email: "ms.cho@woowahan.com", recommendedApproach: "임직원 건강관리 프로그램과 운동 복지 연계", recommendedFirstLine: "직원 건강관리의 첫걸음, 체계적인 운동 복지에서 시작합니다." },

  // LG에너지솔루션
  { id: "con-022", accountId: "acc-010", accountName: "LG에너지솔루션", name: "서진호", title: "인사기획 상무", department: "인사기획팀", role: "decision_maker", aiConfidence: 90, emailStatus: "valid", email: "jh.seo@lgensol.com", recommendedApproach: "ESG 건강 KPI 달성을 위한 운동 복지 도입 제안", recommendedFirstLine: "ESG 보고서의 임직원 건강 KPI, 다짐 운동 복지로 달성할 수 있습니다." },
  { id: "con-023", accountId: "acc-010", accountName: "LG에너지솔루션", name: "박은주", title: "복지팀장", department: "복지팀", role: "influencer", aiConfidence: 84, emailStatus: "valid", email: "ej.park@lgensol.com", recommendedApproach: "공장 근무자 포함 전체 임직원 복지 방안 제시", recommendedFirstLine: "서울 본사부터 이천/청주 공장까지, 25,000명 모두를 위한 운동 복지입니다." },

  // 인포매틱스코리아 → 직방
  { id: "con-024", accountId: "acc-009", accountName: "직방", name: "김서연", title: "People Lead", department: "피플팀", role: "decision_maker", aiConfidence: 88, emailStatus: "valid", email: "sy.kim@zigbang.com", recommendedApproach: "리모트워크 환경에서의 전국 이용 가능한 복지 솔루션 제안", recommendedFirstLine: "재택근무 환경에서도 전국 어디서나 이용 가능한 운동 복지를 소개드립니다." },
  { id: "con-025", accountId: "acc-009", accountName: "직방", name: "이도윤", title: "총무 매니저", department: "경영지원", role: "practitioner", aiConfidence: 72, emailStatus: "valid", email: "dy.lee@zigbang.com", recommendedApproach: "기존 사무실 기반 복지 대안으로 포지셔닝", recommendedFirstLine: "사무실이 없어도, 어디서든 운동할 수 있는 복지가 있습니다." },

  // 하이브
  { id: "con-026", accountId: "acc-012", accountName: "하이브", name: "나은정", title: "HR 디렉터", department: "인사팀", role: "decision_maker", aiConfidence: 86, emailStatus: "valid", email: "ej.na@hybecorp.com", recommendedApproach: "불규칙 근무 패턴에 맞는 유연한 운동 복지 강조", recommendedFirstLine: "엔터 업계의 불규칙한 근무환경에 딱 맞는 유연한 운동 복지를 제안드립니다." },
  { id: "con-027", accountId: "acc-012", accountName: "하이브", name: "손민혁", title: "복지운영 매니저", department: "인사팀", role: "influencer", aiConfidence: 78, emailStatus: "valid", email: "mh.son@hybecorp.com", recommendedApproach: "직원 유지율 개선과 복지 차별화 연결", recommendedFirstLine: "차별화된 운동 복지로 인재 유지율을 높여보세요." },
  { id: "con-028", accountId: "acc-012", accountName: "하이브", name: "장서윤", title: "총무팀장", department: "경영지원", role: "practitioner", aiConfidence: 65, emailStatus: "unverified", email: "sy.jang@hybecorp.com", recommendedApproach: "운영 간편성과 비용 효율성 강조", recommendedFirstLine: "복잡한 정산 없이 간편하게 운영되는 운동 복지 서비스입니다." },

  // 넥슨코리아
  { id: "con-029", accountId: "acc-013", accountName: "넥슨코리아", name: "윤재호", title: "CHO", department: "경영", role: "decision_maker", aiConfidence: 87, emailStatus: "valid", email: "jh.yoon@nexon.com", recommendedApproach: "개발자 건강관리 프로그램의 핵심 인프라로 포지셔닝", recommendedFirstLine: "게임 개발자의 건강관리, 체계적인 운동 복지에서 시작합니다." },
  { id: "con-030", accountId: "acc-013", accountName: "넥슨코리아", name: "홍지수", title: "피플팀 매니저", department: "피플팀", role: "influencer", aiConfidence: 79, emailStatus: "valid", email: "js.hong@nexon.com", recommendedApproach: "사내 헬스장 한계 극복과 다양한 운동종목 접근성 강조", recommendedFirstLine: "사내 헬스장만으로는 부족한 46가지 운동종목을 다짐에서 만나보세요." },
];
