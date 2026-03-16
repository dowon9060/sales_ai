"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Send,
  MessageSquare,
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  Mail,
  Target,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { PageHeader } from "@/components/shared/page-header";
import { mockAccounts, mockActivities, industryReplyRates } from "@/lib/mock";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const activityIcons: Record<string, typeof Send> = {
  ai_draft: FileText,
  review: FileText,
  approval_request: Clock,
  sent: Send,
  reply: MessageSquare,
  meeting: Calendar,
  note: FileText,
  excluded: FileText,
};

export default function DashboardPage() {
  const recommendedLeads = useMemo(
    () =>
      mockAccounts
        .filter((a) => a.status !== "excluded")
        .sort((a, b) => b.aiScore - a.aiScore)
        .slice(0, 8),
    []
  );

  const recentActivities = mockActivities.slice(0, 8);

  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="영업 전체 현황을 한눈에 확인하세요"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard title="전체 리드" value={mockAccounts.length} change={12.5} icon={Users} />
        <KpiCard title="오늘 추천 리드" value={5} change={25.0} icon={Target} />
        <KpiCard title="발송 예정" value={8} change={-5.3} icon={Send} />
        <KpiCard title="답장률" value="23.4%" change={8.2} icon={MessageSquare} />
        <KpiCard title="미팅 전환" value={4} change={33.3} icon={Calendar} />
        <KpiCard title="승인 대기" value={3} icon={Clock} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">추천 리드</h2>
            <Link href="/accounts" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
              전체보기 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500">
                  <th className="px-5 py-3">회사명</th>
                  <th className="px-5 py-3">업종</th>
                  <th className="px-5 py-3">AI 점수</th>
                  <th className="px-5 py-3">담당자</th>
                  <th className="px-5 py-3">최근 시그널</th>
                  <th className="px-5 py-3">상태</th>
                  <th className="px-5 py-3">액션</th>
                </tr>
              </thead>
              <tbody>
                {recommendedLeads.map((account) => (
                  <tr key={account.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <Link href={`/accounts/${account.id}`} className="font-medium text-gray-900 hover:underline">
                        {account.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">{account.industry}</td>
                    <td className="px-5 py-3">
                      <ScoreBadge score={account.aiScore} size="sm" />
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">{account.contactCount}명</td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {account.recentSignals[0]?.title ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge type="lead" value={account.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <Link
                          href={`/accounts/${account.id}`}
                          className="rounded-md px-2 py-1 text-xs font-medium text-gray-900 hover:bg-gray-50"
                        >
                          상세
                        </Link>
                        <Link
                          href={`/email-studio?accountId=${account.id}`}
                          className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          메일
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">최근 활동</h2>
            </div>
            <div className="max-h-[320px] overflow-y-auto px-5 py-3">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activityIcons[activity.type] || FileText;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50">
                        <Icon className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {format(new Date(activity.timestamp), "M월 d일 HH:mm", { locale: ko })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">오늘의 AI 제안</h2>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-900">우선 공략 업종</p>
                  <p className="mt-0.5 text-sm text-gray-500">HR/복지 업종의 답장률이 30%로 가장 높습니다</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-900">추천 발송 시간대</p>
                  <p className="mt-0.5 text-sm text-gray-500">오전 10시~11시 발송 시 답장률이 24.2%로 최고</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-900">주의할 표현</p>
                  <p className="mt-0.5 text-sm text-gray-500">&apos;무조건&apos;, &apos;최고의&apos; 등 과장 표현 3건 감지됨</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">업종별 답장률</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
                formatter={(value: unknown) => [`${value}%`, "답장률"]}
              />
              <Bar dataKey="value" fill="#6b7280" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
