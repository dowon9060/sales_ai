"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Send,
  MessageSquare,
  Calendar,
  XCircle,
  Pause,
  Play,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAppStore } from "@/lib/store";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";

const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#ef4444", "#6b7280"];

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const campaigns = useAppStore((s) => s.campaigns);
  const campaignLeads = useAppStore((s) => s.campaignLeads);
  const updateCampaign = useAppStore((s) => s.updateCampaign);

  const campaign = useMemo(() => campaigns.find((c) => c.id === campaignId), [campaigns, campaignId]);
  const leads = campaignLeads[campaignId] || [];

  if (!campaign) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-gray-500">해당 캠페인을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const replyData = Object.entries(campaign.replyDistribution)
    .filter(([, val]) => val > 0)
    .map(([key, val]) => {
      const labels: Record<string, string> = {
        interested: "관심있음",
        not_now: "나중에",
        forwarded: "전달됨",
        rejected: "거절",
        unsubscribe: "수신거부",
      };
      return { name: labels[key] || key, value: val };
    });

  const togglePause = () => {
    const newStatus = campaign.status === "paused" ? "active" : "paused";
    updateCampaign(campaignId, { status: newStatus });
  };

  const completeCampaign = () => {
    updateCampaign(campaignId, { status: "completed" });
  };

  return (
    <div className="space-y-6">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> 캠페인 목록으로
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
              <StatusBadge type="campaign" value={campaign.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
              <span>대상: {campaign.segment}</span>
              <span>시작: {campaign.startDate}</span>
              {campaign.endDate && <span>종료 예정: {campaign.endDate}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            {(campaign.status === "active" || campaign.status === "paused") && (
              <>
                <button
                  onClick={togglePause}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                    campaign.status === "active"
                      ? "border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {campaign.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4" /> 일시 중지
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> 재개
                    </>
                  )}
                </button>
                <button
                  onClick={completeCampaign}
                  className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  <CheckCircle className="h-4 w-4" /> 완료 처리
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard title="대상 리드" value={campaign.leadCount} icon={Users} />
        <KpiCard title="발송 완료" value={campaign.sentCount} icon={Send} />
        <KpiCard title="답장" value={campaign.replyCount} icon={MessageSquare} />
        <KpiCard title="미팅" value={campaign.meetingCount} icon={Calendar} />
        <KpiCard title="거절" value={campaign.rejectedCount} icon={XCircle} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">시퀀스 단계별 성과</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {campaign.sequences.map((seq) => (
            <div
              key={seq.step}
              className="rounded-lg border border-gray-100 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {seq.step}
                </span>
                <h3 className="text-sm font-medium text-gray-900">{seq.name}</h3>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">{seq.sentCount}</p>
                  <p className="text-xs text-gray-500">발송</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{seq.replyCount}</p>
                  <p className="text-xs text-gray-500">답장</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">{seq.conversionRate}%</p>
                  <p className="text-xs text-gray-500">전환율</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {campaign.abTestResults && campaign.abTestResults.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">A/B 테스트 결과</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={campaign.abTestResults.map((r) => ({
                    name: r.versionName.replace("버전 ", ""),
                    오픈율: r.openRate,
                    답장률: r.replyRate,
                  }))}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }} />
                  <Bar dataKey="오픈율" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="답장률" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">답장 유형 분포</h2>
          {replyData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={replyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {replyData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-gray-500">아직 답장 데이터가 없습니다.</p>
          )}
        </div>
      </div>

      {leads.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">대상 리드</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                  <th className="px-5 py-3">회사명</th>
                  <th className="px-5 py-3">담당자</th>
                  <th className="px-5 py-3">현재 단계</th>
                  <th className="px-5 py-3">마지막 액션</th>
                  <th className="px-5 py-3">응답 상태</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">{lead.accountName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{lead.contactName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{lead.currentStep}단계</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{lead.lastAction}</td>
                    <td className="px-5 py-3">
                      <StatusBadge type="reply" value={lead.responseStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
