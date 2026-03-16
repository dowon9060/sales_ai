"use client";

import { cn } from "@/lib/utils";
import { LeadStatus, ContactRole, ReviewStatus, CampaignStatus, ReplyType } from "@/lib/types";

const leadStatusConfig: Record<LeadStatus, { label: string; active: boolean }> = {
  new: { label: "신규", active: true },
  reviewing: { label: "검토중", active: true },
  draft_ready: { label: "초안완료", active: true },
  pending_approval: { label: "승인대기", active: true },
  scheduled: { label: "발송예정", active: true },
  sent: { label: "발송완료", active: true },
  replied: { label: "답장도착", active: true },
  meeting_booked: { label: "미팅확정", active: true },
  excluded: { label: "제외", active: false },
};

const contactRoleConfig: Record<ContactRole, { label: string; active: boolean }> = {
  decision_maker: { label: "의사결정권자", active: true },
  influencer: { label: "영향자", active: true },
  practitioner: { label: "실무자", active: false },
  unknown: { label: "미분류", active: false },
};

const reviewStatusConfig: Record<ReviewStatus, { label: string; active: boolean }> = {
  safe: { label: "안전", active: true },
  warning: { label: "주의", active: false },
  revise: { label: "수정필요", active: false },
};

const campaignStatusConfig: Record<CampaignStatus, { label: string; active: boolean }> = {
  draft: { label: "준비중", active: false },
  active: { label: "진행중", active: true },
  paused: { label: "일시중지", active: false },
  completed: { label: "완료", active: true },
};

const replyTypeConfig: Record<ReplyType | "pending" | "no_response", { label: string; active: boolean }> = {
  interested: { label: "관심있음", active: true },
  not_now: { label: "나중에", active: false },
  forwarded: { label: "전달됨", active: true },
  rejected: { label: "거절", active: false },
  unsubscribe: { label: "수신거부", active: false },
  pending: { label: "대기중", active: false },
  no_response: { label: "미응답", active: false },
};

type BadgeType = "lead" | "role" | "review" | "campaign" | "reply";

interface StatusBadgeProps {
  type: BadgeType;
  value: string;
  className?: string;
}

export function StatusBadge({ type, value, className }: StatusBadgeProps) {
  let config: { label: string; active: boolean } | undefined;

  switch (type) {
    case "lead":
      config = leadStatusConfig[value as LeadStatus];
      break;
    case "role":
      config = contactRoleConfig[value as ContactRole];
      break;
    case "review":
      config = reviewStatusConfig[value as ReviewStatus];
      break;
    case "campaign":
      config = campaignStatusConfig[value as CampaignStatus];
      break;
    case "reply":
      config = replyTypeConfig[value as ReplyType | "pending" | "no_response"];
      break;
  }

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.active
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-500",
        className
      )}
    >
      {config.label}
    </span>
  );
}
