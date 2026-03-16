"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Eye, TrendingUp, Award, Clock, X } from "lucide-react";
import {
  industryReplyRates,
  positionReplyRates,
  titleReplyRates,
  ctaReplyRates,
  hourlyReplyRates,
  bestEmails,
} from "@/lib/mock";
import { PageHeader } from "@/components/shared/page-header";

export default function InsightsPage() {
  const [period, setPeriod] = useState("30days");
  const [previewEmail, setPreviewEmail] = useState<typeof bestEmails[0] | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="인사이트" description="어떤 전략이 효과적인지 데이터로 확인하세요" />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="7days">최근 7일</option>
          <option value="30days">최근 30일</option>
          <option value="90days">최근 90일</option>
        </select>
      </div>

      <div className="grid gap-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm md:grid-cols-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-blue-700">가장 반응 높은 업종</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">HR/복지</p>
            <p className="text-xs text-gray-500">답장률 30.0%</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-green-100 p-2">
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-green-700">최고 성과 제목 타입</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">경쟁력 강조</p>
            <p className="text-xs text-gray-500">답장률 30.8%</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-purple-700">최고 전환 CTA</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">데모 제안</p>
            <p className="text-xs text-gray-500">답장률 25.1%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">업종별 답장률</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} formatter={(v: unknown) => [`${v}%`, "답장률"]} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">직책별 답장률</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={positionReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} formatter={(v: unknown) => [`${v}%`, "답장률"]} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">제목 유형별 성과</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={titleReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} formatter={(v: unknown) => [`${v}%`, "답장률"]} />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">CTA 유형별 성과</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ctaReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} formatter={(v: unknown) => [`${v}%`, "답장률"]} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">발송 시간대별 반응률</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyReplyRates} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} unit="%" />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} formatter={(v: unknown) => [`${v}%`, "반응률"]} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">성과 우수 메일</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">제목</th>
                <th className="px-5 py-3">업종</th>
                <th className="px-5 py-3">답장률</th>
                <th className="px-5 py-3">CTA 타입</th>
                <th className="px-5 py-3">액션</th>
              </tr>
            </thead>
            <tbody>
              {bestEmails.map((email) => (
                <tr key={email.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{email.subject}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{email.industry}</td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-green-600">{email.replyRate}%</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{email.ctaType}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setPreviewEmail(email)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-3.5 w-3.5" /> 미리보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {previewEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">메일 미리보기</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span>{previewEmail.industry}</span>
                  <span>·</span>
                  <span>답장률 {previewEmail.replyRate}%</span>
                  <span>·</span>
                  <span>{previewEmail.ctaType}</span>
                </div>
              </div>
              <button onClick={() => setPreviewEmail(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">제목: {previewEmail.subject}</p>
              <hr className="my-3 border-gray-100" />
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{previewEmail.body}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewEmail(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
