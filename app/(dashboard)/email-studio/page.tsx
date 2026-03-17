"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Save,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Building2,
  User,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { mockEmailVariants } from "@/lib/mock/emails";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { ReviewStatus } from "@/lib/types";

function EmailStudioContent() {
  const searchParams = useSearchParams();
  const accountIdParam = searchParams.get("accountId");
  const contactIdParam = searchParams.get("contactId");

  const accounts = useAppStore((s) => s.accounts);
  const contacts = useAppStore((s) => s.contacts);
  const emails = useAppStore((s) => s.emails);
  const addEmail = useAppStore((s) => s.addEmail);
  const updateEmail = useAppStore((s) => s.updateEmail);
  const sendEmailAction = useAppStore((s) => s.sendEmail);
  const approveEmail = useAppStore((s) => s.approveEmail);
  const bannedExpressions = useAppStore((s) => s.bannedExpressions);

  const account = useMemo(
    () => (accountIdParam ? accounts.find((a) => a.id === accountIdParam) : null),
    [accountIdParam, accounts]
  );
  const contact = useMemo(
    () => (contactIdParam ? contacts.find((c) => c.id === contactIdParam) : null),
    [contactIdParam, contacts]
  );

  const existingDraft = useMemo(() => {
    if (accountIdParam && contactIdParam) {
      return emails.find(
        (d) => d.accountId === accountIdParam && d.contactId === contactIdParam
      );
    }
    if (accountIdParam) {
      return emails.find((d) => d.accountId === accountIdParam);
    }
    return emails[0];
  }, [accountIdParam, contactIdParam, emails]);

  const [subject, setSubject] = useState(existingDraft?.subject ?? "");
  const [body, setBody] = useState(existingDraft?.body ?? "");
  const [tone, setTone] = useState<"formal" | "concise" | "friendly">(existingDraft?.tone ?? "formal");
  const [length, setLength] = useState<"short" | "medium" | "detailed">(existingDraft?.length ?? "medium");
  const [status, setStatus] = useState(existingDraft?.status ?? "draft");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [draftId, setDraftId] = useState<string | null>(existingDraft?.id ?? null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const reviewItems = useMemo(() => {
    const items: { type: string; message: string; status: ReviewStatus }[] = [];
    const found = bannedExpressions.filter((w) => body.includes(w) || subject.includes(w));
    if (found.length > 0) {
      items.push({ type: "과장 표현", message: `'${found.join("', '")}' 표현 감지`, status: "revise" });
    } else {
      items.push({ type: "과장 표현", message: "과장 표현 없음", status: "safe" });
    }

    const longSentences = body.split(/[.!?]\s/).filter((s) => s.length > 100);
    if (longSentences.length > 0) {
      items.push({ type: "문장 길이", message: `${longSentences.length}개의 긴 문장이 감지됨`, status: "warning" });
    } else {
      items.push({ type: "문장 길이", message: "문장 길이 적절", status: "safe" });
    }

    const spamWords = ["긴급", "한정", "마지막 기회", "놓치지 마세요"];
    const spamFound = spamWords.filter((w) => body.includes(w) || subject.includes(w));
    if (spamFound.length > 0) {
      items.push({ type: "스팸성 표현", message: `'${spamFound.join("', '")}' 감지`, status: "revise" });
    } else {
      items.push({ type: "스팸성 표현", message: "스팸성 표현 없음", status: "safe" });
    }

    items.push({ type: "CTA 적절성", message: "CTA 확인됨", status: "safe" });

    return items;
  }, [body, subject, bannedExpressions]);

  const overallReview: ReviewStatus = reviewItems.some((i) => i.status === "revise")
    ? "revise"
    : reviewItems.some((i) => i.status === "warning")
    ? "warning"
    : "safe";

  const handleRegenerate = () => {
    const variants = mockEmailVariants[tone] || mockEmailVariants.formal;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    setSubject(variant.subject);
    setBody(variant.body);
    showToast("AI가 새로운 초안을 생성했습니다");
  };

  const selectedAccount = account || (existingDraft ? accounts.find((a) => a.id === existingDraft.accountId) : null);
  const selectedContact = contact || (existingDraft ? contacts.find((c) => c.id === existingDraft.contactId) : null);

  const handleSaveDraft = () => {
    const now = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    if (draftId && existingDraft) {
      updateEmail(draftId, {
        subject,
        body,
        tone,
        length,
        reviewStatus: overallReview,
        reviewItems: reviewItems.map((ri) => ({
          type: ri.type as "exaggeration" | "fact_mismatch" | "spam" | "cta",
          message: ri.message,
          status: ri.status,
        })),
        status: "draft",
        lastSaved: now,
      });
    } else {
      const id = addEmail({
        accountId: selectedAccount?.id ?? "",
        contactId: selectedContact?.id ?? "",
        subject,
        body,
        tone,
        length,
        reviewStatus: overallReview,
        reviewItems: reviewItems.map((ri) => ({
          type: ri.type as "exaggeration" | "fact_mismatch" | "spam" | "cta",
          message: ri.message,
          status: ri.status,
        })),
        personalizationPoints: existingDraft?.personalizationPoints || [],
        status: "draft",
      });
      setDraftId(id);
    }
    setLastSaved(now);
    showToast("초안이 저장되었습니다");
  };

  const handleRequestApproval = () => {
    if (draftId) {
      updateEmail(draftId, { status: "pending_approval" });
    } else {
      const id = addEmail({
        accountId: selectedAccount?.id ?? "",
        contactId: selectedContact?.id ?? "",
        subject,
        body,
        tone,
        length,
        reviewStatus: overallReview,
        reviewItems: reviewItems.map((ri) => ({
          type: ri.type as "exaggeration" | "fact_mismatch" | "spam" | "cta",
          message: ri.message,
          status: ri.status,
        })),
        personalizationPoints: existingDraft?.personalizationPoints || [],
        status: "pending_approval",
      });
      setDraftId(id);
    }
    setStatus("pending_approval");
    showToast("승인 요청이 등록되었습니다");
  };

  const handleScheduleSend = () => {
    if (draftId) {
      sendEmailAction(draftId);
    }
    setShowScheduleModal(false);
    setStatus("scheduled");
    showToast("발송이 예약되었습니다");
  };

  if (!selectedAccount && !selectedContact) {
    return (
      <div className="space-y-6">
        <PageHeader title="메일 작성" description="AI가 생성한 콜드메일을 검토하고 수정하세요" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-24 shadow-sm">
          <div className="rounded-full bg-gray-100 p-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">회사와 담당자를 선택하세요</h3>
          <p className="mt-1.5 max-w-sm text-center text-sm text-gray-500">
            계정 관리 또는 담당자 관리 페이지에서 회사와 담당자를 선택한 후 메일 작성으로 이동하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="메일 작성" description="AI가 생성한 콜드메일을 검토하고 수정하세요" />

      <div className="grid gap-6 lg:grid-cols-[35%_1fr]">
        <div className="space-y-4">
          {selectedAccount && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900">선택된 회사</h3>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-base font-bold text-gray-900">{selectedAccount.name}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>{selectedAccount.industry}</span>
                  <span>·</span>
                  <span>{selectedAccount.size}</span>
                  <span>·</span>
                  <span>{selectedAccount.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScoreBadge score={selectedAccount.aiScore} size="sm" />
                  <StatusBadge type="lead" value={selectedAccount.status} />
                </div>
                {selectedAccount.recentSignals.slice(0, 3).map((sig) => (
                  <div key={sig.id} className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    {sig.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedContact && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900">선택된 담당자</h3>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-base font-bold text-gray-900">{selectedContact.name}</p>
                <p className="text-sm text-gray-500">{selectedContact.title} · {selectedContact.department}</p>
                <StatusBadge type="role" value={selectedContact.role} />
                <p className="text-xs text-gray-600">{selectedContact.recommendedApproach}</p>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-900">개인화 포인트</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {(existingDraft?.personalizationPoints || ["최근 사업 확장", "디지털 전환 추진", "영업 조직 확대"]).map(
                (point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {point}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold text-gray-900">주의 사항</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                과장된 수치 사용 금지
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                검증되지 않은 사실 포함 주의
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                스팸 필터 유발 표현 자제
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-4">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                AI 재생성
              </button>
              <div className="flex rounded-lg border border-gray-200">
                {(["short", "medium", "detailed"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`px-3 py-1.5 text-xs font-medium ${
                      length === l ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    } ${l === "short" ? "rounded-l-lg" : ""} ${l === "detailed" ? "rounded-r-lg" : ""}`}
                  >
                    {l === "short" ? "짧게" : l === "medium" ? "보통" : "자세히"}
                  </button>
                ))}
              </div>
              <div className="flex rounded-lg border border-gray-200">
                {(["formal", "concise", "friendly"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 text-xs font-medium ${
                      tone === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    } ${t === "formal" ? "rounded-l-lg" : ""} ${t === "friendly" ? "rounded-r-lg" : ""}`}
                  >
                    {t === "formal" ? "정중" : t === "concise" ? "간결" : "친근"}
                  </button>
                ))}
              </div>
              {lastSaved && (
                <span className="ml-auto text-xs text-gray-400">마지막 저장: {lastSaved}</span>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">제목</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="이메일 제목을 입력하세요..."
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">본문</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={14}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm leading-relaxed focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">검수 결과</h3>
              <StatusBadge type="review" value={overallReview} />
            </div>
            <div className="mt-3 space-y-2">
              {reviewItems.map((item, i) => {
                const icon =
                  item.status === "safe" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  );
                return (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    {icon}
                    <div>
                      <p className="text-xs font-medium text-gray-700">{item.type}</p>
                      <p className="text-xs text-gray-500">{item.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Save className="h-4 w-4" /> 임시 저장
            </button>
            <button
              onClick={handleRequestApproval}
              disabled={status === "pending_approval"}
              className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Clock className="h-4 w-4" />
              {status === "pending_approval" ? "승인 대기중" : "승인 요청"}
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Send className="h-4 w-4" /> 발송 예약
            </button>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">발송 예약</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">날짜</label>
                <input type="date" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">시간</label>
                <input type="time" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleScheduleSend}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                예약 확인
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <p className="text-sm font-medium text-gray-900">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmailStudioPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <EmailStudioContent />
    </Suspense>
  );
}
