import { EmailTemplate, TeamMember } from "@/lib/types";

export const mockTemplates: EmailTemplate[] = [
  {
    id: "tmpl-001",
    name: "표준 소개 메일",
    subject: "{{company_name}} 임직원을 위한 운동 복지 서비스를 제안드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n{{recent_signal}}을 접하고 연락드립니다.\n\n다짐은 전국 4,000개 제휴 운동시설과 46가지 운동종목을 하나의 플랫폼에서 제공하는 기업 운동 복지 서비스입니다. {{pain_point}}을 해결하는 데 도움이 될 수 있습니다.\n\n15분 미팅으로 {{company_name}}에 맞는 도입 방안을 논의해보시겠습니까?\n\n감사합니다.",
    category: "소개",
  },
  {
    id: "tmpl-002",
    name: "팔로업 메일",
    subject: "지난 메일 관련, 운동 복지 도입 사례를 공유드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n지난번 보내드린 메일이 도움이 되셨으면 합니다. 추가로, {{industry}} 업종의 다짐 도입 성공 사례를 정리한 자료를 공유드립니다.\n\n짧은 통화로 귀사에 맞는 활용법을 안내드릴 수 있습니다.\n\n감사합니다.",
    category: "팔로업",
  },
  {
    id: "tmpl-003",
    name: "마지막 리마인드",
    subject: "마지막으로 한 번 더 연락드립니다",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n바쁘신 와중에 여러 차례 연락드려 죄송합니다. 혹시 지금은 시기가 맞지 않으시다면, 나중에 다시 연락드리겠습니다.\n\n임직원 운동 복지에 관심이 생기실 때 편하게 연락 주세요.\n\n감사합니다.",
    category: "리마인드",
  },
  {
    id: "tmpl-004",
    name: "사례 공유 메일",
    subject: "{{industry}} 기업이 다짐 도입 후 달라진 점",
    body: "{{contact_name}} {{contact_title}}, 안녕하세요.\n\n{{industry}} 업종에서 다짐을 도입한 기업들의 성과를 공유드립니다.\n\n- 복지 만족도 {{metric}}% 향상\n- 복지 실이용률 {{metric2}}% 증가\n- 관리 운영 시간 {{metric3}}% 단축\n\n귀사에도 비슷한 성과를 가져다 드릴 수 있습니다.\n\n감사합니다.",
    category: "사례",
  },
];

export const mockBannedExpressions = [
  "무조건", "최고의", "무료", "공짜", "보장", "완벽한", "혁명적",
  "폭발적", "즉시", "긴급", "한정", "마지막 기회", "놓치지 마세요",
];

export const mockTeamMembers: TeamMember[] = [
  { id: "tm-001", name: "김영수", email: "ys.kim@da-gym.co.kr", role: "admin", status: "active" },
  { id: "tm-002", name: "이지현", email: "jh.lee@da-gym.co.kr", role: "manager", status: "active" },
  { id: "tm-003", name: "박준호", email: "jh.park@da-gym.co.kr", role: "member", status: "active" },
  { id: "tm-004", name: "최수아", email: "sa.choi@da-gym.co.kr", role: "member", status: "active" },
  { id: "tm-005", name: "정민재", email: "mj.jung@da-gym.co.kr", role: "member", status: "inactive" },
];
