import { EmailDraft } from "@/lib/types";

export const mockEmailDrafts: EmailDraft[] = [
  {
    id: "email-001",
    accountId: "acc-001",
    contactId: "con-002",
    subject: "넥스트커머스 영업팀의 성장을 가속화할 방법을 제안드립니다",
    body: `이서연 이사님, 안녕하세요.

넥스트커머스가 IT 인력을 대규모로 확충하고 부산 물류센터를 확장한다는 소식을 접했습니다. 빠른 성장의 모멘텀을 이어가시려면 영업 프로세스의 효율화가 핵심이라고 생각합니다.

저희 솔루션은 AI 기반으로 타깃 고객을 자동 추천하고, 개인화된 콜드메일 초안을 생성하여 영업팀의 생산성을 평균 2.5배 향상시킵니다.

비슷한 규모의 리테일 기업에서는 도입 후 3개월 만에 미팅 전환율이 35% 개선되었습니다.

15분 정도 시간을 내어 넥스트커머스에 맞는 활용 방안을 논의해보시겠습니까?

감사합니다.`,
    tone: "formal",
    length: "medium",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "사실 기반 내용 확인됨", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["IT 인력 확충 및 물류센터 확장", "리테일 업종 특화 사례", "빠른 성장 모멘텀"],
    status: "draft",
  },
  {
    id: "email-002",
    accountId: "acc-002",
    contactId: "con-005",
    subject: "스마트공장 고도화와 영업 디지털 전환을 함께 추진해보시겠습니까?",
    body: `정우성 대표님, 안녕하세요.

스마트팩토리솔루션즈가 중소벤처기업부 스마트공장 고도화 사업에 선정되셨다는 소식을 축하드립니다.

제조업의 디지털 전환에서 생산 현장 못지않게 중요한 것이 영업 프로세스의 디지털화입니다. MES를 클라우드로 전환하시는 것처럼, 영업 프로세스도 데이터 기반으로 전환하실 때입니다.

저희는 제조업 특화 영업 자동화 솔루션을 제공하며, 유사한 규모의 제조업체에서 영업 비용을 40% 절감한 사례가 있습니다.

짧은 미팅을 통해 스마트팩토리솔루션즈에 맞는 영업 혁신 방안을 논의드리고 싶습니다.

감사합니다.`,
    tone: "formal",
    length: "medium",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "정부 지원 사업 선정은 확인된 사실", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["스마트공장 정부 지원 사업 선정", "MES 클라우드 전환", "제조업 특화 접근"],
    status: "pending_approval",
  },
  {
    id: "email-003",
    accountId: "acc-003",
    contactId: "con-008",
    subject: "피플웍스 B2B 영업팀, 빠르게 성과 내는 방법이 있습니다",
    body: `강민수 대표님, 안녕하세요.

피플웍스가 B2B 세일즈팀을 새로 구성하고 계신다는 소식을 링크드인에서 확인했습니다.

세일즈팀 신설 초기에 가장 중요한 것은 올바른 도구 선택입니다. 저희 솔루션을 활용하면 신규 세일즈팀도 첫 달부터 체계적으로 리드를 관리하고, AI가 생성한 개인화 메일로 높은 응답률을 달성할 수 있습니다.

HR SaaS 업계에서 저희 솔루션을 사용한 기업은 평균 첫 3개월 내 미팅 15건 이상을 확보했습니다.

10분만 시간 내주시면 피플웍스에 딱 맞는 활용법을 보여드리겠습니다.

감사합니다.`,
    tone: "concise",
    length: "short",
    reviewStatus: "warning",
    reviewItems: [
      { type: "exaggeration", message: "'첫 달부터' 표현이 다소 낙관적일 수 있음", status: "warning" },
      { type: "fact_mismatch", message: "사실 기반 확인 필요", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["B2B 세일즈팀 신설", "링크드인 채용 정보", "HR SaaS 업계 사례"],
    status: "draft",
  },
  {
    id: "email-004",
    accountId: "acc-004",
    contactId: "con-010",
    subject: "50개 가맹점 확장, 영업 체계가 뒷받침되어야 합니다",
    body: `서동민 본부장님, 안녕하세요.

프레시밀이 올 상반기 50개 가맹점을 추가 오픈한다는 소식을 접했습니다. 가맹점이 늘어날수록 본사의 영업 관리 역량이 더욱 중요해집니다.

저희는 프랜차이즈 기업이 가맹점 파트너와의 커뮤니케이션을 체계화하고, 신규 파트너 발굴을 자동화할 수 있는 솔루션을 제공합니다.

프레시밀의 확장 전략에 맞는 영업 인프라 구축 방안을 20분 미팅으로 제안드리고 싶습니다.

감사합니다.`,
    tone: "formal",
    length: "short",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "확장 계획은 확인된 정보", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["가맹점 50개소 확장", "본사 운영 효율화 프로젝트", "프랜차이즈 특화 접근"],
    status: "approved",
  },
  {
    id: "email-005",
    accountId: "acc-006",
    contactId: "con-016",
    subject: "로지스원의 디지털 혁신에 영업 자동화를 더해보세요",
    body: `조현우 전무님, 안녕하세요.

로지스원이 디지털혁신팀을 2배로 확대하고, 동남아 물류 네트워크를 구축 중이라는 기사를 봤습니다.

이런 대규모 확장기에는 영업 프로세스의 자동화가 필수입니다. 저희 솔루션은 글로벌 파트너 관리, 다지역 영업 추적, AI 기반 리드 우선순위 등을 무조건 최고의 수준으로 제공합니다.

물류업 특화 영업 자동화 사례를 공유드리며, 로지스원에 최적화된 방안을 제안드리겠습니다.

감사합니다.`,
    tone: "formal",
    length: "detailed",
    reviewStatus: "revise",
    reviewItems: [
      { type: "exaggeration", message: "'무조건 최고의' 표현은 과장됨 - 수정 필요", status: "revise" },
      { type: "fact_mismatch", message: "기사 기반 정보 확인됨", status: "safe" },
      { type: "spam", message: "'무조건' 표현이 스팸 필터에 걸릴 수 있음", status: "warning" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["디지털혁신팀 2배 확대", "동남아 물류 네트워크 구축", "대기업 맞춤 접근"],
    status: "draft",
  },
];

export const mockEmailVariants: Record<string, { subject: string; body: string }[]> = {
  formal: [
    {
      subject: "귀사의 영업 프로세스 혁신을 위한 제안",
      body: "안녕하세요, 담당자님.\n\n귀사의 최근 사업 확장 소식을 접하고 연락드립니다. 저희 솔루션이 귀사의 영업 효율화에 기여할 수 있다고 확신합니다.\n\n유사 업종 기업들의 성공 사례를 바탕으로 맞춤형 제안을 드리고 싶습니다. 15분 정도 시간을 내주실 수 있으신가요?\n\n감사합니다."
    },
    {
      subject: "데이터 기반 영업 전략으로 성과를 높이는 방법",
      body: "안녕하세요, 담당자님.\n\n영업팀의 생산성을 높이면서 비용은 절감하는 것이 모든 기업의 과제입니다. 저희는 AI 기반 영업 자동화로 이 과제를 해결합니다.\n\n귀사의 현재 상황에 맞는 솔루션을 제안드리겠습니다. 짧은 미팅을 잡아주실 수 있으신가요?\n\n감사합니다."
    },
  ],
  concise: [
    {
      subject: "영업 자동화로 팀 성과 2배 만들기",
      body: "안녕하세요.\n\n귀사의 성장 소식을 접했습니다. 영업 자동화 솔루션이 필요한 시점이라고 판단됩니다.\n\n10분 통화 가능하신가요?"
    },
    {
      subject: "영업팀이 집중해야 할 곳에 집중하도록",
      body: "안녕하세요.\n\n반복 업무에 소요되는 시간을 줄이고, 실제 영업 활동에 집중할 수 있도록 도와드립니다.\n\n간단한 데모 보시겠습니까?"
    },
  ],
  friendly: [
    {
      subject: "혹시 영업 프로세스 개선에 관심 있으신가요?",
      body: "안녕하세요!\n\n최근 귀사 관련 소식을 보고 반가운 마음에 연락드립니다. 영업팀의 일하는 방식을 바꿔주는 도구가 있는데, 한번 살펴보시면 좋을 것 같습니다.\n\n편하실 때 커피챗 한번 하시겠어요?"
    },
    {
      subject: "영업 자동화, 함께 고민해볼까요?",
      body: "안녕하세요!\n\n같은 업종의 여러 기업들이 영업 자동화를 통해 큰 변화를 경험하고 있습니다. 귀사에도 도움이 될 수 있을 것 같아 가볍게 연락드립니다.\n\n편한 시간에 이야기 나눠보시겠어요?"
    },
  ],
};
