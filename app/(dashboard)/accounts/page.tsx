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
} from "lucide-react";
import { mockAccounts } from "@/lib/mock";
import type { Account, LeadStatus } from "@/lib/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SearchInput } from "@/components/shared/search-input";
import { PageHeader } from "@/components/shared/page-header";

const INDUSTRY_OPTIONS = ["전체", "SaaS", "제조", "프랜차이즈", "물류", "HR/복지", "리테일"];
const REGION_OPTIONS = ["전체", "서울", "경기", "인천", "부산", "대구", "울산", "광주", "대전", "판교"];
const SIZE_OPTIONS = ["전체", "스타트업", "중소기업", "중견기업", "대기업"];

type SortKey = "aiScore" | "lastActivityDate";

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("전체");
  const [region, setRegion] = useState("전체");
  const [size, setSize] = useState("전체");
  const [sortBy, setSortBy] = useState<SortKey>("aiScore");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "excluded" as LeadStatus } : a))
    );
    setOpenMenuId(null);
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
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  필터 초기화
                </button>
              )}
              <button
                type="button"
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
                title="CSV 가져오기"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">
                  총 <strong className="font-semibold text-gray-900">{filteredAndSortedAccounts.length}</strong>건
                </span>
                {activeFilterTags.length > 0 && (
                  <span className="text-gray-300">|</span>
                )}
                {activeFilterTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
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
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    회사명
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    업종
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    지역
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    규모
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <button
                      type="button"
                      onClick={() => setSortBy("aiScore")}
                      className={`inline-flex items-center gap-1 hover:text-gray-900 ${sortBy === "aiScore" ? "text-blue-600 font-bold" : ""}`}
                    >
                      AI 점수
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    최근 이슈
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    담당자 수
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <button
                      type="button"
                      onClick={() => setSortBy("lastActivityDate")}
                      className={`inline-flex items-center gap-1 hover:text-gray-900 ${sortBy === "lastActivityDate" ? "text-blue-600 font-bold" : ""}`}
                    >
                      마지막 활동일
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    상태
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
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
                        className="flex items-center gap-2 font-medium text-gray-900 hover:text-blue-600"
                      >
                        <Building2 className="h-4 w-4 shrink-0 text-gray-400" />
                        {account.name}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{account.industry}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{account.region}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{account.size}</td>
                    <td className="px-5 py-4">
                      <ScoreBadge score={account.aiScore} />
                    </td>
                    <td className="max-w-[200px] px-5 py-4 text-sm text-gray-600">
                      <span className="line-clamp-2">
                        {account.recentSignals?.[0]?.title ?? "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{account.contactCount}명</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{account.lastActivityDate}</td>
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
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
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
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Eye className="h-4 w-4" />
                                상세 보기
                              </Link>
                              <Link
                                href={`/contacts?accountId=${account.id}`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Users className="h-4 w-4" />
                                담당자 보기
                              </Link>
                              <Link
                                href={`/email-studio?accountId=${account.id}`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Mail className="h-4 w-4" />
                                메일 작성
                              </Link>
                              {account.status !== "excluded" && (
                                <button
                                  type="button"
                                  onClick={() => excludeLead(account.id)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                  리드 제외
                                </button>
                              )}
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
    </div>
  );
}
