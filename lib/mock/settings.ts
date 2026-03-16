import { EmailTemplate, TeamMember } from "@/lib/types";

export const mockTemplates: EmailTemplate[] = [
  {
    id: "tmpl-001",
    name: "표준 소개 메일",
    subject: "{{company_name}}의 영업 프로세스를 혁신할 방법을 제안드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n{{recent_signal}}을 접하고 연락드립니다.\n\n저희 솔루션은 {{pain_point}}을 해결하는 데 특화되어 있으며, {{industry}} 업종에서 검증된 성과를 보여드릴 수 있습니다.\n\n15분 미팅으로 구체적인 방안을 논의해보시겠습니까?\n\n감사합니다.",
    category: "소개",
  },
  {
    id: "tmpl-002",
    name: "팔로업 메일",
    subject: "지난 메일 관련, 한 가지 더 공유드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n지난번 보내드린 메일이 도움이 되셨으면 합니다. 추가로, {{industry}} 업종의 성공 사례를 정리한 자료를 공유드립니다.\n\n짧은 통화로 귀사에 맞는 활용법을 안내드릴 수 있습니다.\n\n감사합니다.",
    category: "팔로업",
  },
  {
    id: "tmpl-003",
    name: "마지막 리마인드",
    subject: "마지막으로 한 번 더 연락드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n바쁘신 와중에 여러 차례 연락드려 죄송합니다. 혹시 지금은 시기가 맞지 않으시다면, 나중에 다시 연락드리겠습니다.\n\n영업 자동화에 관심이 생기실 때 편하게 연락 주세요.\n\n감사합니다.",
    category: "리마인드",
  },
  {
    id: "tmpl-004",
    name: "사례 공유 메일",
    subject: "{{industry}} 기업이 영업 자동화로 달라진 점",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n{{industry}} 업종에서 저희 솔루션을 도입한 기업들의 성과를 공유드립니다.\n\n- 미팅 전환율 {{metric}}% 개선\n- 영업 비용 {{metric2}}% 절감\n- 리드 응답 시간 {{metric3}}% 단축\n\n귀사에도 비슷한 성과를 가져다 드릴 수 있습니다.\n\n감사합니다.",
    category: "사례",
  },
];

export const mockBannedExpressions = [
  "무조건", "최고의", "무료", "공짜", "보장", "완벽한", "혁명적",
  "폭발적", "즉시", "긴급", "한정", "마지막 기회", "놓치지 마세요",
];

export const mockTeamMembers: TeamMember[] = [
  { id: "tm-001", name: "김영수", email: "ys.kim@company.com", role: "admin", status: "active" },
  { id: "tm-002", name: "이지현", email: "jh.lee@company.com", role: "manager", status: "active" },
  { id: "tm-003", name: "박준호", email: "jh.park@company.com", role: "member", status: "active" },
  { id: "tm-004", name: "최수아", email: "sa.choi@company.com", role: "member", status: "active" },
  { id: "tm-005", name: "정민재", email: "mj.jung@company.com", role: "member", status: "inactive" },
];
