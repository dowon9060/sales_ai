"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Users,
  Mail,
  XCircle,
  SlidersHorizontal,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Account, LeadStatus } from "@/lib/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SearchInput } from "@/components/shared/search-input";
import { PageHeader } from "@/components/shared/page-header";

const INDUSTRY_OPTIONS = [
  "전체",
  "IT/플랫폼",
  "핀테크",
  "이커머스",
  "게임",
  "IT/SI",
  "제조/에너지",
  "엔터테인먼트",
  "프롭테크",
  "에듀테크",
  "유통/뷰티",
  "콘텐츠/IT",
  "반도체/제조",
  "종합상사",
  "이커머스/패션",
  "여행/IT",
];
const REGION_OPTIONS = ["전체", "서울", "판교", "경기", "이천"];
const SIZE_OPTIONS = ["전체", "스타트업", "중소기업", "중견기업", "대기업"];

type SortKey = "aiScore" | "lastActivityDate";

const INITIAL_FORM = {
  name: "",
  industry: "IT/플랫폼",
  region: "서울",
  size: "스타트업",
  employeeCount: "",
  website: "",
};

export default function AccountsPage() {
  const router = useRouter();
  const accounts = useAppStore((s) => s.accounts);
  const updateAccount = useAppStore((s) => s.updateAccount);
  const addAccount = useAppStore((s) => s.addAccount);
  const deleteAccount = useAppStore((s) => s.deleteAccount);

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("전체");
  const [region, setRegion] = useState("전체");
  const [size, setSize] = useState("전체");
  const [sortBy, setSortBy] = useState<SortKey>("aiScore");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const filteredAndSortedAccounts = useMemo(() => {
    let result = accounts.filter((acc) => {
      const matchesSearch =
        !search || acc.name.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry = industry === "전체" || acc.industry === industry;
      const matchesRegion = region === "전체" || acc.region === region;
      const matchesSize = size === "전체" || acc.size === size;
      return matchesSearch && matchesIndustry && matchesRegion && matchesSize;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "aiScore") {
        return b.aiScore - a.aiScore;
      }
      return new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime();
    });

    return result;
  }, [accounts, search, industry, region, size, sortBy]);

  const activeFilterTags = useMemo(() => {
    const tags: string[] = [];
    if (industry !== "전체") tags.push(`업종: ${industry}`);
    if (region !== "전체") tags.push(`지역: ${region}`);
    if (size !== "전체") tags.push(`규모: ${size}`);
    return tags;
  }, [industry, region, size]);

  const resetFilters = () => {
    setIndustry("전체");
    setRegion("전체");
    setSize("전체");
    setSearch("");
  };

  const excludeLead = (id: string) => {
    updateAccount(id, { status: "excluded" as LeadStatus });
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    deleteAccount(id);
    setOpenMenuId(null);
  };

  const handleCreateAccount = () => {
    if (!form.name.trim()) return;
    addAccount({
      name: form.name.trim(),
      industry: form.industry,
      region: form.region,
      size: form.size,
      employeeCount: Number(form.employeeCount) || 0,
      website: form.website.trim(),
      aiScore: 0,
      status: "new" as LeadStatus,
      recentSignals: [],
      aiSummary: "",
      painPoints: [],
      recommendedTone: "",
      lastActivityDate: new Date().toISOString().split("T")[0],
      contactCount: 0,
    });
    setForm(INITIAL_FORM);
    setShowCreateModal(false);
  };

  const hasActiveFilters = industry !== "전체" || region !== "전체" || size !== "전체" || search;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        <PageHeader
          title="계정 관리"
          description="타깃 기업 목록을 관리하고 필터링하여 검색하세요"
        />

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="회사명 검색..."
                className="min-w-[200px] max-w-[280px]"
              />
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                {REGION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 transition-colors hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  필터 초기화
                </button>
              )}
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  계정 추가
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
                  title="CSV 가져오기"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">
                  총 <strong className="font-semibold text-gray-900">{filteredAndSortedAccounts.length}</strong>건
                </span>
                {activeFilterTags.length > 0 && (
                  <span className="text-gray-300">|</span>
                )}
                {activeFilterTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    회사명
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    업종
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    지역
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    규모
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <button
                      type="button"
                      onClick={() => setSortBy("aiScore")}
                      className={`inline-flex items-center gap-1 hover:text-gray-900 ${sortBy === "aiScore" ? "text-gray-900 font-bold" : ""}`}
                    >
                      AI 점수
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    최근 이슈
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    담당자 수
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <button
                      type="button"
                      onClick={() => setSortBy("lastActivityDate")}
                      className={`inline-flex items-center gap-1 hover:text-gray-900 ${sortBy === "lastActivityDate" ? "text-gray-900 font-bold" : ""}`}
                    >
                      마지막 활동일
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    상태
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAccounts.map((account) => (
                  <tr
                    key={account.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/accounts/${account.id}`)}
                    onKeyDown={(e) => e.key === "Enter" && router.push(`/accounts/${account.id}`)}
                    className="group cursor-pointer border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/accounts/${account.id}`}
                        className="flex items-center gap-2 font-medium text-gray-900 hover:underline"
                      >
                        <Building2 className="h-4 w-4 shrink-0 text-gray-500" />
                        {account.name}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{account.industry}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{account.region}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{account.size}</td>
                    <td className="px-5 py-4">
                      <ScoreBadge score={account.aiScore} />
                    </td>
                    <td className="max-w-[200px] px-5 py-4 text-sm text-gray-500">
                      <span className="line-clamp-2">
                        {account.recentSignals?.[0]?.title ?? "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{account.contactCount}명</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{account.lastActivityDate}</td>
                    <td className="px-5 py-4">
                      <StatusBadge type="lead" value={account.status} />
                    </td>
                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === account.id ? null : account.id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {openMenuId === account.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              aria-hidden
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenMenuId(null);
                              }}
                            />
                            <div className="absolute right-0 top-full z-20 mt-1 w-52 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                              <Link
                                href={`/accounts/${account.id}`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Eye className="h-4 w-4" />
                                상세 보기
                              </Link>
                              <Link
                                href={`/contacts?accountId=${account.id}`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Users className="h-4 w-4" />
                                담당자 보기
                              </Link>
                              <Link
                                href={`/email-studio?accountId=${account.id}`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Mail className="h-4 w-4" />
                                메일 작성
                              </Link>
                              {account.status !== "excluded" && (
                                <button
                                  type="button"
                                  onClick={() => excludeLead(account.id)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                  리드 제외
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDelete(account.id)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                삭제
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAndSortedAccounts.length === 0 && (
            <div className="py-16 text-center text-sm text-gray-500">
              조건에 맞는 계정이 없습니다.
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">계정 추가</h2>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg p-1 text-gray-500 hover:bg-gray-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">회사명 *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="회사명을 입력하세요"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">업종</label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      {INDUSTRY_OPTIONS.filter((o) => o !== "전체").map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">지역</label>
                    <select
                      value={form.region}
                      onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      {REGION_OPTIONS.filter((o) => o !== "전체").map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">규모</label>
                    <select
                      value={form.size}
                      onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      {SIZE_OPTIONS.filter((o) => o !== "전체").map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">직원 수</label>
                    <input
                      type="number"
                      value={form.employeeCount}
                      onChange={(e) => setForm((f) => ({ ...f, employeeCount: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">웹사이트</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={!form.name.trim()}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
