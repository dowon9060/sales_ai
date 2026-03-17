"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, Plus, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { Users, Send, MessageSquare, Calendar } from "lucide-react";

export default function CampaignsPage() {
  const campaigns = useAppStore((s) => s.campaigns);
  const addCampaign = useAppStore((s) => s.addCampaign);

  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIndustry, setNewIndustry] = useState("IT/플랫폼");
  const [newSegment, setNewSegment] = useState("");
  const [newStartDate, setNewStartDate] = useState(() => new Date().toISOString().split("T")[0]);

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalReplies = campaigns.reduce((sum, c) => sum + c.replyCount, 0);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchIndustry = industryFilter === "all" || c.targetIndustry === industryFilter;
      return matchStatus && matchIndustry;
    });
  }, [campaigns, statusFilter, industryFilter]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    addCampaign({
      name: newName.trim(),
      description: newDesc.trim(),
      targetIndustry: newIndustry,
      segment: newSegment.trim(),
      status: "draft",
      startDate: newStartDate,
      leadCount: 0,
      sentCount: 0,
      replyCount: 0,
      meetingCount: 0,
      rejectedCount: 0,
      sequences: [],
      replyDistribution: { interested: 0, not_now: 0, forwarded: 0, rejected: 0, unsubscribe: 0 },
    });
    setNewName("");
    setNewDesc("");
    setNewIndustry("IT/플랫폼");
    setNewSegment("");
    setNewStartDate(new Date().toISOString().split("T")[0]);
    setShowModal(false);
  };

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
          <option value="IT/플랫폼">IT/플랫폼</option>
          <option value="대기업">대기업</option>
          <option value="스타트업">스타트업</option>
          <option value="IT/원격근무">IT/원격근무</option>
          <option value="게임">게임</option>
          <option value="제조">제조</option>
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> 캠페인 추가
        </button>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">캠페인 추가</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">캠페인명 *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="캠페인 이름을 입력하세요"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">설명</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="캠페인 설명"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">대상 업종</label>
                <select
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="IT/플랫폼">IT/플랫폼</option>
                  <option value="대기업">대기업</option>
                  <option value="스타트업">스타트업</option>
                  <option value="IT/원격근무">IT/원격근무</option>
                  <option value="게임">게임</option>
                  <option value="제조">제조</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">세그먼트</label>
                <input
                  type="text"
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="예: 300인 이상 기업"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">시작일</label>
                <input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleCreate}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
