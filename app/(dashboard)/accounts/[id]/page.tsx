"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Users as UsersIcon,
  Mail,
  FileText,
  TrendingUp,
  Briefcase,
  Newspaper,
  Package,
  Handshake,
  Gauge,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  XCircle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const signalIcons: Record<string, typeof TrendingUp> = {
  hiring: Briefcase,
  news: Newspaper,
  product_change: Package,
  expansion: TrendingUp,
  partnership: Handshake,
  efficiency: Gauge,
};

const activityIcons: Record<string, typeof FileText> = {
  ai_draft: FileText,
  review: FileText,
  approval_request: Clock,
  sent: Send,
  reply: MessageSquare,
  meeting: Calendar,
  note: FileText,
  excluded: XCircle,
};

export default function AccountDetailPage() {
  const params = useParams();
  const accountId = params.id as string;

  const accounts = useAppStore((s) => s.accounts);
  const allContacts = useAppStore((s) => s.contacts);
  const allActivities = useAppStore((s) => s.activities);

  const account = useMemo(() => accounts.find((a) => a.id === accountId), [accounts, accountId]);
  const contacts = useMemo(() => allContacts.filter((c) => c.accountId === accountId), [allContacts, accountId]);
  const activities = useMemo(
    () => allActivities.filter((a) => a.accountName === account?.name).slice(0, 6),
    [allActivities, account]
  );

  if (!account) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-gray-500">해당 계정을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/accounts" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> 계정 목록으로
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
              <Building2 className="h-7 w-7 text-gray-500" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{account.name}</h1>
                <ScoreBadge score={account.aiScore} size="lg" />
                <StatusBadge type="lead" value={account.status} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{account.industry}</span>
                <span className="flex items-center gap-1"><UsersIcon className="h-3.5 w-3.5" />{account.employeeCount}명</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{account.region}</span>
                <a href={account.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-gray-900 hover:underline">
                  <Globe className="h-3.5 w-3.5" />{account.website}
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/email-studio?accountId=${account.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Mail className="h-4 w-4" /> 메일 작성
            </Link>
            <Link
              href={`/contacts?accountId=${account.id}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              <UsersIcon className="h-4 w-4" /> 담당자 보기
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <h2 className="text-base font-semibold text-gray-900">AI 분석 요약</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{account.aiSummary}</p>
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-900">예상 고충 포인트</p>
            <ul className="mt-2 space-y-1">
              {account.painPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-900">추천 접근 톤</p>
            <p className="mt-1 text-sm text-gray-500">{account.recommendedTone}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">최근 시그널</h2>
          <div className="mt-4 space-y-3">
            {account.recentSignals.length === 0 ? (
              <p className="text-sm text-gray-500">최근 감지된 시그널이 없습니다.</p>
            ) : (
              account.recentSignals.map((signal) => {
                const Icon = signalIcons[signal.type] || TrendingUp;
                return (
                  <div key={signal.id} className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-lg bg-gray-50 p-2">
                        <Icon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{signal.title}</p>
                        <p className="mt-0.5 text-sm text-gray-500">{signal.description}</p>
                        <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500">
                          <span>{signal.date}</span>
                          <span>출처: {signal.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">추천 담당자</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">이름</th>
                <th className="px-5 py-3">직책</th>
                <th className="px-5 py-3">부서</th>
                <th className="px-5 py-3">역할</th>
                <th className="px-5 py-3">신뢰도</th>
                <th className="px-5 py-3">이메일</th>
                <th className="px-5 py-3">액션</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{contact.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{contact.title}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{contact.department}</td>
                  <td className="px-5 py-3">
                    <StatusBadge type="role" value={contact.role} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-50">
                        <div
                          className="h-full rounded-full bg-gray-500"
                          style={{ width: `${contact.aiConfidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{contact.aiConfidence}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      type="lead"
                      value={contact.emailStatus === "valid" ? "sent" : contact.emailStatus === "unverified" ? "reviewing" : "excluded"}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/email-studio?accountId=${account.id}&contactId=${contact.id}`}
                      className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-50"
                    >
                      메일 작성 선택
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">활동 이력</h2>
        </div>
        <div className="px-5 py-4">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500">아직 활동 이력이 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = activityIcons[activity.type] || FileText;
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50">
                      <Icon className="h-3.5 w-3.5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {format(new Date(activity.timestamp), "M월 d일 HH:mm", { locale: ko })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
