import { Contact } from "@/lib/types";

export const mockContacts: Contact[] = [
  // 넥스트커머스
  { id: "con-001", accountId: "acc-001", accountName: "넥스트커머스", name: "김도현", title: "CTO", department: "기술본부", role: "decision_maker", aiConfidence: 92, emailStatus: "valid", email: "dohyun.kim@nextcommerce.co.kr", recommendedApproach: "기술 리더십 관점에서 영업 자동화의 데이터 활용 가치를 어필", recommendedFirstLine: "넥스트커머스의 IT 인프라 확장 소식을 접하고 연락드립니다." },
  { id: "con-002", accountId: "acc-001", accountName: "넥스트커머스", name: "이서연", title: "영업이사", department: "영업본부", role: "decision_maker", aiConfidence: 95, emailStatus: "valid", email: "seoyeon.lee@nextcommerce.co.kr", recommendedApproach: "영업 실무 효율화와 팀 성과 향상 포인트를 중심으로 접근", recommendedFirstLine: "넥스트커머스 영업팀의 성장을 함께 가속화할 방법을 제안드리고 싶습니다." },
  { id: "con-003", accountId: "acc-001", accountName: "넥스트커머스", name: "박지훈", title: "영업팀장", department: "영업본부", role: "influencer", aiConfidence: 78, emailStatus: "valid", email: "jihun.park@nextcommerce.co.kr", recommendedApproach: "실무 효율화 관점에서 구체적 기능 소개", recommendedFirstLine: "영업팀의 일상 업무에서 바로 효과를 볼 수 있는 도구를 소개드립니다." },
  { id: "con-004", accountId: "acc-001", accountName: "넥스트커머스", name: "최예진", title: "마케팅매니저", department: "마케팅팀", role: "practitioner", aiConfidence: 65, emailStatus: "unverified", email: "yejin.choi@nextcommerce.co.kr", recommendedApproach: "마케팅-영업 연계 시너지 강조", recommendedFirstLine: "마케팅에서 생성한 리드를 영업으로 효과적으로 전달하는 방법을 논의해보면 어떨까요?" },

  // 스마트팩토리솔루션즈
  { id: "con-005", accountId: "acc-002", accountName: "스마트팩토리솔루션즈", name: "정우성", title: "대표이사", department: "경영", role: "decision_maker", aiConfidence: 90, emailStatus: "valid", email: "ws.jung@smartfactory.kr", recommendedApproach: "경영진 관점의 ROI와 생산성 향상 수치를 제시", recommendedFirstLine: "스마트공장 고도화 사업 선정을 축하드리며, 영업 디지털 전환에 관해 논의드리고 싶습니다." },
  { id: "con-006", accountId: "acc-002", accountName: "스마트팩토리솔루션즈", name: "한미영", title: "DX실장", department: "디지털혁신실", role: "influencer", aiConfidence: 85, emailStatus: "valid", email: "my.han@smartfactory.kr", recommendedApproach: "디지털 전환 로드맵 내 영업 자동화 포지셔닝", recommendedFirstLine: "디지털 혁신 전략의 일환으로 영업 프로세스 자동화를 검토해보시는 건 어떨까요?" },
  { id: "con-007", accountId: "acc-002", accountName: "스마트팩토리솔루션즈", name: "오태석", title: "영업부장", department: "영업부", role: "practitioner", aiConfidence: 72, emailStatus: "valid", email: "ts.oh@smartfactory.kr", recommendedApproach: "실무 관점 현업 페인포인트 해결 강조", recommendedFirstLine: "제조업 영업의 고유한 어려움을 잘 이해하고 있으며, 실질적 해결책을 제안드립니다." },

  // 피플웍스
  { id: "con-008", accountId: "acc-003", accountName: "피플웍스", name: "강민수", title: "CEO", department: "경영", role: "decision_maker", aiConfidence: 88, emailStatus: "valid", email: "minsu.kang@peopleworks.io", recommendedApproach: "스타트업 CEO 관점 빠른 성장과 효율화 강조", recommendedFirstLine: "피플웍스의 B2B 확장 전략에 딱 맞는 영업 자동화 솔루션을 소개드립니다." },
  { id: "con-009", accountId: "acc-003", accountName: "피플웍스", name: "윤하나", title: "세일즈팀 리드", department: "세일즈", role: "influencer", aiConfidence: 82, emailStatus: "valid", email: "hana.yoon@peopleworks.io", recommendedApproach: "신규 세일즈팀 세팅에 필요한 인프라 관점", recommendedFirstLine: "새로운 세일즈팀이 빠르게 성과를 내려면 올바른 도구 선택이 핵심입니다." },

  // 프레시밀
  { id: "con-010", accountId: "acc-004", accountName: "프레시밀", name: "서동민", title: "사업본부장", department: "사업본부", role: "decision_maker", aiConfidence: 87, emailStatus: "valid", email: "dm.seo@freshmeal.co.kr", recommendedApproach: "프랜차이즈 확장기 영업 관리 효율화", recommendedFirstLine: "50개 가맹점 확장을 앞두고 영업 프로세스 효율화가 중요한 시점이라 생각합니다." },
  { id: "con-011", accountId: "acc-004", accountName: "프레시밀", name: "류지은", title: "가맹사업팀장", department: "가맹사업팀", role: "influencer", aiConfidence: 80, emailStatus: "valid", email: "je.ryu@freshmeal.co.kr", recommendedApproach: "가맹점 관리와 파트너 커뮤니케이션 개선", recommendedFirstLine: "가맹점 확장에 따른 파트너 관리 효율화 방안을 제안드립니다." },
  { id: "con-012", accountId: "acc-004", accountName: "프레시밀", name: "임세영", title: "IT기획매니저", department: "IT기획팀", role: "practitioner", aiConfidence: 68, emailStatus: "unverified", email: "sy.lim@freshmeal.co.kr", recommendedApproach: "기술 통합 관점에서 시스템 연동 방안 제시", recommendedFirstLine: "현재 운영 중인 시스템과 자연스럽게 연동될 수 있는 솔루션을 소개드립니다." },

  // 클라우드빌더
  { id: "con-013", accountId: "acc-005", accountName: "클라우드빌더", name: "송재호", title: "COO", department: "경영", role: "decision_maker", aiConfidence: 86, emailStatus: "valid", email: "jh.song@cloudbuilder.io", recommendedApproach: "운영 효율화와 매출 성장 연결", recommendedFirstLine: "AWS 파트너십을 기반으로 B2B 영업을 확대하시려면 자동화가 핵심입니다." },
  { id: "con-014", accountId: "acc-005", accountName: "클라우드빌더", name: "김나리", title: "세일즈 디렉터", department: "영업", role: "decision_maker", aiConfidence: 91, emailStatus: "valid", email: "nr.kim@cloudbuilder.io", recommendedApproach: "SaaS 영업 조직 스케일업 경험 공유", recommendedFirstLine: "SaaS 영업 조직의 스케일업에 특화된 자동화 솔루션을 소개드립니다." },
  { id: "con-015", accountId: "acc-005", accountName: "클라우드빌더", name: "이준혁", title: "SDR", department: "영업", role: "practitioner", aiConfidence: 60, emailStatus: "valid", email: "jh.lee@cloudbuilder.io", recommendedApproach: "SDR 업무 효율화에 초점", recommendedFirstLine: "아웃바운드 업무의 반복 작업을 줄여주는 도구를 찾고 계실 것 같습니다." },

  // 로지스원
  { id: "con-016", accountId: "acc-006", accountName: "로지스원", name: "조현우", title: "전무이사", department: "경영기획", role: "decision_maker", aiConfidence: 89, emailStatus: "valid", email: "hw.cho@logisone.co.kr", recommendedApproach: "대기업 디지털 전환 전략 내 영업 자동화 포지셔닝", recommendedFirstLine: "디지털혁신팀 확대 소식을 접하고, 영업 프로세스 자동화에 관해 논의드리고자 합니다." },
  { id: "con-017", accountId: "acc-006", accountName: "로지스원", name: "배수진", title: "DX팀장", department: "디지털혁신팀", role: "influencer", aiConfidence: 84, emailStatus: "valid", email: "sj.bae@logisone.co.kr", recommendedApproach: "DX 전략의 일환으로 영업 부문 자동화 제안", recommendedFirstLine: "물류업 특화 영업 자동화 사례와 함께 맞춤 솔루션을 제안드립니다." },
  { id: "con-018", accountId: "acc-006", accountName: "로지스원", name: "김태윤", title: "영업1팀장", department: "영업본부", role: "practitioner", aiConfidence: 75, emailStatus: "valid", email: "ty.kim@logisone.co.kr", recommendedApproach: "현업 영업 효율화 사례 제시", recommendedFirstLine: "영업팀의 일상적인 반복 업무를 획기적으로 줄여줄 수 있는 방안을 소개드립니다." },
  { id: "con-019", accountId: "acc-006", accountName: "로지스원", name: "장서윤", title: "해외사업부장", department: "해외사업부", role: "influencer", aiConfidence: 70, emailStatus: "unverified", email: "sy.jang@logisone.co.kr", recommendedApproach: "글로벌 영업 관리 효율화", recommendedFirstLine: "동남아 물류 네트워크 확장에 따른 해외 파트너 영업 관리를 도와드리겠습니다." },
  { id: "con-020", accountId: "acc-006", accountName: "로지스원", name: "홍석우", title: "IT인프라팀장", department: "IT본부", role: "practitioner", aiConfidence: 62, emailStatus: "valid", email: "sw.hong@logisone.co.kr", recommendedApproach: "기존 인프라와의 연동성 강조", recommendedFirstLine: "현재 운영 중인 IT 인프라와 자연스럽게 통합되는 솔루션입니다." },

  // 에듀플러스
  { id: "con-021", accountId: "acc-007", accountName: "에듀플러스", name: "나영지", title: "대표", department: "경영", role: "decision_maker", aiConfidence: 85, emailStatus: "valid", email: "yj.na@eduplus.kr", recommendedApproach: "B2B 시장 진출 초기 전략 지원", recommendedFirstLine: "에듀플러스의 B2B 진출을 성공적으로 이끌어줄 영업 인프라를 제안드립니다." },
  { id: "con-022", accountId: "acc-007", accountName: "에듀플러스", name: "차민석", title: "사업개발매니저", department: "사업개발", role: "influencer", aiConfidence: 76, emailStatus: "valid", email: "ms.cha@eduplus.kr", recommendedApproach: "B2B 영업 경험이 적은 조직을 위한 가이드 역할 강조", recommendedFirstLine: "B2B 영업에 첫 발을 내딛는 팀에게 꼭 필요한 도구를 소개드립니다." },

  // 메가푸드시스템
  { id: "con-023", accountId: "acc-008", accountName: "메가푸드시스템", name: "문성현", title: "부사장", department: "경영", role: "decision_maker", aiConfidence: 88, emailStatus: "valid", email: "sh.moon@megafood.co.kr", recommendedApproach: "수도권 확장에 필요한 체계적 영업 관리 제안", recommendedFirstLine: "수도권 진출이라는 큰 도전에 효율적인 영업 체계가 뒷받침되어야 합니다." },
  { id: "con-024", accountId: "acc-008", accountName: "메가푸드시스템", name: "허진아", title: "가맹영업팀장", department: "가맹영업팀", role: "influencer", aiConfidence: 80, emailStatus: "valid", email: "ja.heo@megafood.co.kr", recommendedApproach: "가맹점 영업 현장의 페인포인트 해결", recommendedFirstLine: "20개 신규 매장 오픈을 앞두고 영업팀의 역량을 극대화할 수 있는 방법을 제안드립니다." },
  { id: "con-025", accountId: "acc-008", accountName: "메가푸드시스템", name: "정다영", title: "마케팅팀장", department: "마케팅", role: "practitioner", aiConfidence: 65, emailStatus: "unverified", email: "dy.jung@megafood.co.kr", recommendedApproach: "마케팅-영업 간 리드 핸드오프 개선", recommendedFirstLine: "마케팅에서 발굴한 리드가 영업 성과로 이어지는 체계를 만들어보시겠습니까?" },

  // 그린텍제조
  { id: "con-026", accountId: "acc-010", accountName: "그린텍제조", name: "안경호", title: "상무이사", department: "경영기획", role: "decision_maker", aiConfidence: 87, emailStatus: "valid", email: "kh.an@greentech-mfg.co.kr", recommendedApproach: "ESG와 디지털 전환의 교차점에서 영업 효율화 제안", recommendedFirstLine: "ESG 경영 전환과 함께 영업 프로세스도 혁신할 수 있는 기회를 제안드립니다." },
  { id: "con-027", accountId: "acc-010", accountName: "그린텍제조", name: "윤정빈", title: "영업기획팀장", department: "영업기획", role: "influencer", aiConfidence: 79, emailStatus: "valid", email: "jb.yoon@greentech-mfg.co.kr", recommendedApproach: "데이터 기반 영업 전략 수립 지원", recommendedFirstLine: "영업 데이터를 체계적으로 관리하고 인사이트를 도출하는 방법을 소개드립니다." },

  // 인포매틱스코리아
  { id: "con-028", accountId: "acc-009", accountName: "인포매틱스코리아", name: "고승원", title: "VP of Sales", department: "영업", role: "decision_maker", aiConfidence: 93, emailStatus: "valid", email: "sw.ko@informaticskorea.com", recommendedApproach: "영업 조직 확대에 따른 프로세스 표준화", recommendedFirstLine: "영업 조직이 커질수록 표준화된 프로세스가 성공의 열쇠입니다." },
  { id: "con-029", accountId: "acc-009", accountName: "인포매틱스코리아", name: "백지연", title: "SDR 리드", department: "영업", role: "practitioner", aiConfidence: 74, emailStatus: "valid", email: "jy.baek@informaticskorea.com", recommendedApproach: "SDR 팀 효율화와 리드 퀄리피케이션 자동화", recommendedFirstLine: "SDR 팀의 아웃바운드 효율을 3배 이상 높인 사례를 공유드리겠습니다." },
  { id: "con-030", accountId: "acc-009", accountName: "인포매틱스코리아", name: "신동혁", title: "CRO", department: "경영", role: "decision_maker", aiConfidence: 90, emailStatus: "valid", email: "dh.shin@informaticskorea.com", recommendedApproach: "매출 성장 전략의 핵심 도구로 포지셔닝", recommendedFirstLine: "데이터 드리븐 영업이 매출 성장의 핵심인 시대, 최적의 도구를 제안드립니다." },
];
