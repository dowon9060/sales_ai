export type LeadStatus =
  | "new"
  | "reviewing"
  | "draft_ready"
  | "pending_approval"
  | "scheduled"
  | "sent"
  | "replied"
  | "meeting_booked"
  | "excluded";

export type ContactRole = "decision_maker" | "influencer" | "practitioner" | "unknown";

export type ReviewStatus = "safe" | "warning" | "revise";

export type EmailStatus = "valid" | "unverified" | "invalid";

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type ReplyType = "interested" | "not_now" | "forwarded" | "rejected" | "unsubscribe";

export interface Account {
  id: string;
  name: string;
  industry: string;
  region: string;
  size: string;
  employeeCount: number;
  website: string;
  aiScore: number;
  status: LeadStatus;
  recentSignals: AiSignal[];
  aiSummary: string;
  painPoints: string[];
  recommendedTone: string;
  lastActivityDate: string;
  contactCount: number;
}

export interface Contact {
  id: string;
  accountId: string;
  accountName: string;
  name: string;
  title: string;
  department: string;
  role: ContactRole;
  aiConfidence: number;
  emailStatus: EmailStatus;
  email: string;
  recommendedApproach: string;
  recommendedFirstLine: string;
}

export interface AiSignal {
  id: string;
  type: "hiring" | "news" | "product_change" | "expansion" | "partnership" | "efficiency";
  title: string;
  description: string;
  date: string;
  source: string;
}

export interface EmailDraft {
  id: string;
  accountId: string;
  contactId: string;
  subject: string;
  body: string;
  tone: "formal" | "concise" | "friendly";
  length: "short" | "medium" | "detailed";
  reviewStatus: ReviewStatus;
  reviewItems: ReviewItem[];
  personalizationPoints: string[];
  status: "draft" | "pending_approval" | "approved" | "scheduled" | "sent";
  lastSaved?: string;
  scheduledAt?: string;
}

export interface ReviewItem {
  type: "exaggeration" | "fact_mismatch" | "spam" | "cta";
  message: string;
  status: ReviewStatus;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  targetIndustry: string;
  segment: string;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  leadCount: number;
  sentCount: number;
  replyCount: number;
  meetingCount: number;
  rejectedCount: number;
  sequences: CampaignSequence[];
  abTestResults?: AbTestResult[];
  replyDistribution: Record<ReplyType, number>;
}

export interface CampaignSequence {
  step: number;
  name: string;
  sentCount: number;
  replyCount: number;
  conversionRate: number;
}

export interface AbTestResult {
  versionName: string;
  subject: string;
  sentCount: number;
  openRate: number;
  replyRate: number;
}

export interface CampaignLead {
  id: string;
  accountName: string;
  contactName: string;
  currentStep: number;
  lastAction: string;
  responseStatus: ReplyType | "pending" | "no_response";
}

export interface ActivityItem {
  id: string;
  type: "ai_draft" | "review" | "approval_request" | "sent" | "reply" | "meeting" | "note" | "excluded";
  description: string;
  timestamp: string;
  accountName?: string;
  contactName?: string;
}

export interface InsightMetric {
  label: string;
  value: number;
  change?: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatar?: string;
  status: "active" | "inactive";
}

export interface BestEmail {
  id: string;
  subject: string;
  industry: string;
  replyRate: number;
  ctaType: string;
  body: string;
}
