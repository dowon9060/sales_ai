import { EmailDraft } from "@/lib/types";

export const mockEmailDrafts: EmailDraft[] = [
  {
    id: "email-001",
    accountId: "acc-001",
    contactId: "con-001",
    subject: "카카오 임직원 4,200명을 위한 운동 복지 서비스를 제안드립니다",
    body: `박소영 총괄님, 안녕하세요.

카카오가 올해 임직원 복지 예산을 30% 증액한다는 소식을 접하고 연락드립니다. 4,200명 규모의 임직원에게 효과적으로 운동 복지를 제공할 수 있는 방법을 소개드리겠습니다.

다짐은 전국 4,000개 제휴 운동시설과 46가지 운동종목을 하나의 플랫폼에서 제공하는 기업 운동 복지 서비스입니다. 선결제 포인트 방식으로 복잡한 정산 없이 간편하게 운영하실 수 있습니다.

유사 규모의 IT 기업에서는 도입 후 직원 복지 만족도가 40% 이상 향상되었습니다.

15분 정도 시간을 내어 카카오에 맞는 활용 방안을 논의해보시겠습니까?

감사합니다.`,
    tone: "formal",
    length: "medium",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "복지 예산 증액은 확인된 사실", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["복지 예산 30% 증액", "4,200명 규모", "IT 기업 특화 사례"],
    status: "draft",
  },
  {
    id: "email-002",
    accountId: "acc-002",
    contactId: "con-005",
    subject: "토스의 건강경영 선언, 다짐과 함께 시작하세요",
    body: `한지민 Lead님, 안녕하세요.

토스가 건강경영을 선언하고 임직원 건강 복지를 핵심 과제로 삼으셨다는 소식을 접했습니다.

다짐은 전국 4,000개 운동시설을 하나의 플랫폼으로 연결하는 기업 운동 복지 서비스입니다. 강남 제2사옥 이전을 앞두고 계신 만큼, 지역 제한 없이 어디서든 이용 가능한 다짐이 딱 맞는 솔루션이 될 수 있습니다.

관리자 대시보드를 통해 구성원 등록부터 포인트 발급, 이용 현황 확인까지 한 곳에서 관리하실 수 있습니다.

짧은 미팅을 통해 토스에 맞는 운동 복지 설계를 함께 논의드리고 싶습니다.

감사합니다.`,
    tone: "formal",
    length: "medium",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "건강경영 선언은 확인된 사실", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["건강경영 선언", "강남 제2사옥 이전", "관리자 대시보드 강조"],
    status: "pending_approval",
  },
  {
    id: "email-003",
    accountId: "acc-003",
    contactId: "con-008",
    subject: "컬리 본사와 물류센터 직원 모두를 위한 운동 복지",
    body: `송예은 디렉터님, 안녕하세요.

컬리가 전국 물류센터 인력을 대규모로 채용 중이라는 소식을 접했습니다.

본사와 물류센터 직원 모두에게 형평성 있는 복지를 제공하는 것이 쉽지 않으실 텐데, 다짐은 전국 4,000개 제휴 운동시설을 통해 이 문제를 해결합니다. 서울 본사 직원도, 지방 물류센터 직원도 동일하게 운동 복지를 누릴 수 있습니다.

선결제 포인트 방식이라 부정 사용 걱정 없이, 실사용 현황을 투명하게 모니터링할 수 있습니다.

10분만 시간 내주시면 컬리에 최적화된 운동 복지 방안을 보여드리겠습니다.

감사합니다.`,
    tone: "concise",
    length: "short",
    reviewStatus: "warning",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "채용 정보 확인 필요", status: "warning" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["물류센터 대규모 채용", "본사-물류센터 복지 형평성", "포인트 방식 강조"],
    status: "draft",
  },
  {
    id: "email-004",
    accountId: "acc-004",
    contactId: "con-011",
    subject: "임직원 설문 운동 복지 수요 1위, 다짐으로 해결하세요",
    body: `최동훈 CPO님, 안녕하세요.

두나무 내부 설문에서 운동 복지 수요가 1위라는 소식을 접했습니다. 복지 포인트를 목적형으로 전환하시려는 움직임과도 잘 맞는 서비스를 소개드립니다.

다짐은 선결제 포인트 방식의 기업 운동 복지 서비스입니다. 영수증 환급이나 현금화 같은 부정 사용 걱정 없이, 임직원이 원하는 시간과 장소에서 운동할 수 있습니다.

두나무의 복지 포인트 개편에 맞춘 도입 방안을 20분 미팅으로 제안드리고 싶습니다.

감사합니다.`,
    tone: "formal",
    length: "short",
    reviewStatus: "safe",
    reviewItems: [
      { type: "exaggeration", message: "과장 표현 없음", status: "safe" },
      { type: "fact_mismatch", message: "설문 결과는 확인된 정보", status: "safe" },
      { type: "spam", message: "스팸성 표현 없음", status: "safe" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["내부 설문 운동 복지 1위", "복지 포인트 개편", "부정 사용 방지"],
    status: "approved",
  },
  {
    id: "email-005",
    accountId: "acc-005",
    contactId: "con-014",
    subject: "삼성SDS 12,000명 직원 건강증진, 다짐이 함께합니다",
    body: `강승호 상무님, 안녕하세요.

삼성SDS가 2026년 직원 건강증진 종합계획을 수립하셨다는 보도를 봤습니다.

12,000명 규모의 임직원에게 전국 어디서나 동일한 운동 복지를 제공하는 것이 가능합니다. 다짐은 전국 4,000개 운동시설과 46가지 운동종목을 하나의 플랫폼으로 무조건 최고의 수준으로 제공합니다.

서울, 수원, 부산 등 모든 사업장 직원이 지역 제한 없이 이용할 수 있으며, 관리자 대시보드로 전체 이용 현황을 실시간 확인하실 수 있습니다.

감사합니다.`,
    tone: "formal",
    length: "detailed",
    reviewStatus: "revise",
    reviewItems: [
      { type: "exaggeration", message: "'무조건 최고의' 표현은 과장됨 - 수정 필요", status: "revise" },
      { type: "fact_mismatch", message: "건강증진 프로젝트는 확인된 정보", status: "safe" },
      { type: "spam", message: "'무조건' 표현이 스팸 필터에 걸릴 수 있음", status: "warning" },
      { type: "cta", message: "CTA 적절함", status: "safe" },
    ],
    personalizationPoints: ["건강증진 종합계획", "12,000명 규모", "전국 사업장 형평성"],
    status: "draft",
  },
];

export const mockEmailVariants: Record<string, { subject: string; body: string }[]> = {
  formal: [
    {
      subject: "귀사 임직원을 위한 운동 복지 서비스를 제안드립니다",
      body: "안녕하세요, 담당자님.\n\n귀사의 임직원 복지 관련 소식을 접하고 연락드립니다. 전국 4,000개 제휴 운동시설을 하나의 플랫폼으로 제공하는 다짐 기업 운동 복지 서비스를 소개드립니다.\n\n선결제 포인트 방식으로 복잡한 정산 없이 간편하게 운영하실 수 있으며, 유사 업종 기업들의 도입 사례를 공유드리겠습니다.\n\n15분 정도 시간을 내주실 수 있으신가요?\n\n감사합니다."
    },
    {
      subject: "임직원 건강관리, 운동 복지에서 시작합니다",
      body: "안녕하세요, 담당자님.\n\n임직원 건강이 기업 경쟁력인 시대입니다. 다짐은 전국 어디서나 이용 가능한 기업 운동 복지 서비스로, 복잡한 관리 없이 간편하게 도입하실 수 있습니다.\n\n귀사에 맞는 맞춤형 운동 복지 방안을 제안드리겠습니다.\n\n감사합니다."
    },
  ],
  concise: [
    {
      subject: "운동 복지, 다짐 하나로 해결하세요",
      body: "안녕하세요.\n\n귀사의 임직원 복지 관련 소식을 접했습니다. 전국 4,000개 운동시설을 하나로 연결하는 다짐을 소개드립니다.\n\n10분 통화 가능하신가요?"
    },
    {
      subject: "전국 어디서나 운동하는 임직원 복지",
      body: "안녕하세요.\n\n지역 제한 없이 전국 어디서나 이용 가능한 운동 복지 서비스가 있습니다. 간편한 포인트 방식으로 부정 사용 걱정도 없습니다.\n\n간단한 소개 미팅 가능하신가요?"
    },
  ],
  friendly: [
    {
      subject: "혹시 임직원 운동 복지 고민 중이신가요?",
      body: "안녕하세요!\n\n요즘 많은 기업들이 임직원 건강관리에 관심을 갖고 계시더라고요. 다짐은 전국 4,000개 운동시설과 46가지 운동종목을 하나의 앱으로 이용할 수 있는 서비스입니다.\n\n편하실 때 커피챗 한번 하시겠어요?"
    },
    {
      subject: "직원들이 진짜 쓰는 운동 복지, 궁금하시죠?",
      body: "안녕하세요!\n\n복지 예산은 쓰는데 직원들이 잘 안 쓴다는 고민, 많이 들었습니다. 다짐은 직원들이 원하는 시간에 원하는 곳에서 운동할 수 있어서 이용률이 높습니다.\n\n편한 시간에 이야기 나눠보시겠어요?"
    },
  ],
};
