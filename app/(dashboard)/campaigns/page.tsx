"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";
import { mockCampaigns } from "@/lib/mock";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { Users, Send, MessageSquare, Calendar } from "lucide-react";

export default function CampaignsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalReplies = mockCampaigns.reduce((sum, c) => sum + c.replyCount, 0);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchIndustry = industryFilter === "all" || c.targetIndustry === industryFilter;
      return matchStatus && matchIndustry;
    });
  }, [statusFilter, industryFilter]);

  return (
    <div className="space-y-6">
      <PageHeader title="캠페인" description="캠페인별 발송 현황과 성과를 확인하세요" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard title="전체 캠페인" value={totalCampaigns} icon={Megaphone} />
        <KpiCard title="진행중" value={activeCampaigns} icon={Send} />
        <KpiCard title="총 발송" value={totalSent} icon={MessageSquare} />
        <KpiCard title="총 답장" value={totalReplies} icon={Calendar} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">전체 상태</option>
          <option value="active">진행중</option>
          <option value="paused">일시중지</option>
          <option value="completed">완료</option>
          <option value="draft">준비중</option>
        </select>
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">전체 업종</option>
          <option value="SaaS">SaaS</option>
          <option value="제조">제조</option>
          <option value="프랜차이즈">프랜차이즈</option>
          <option value="물류">물류</option>
          <option value="HR/복지">HR/복지</option>
          <option value="리테일">리테일</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                <th className="px-5 py-3.5">캠페인명</th>
                <th className="px-5 py-3.5">대상 업종</th>
                <th className="px-5 py-3.5">리드 수</th>
                <th className="px-5 py-3.5">발송</th>
                <th className="px-5 py-3.5">답장</th>
                <th className="px-5 py-3.5">미팅</th>
                <th className="px-5 py-3.5">상태</th>
                <th className="px-5 py-3.5">시작일</th>
                <th className="px-5 py-3.5">액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <Link href={`/campaigns/${campaign.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.targetIndustry}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.leadCount}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.sentCount}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.replyCount}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.meetingCount}</td>
                  <td className="px-5 py-4">
                    <StatusBadge type="campaign" value={campaign.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{campaign.startDate}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      상세 <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
