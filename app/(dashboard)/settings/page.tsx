"use client";

import { useState, useCallback } from "react";
import { Save, Plus, X, CheckCircle, Trash2, Edit2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { PageHeader } from "@/components/shared/page-header";

const tabs = [
  { id: "general", label: "기본 설정" },
  { id: "templates", label: "메일 템플릿" },
  { id: "compliance", label: "검수 규칙" },
  { id: "approval", label: "승인 정책" },
  { id: "team", label: "팀원 관리" },
];

export default function SettingsPage() {
  const templates = useAppStore((s) => s.templates);
  const addTemplate = useAppStore((s) => s.addTemplate);
  const updateTemplate = useAppStore((s) => s.updateTemplate);
  const deleteTemplate = useAppStore((s) => s.deleteTemplate);
  const bannedExpressions = useAppStore((s) => s.bannedExpressions);
  const setBannedExpressions = useAppStore((s) => s.setBannedExpressions);
  const teamMembers = useAppStore((s) => s.teamMembers);
  const addTeamMember = useAppStore((s) => s.addTeamMember);
  const updateTeamMember = useAppStore((s) => s.updateTeamMember);
  const deleteTeamMember = useAppStore((s) => s.deleteTeamMember);

  const [activeTab, setActiveTab] = useState("general");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // General
  const [brandName, setBrandName] = useState("SalesAI");
  const [senderName, setSenderName] = useState("김영수");
  const [signature, setSignature] = useState("김영수 | 영업팀 리드\nSalesAI\nys.kim@company.com");

  // Templates
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? "");
  const [editingTemplate, setEditingTemplate] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTmplName, setNewTmplName] = useState("");
  const [newTmplSubject, setNewTmplSubject] = useState("");
  const [newTmplBody, setNewTmplBody] = useState("");
  const [newTmplCategory, setNewTmplCategory] = useState("초기 접촉");

  // Compliance
  const [newBannedWord, setNewBannedWord] = useState("");

  // Approval
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [approver, setApprover] = useState(() => {
    const mgr = teamMembers.find((m) => m.role !== "member");
    return mgr?.name ?? "";
  });

  // Team member add
  const [showNewMember, setShowNewMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"admin" | "manager" | "member">("member");

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const addBannedWord = () => {
    if (newBannedWord.trim() && !bannedExpressions.includes(newBannedWord.trim())) {
      setBannedExpressions([...bannedExpressions, newBannedWord.trim()]);
      setNewBannedWord("");
      showToast("금지 표현이 추가되었습니다");
    }
  };

  const removeBannedWord = (word: string) => {
    setBannedExpressions(bannedExpressions.filter((w) => w !== word));
  };

  const startEditTemplate = () => {
    if (!selectedTemplate) return;
    setEditName(selectedTemplate.name);
    setEditSubject(selectedTemplate.subject);
    setEditBody(selectedTemplate.body);
    setEditCategory(selectedTemplate.category);
    setEditingTemplate(true);
  };

  const saveEditTemplate = () => {
    if (!selectedTemplate) return;
    updateTemplate(selectedTemplate.id, {
      name: editName,
      subject: editSubject,
      body: editBody,
      category: editCategory,
    });
    setEditingTemplate(false);
    showToast("템플릿이 수정되었습니다");
  };

  const handleAddTemplate = () => {
    if (!newTmplName.trim()) return;
    const id = addTemplate({
      name: newTmplName.trim(),
      subject: newTmplSubject.trim(),
      body: newTmplBody.trim(),
      category: newTmplCategory,
    });
    setSelectedTemplateId(id);
    setShowNewTemplate(false);
    setNewTmplName("");
    setNewTmplSubject("");
    setNewTmplBody("");
    setNewTmplCategory("초기 접촉");
    showToast("템플릿이 추가되었습니다");
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
    if (selectedTemplateId === id) {
      const remaining = templates.filter((t) => t.id !== id);
      setSelectedTemplateId(remaining[0]?.id ?? "");
    }
    showToast("템플릿이 삭제되었습니다");
  };

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    addTeamMember({
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      role: newMemberRole,
      status: "active",
    });
    setShowNewMember(false);
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberRole("member");
    showToast("팀원이 추가되었습니다");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="설정" description="운영 정책, 템플릿, 금지 표현, 승인 정책을 관리하세요" />

      <div className="flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">기본 설정</h2>
          <div className="mt-6 max-w-lg space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">브랜드명</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">기본 발신자명</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">기본 서명</label>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => showToast("설정이 저장되었습니다")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save className="h-4 w-4" /> 저장
            </button>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-900">템플릿 목록</h3>
            </div>
            <div className="space-y-1 p-2">
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="group flex items-center gap-1">
                  <button
                    onClick={() => {
                      setSelectedTemplateId(tmpl.id);
                      setEditingTemplate(false);
                    }}
                    className={`flex-1 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      selectedTemplateId === tmpl.id ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <p className="text-sm font-medium">{tmpl.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{tmpl.category}</p>
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(tmpl.id)}
                    className="rounded p-1 text-gray-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={() => setShowNewTemplate(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600"
              >
                <Plus className="h-4 w-4" /> 템플릿 추가
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {showNewTemplate ? (
              <>
                <h3 className="text-base font-semibold text-gray-900">새 템플릿 추가</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">이름</label>
                    <input
                      type="text"
                      value={newTmplName}
                      onChange={(e) => setNewTmplName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="템플릿 이름"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">카테고리</label>
                    <input
                      type="text"
                      value={newTmplCategory}
                      onChange={(e) => setNewTmplCategory(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">제목 템플릿</label>
                    <input
                      type="text"
                      value={newTmplSubject}
                      onChange={(e) => setNewTmplSubject(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">본문 템플릿</label>
                    <textarea
                      value={newTmplBody}
                      onChange={(e) => setNewTmplBody(e.target.value)}
                      rows={6}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="본문을 입력하세요"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddTemplate}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4" /> 저장
                    </button>
                    <button
                      onClick={() => setShowNewTemplate(false)}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </>
            ) : selectedTemplate ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{selectedTemplate.name}</h3>
                  {!editingTemplate && (
                    <button
                      onClick={startEditTemplate}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Edit2 className="h-3.5 w-3.5" /> 수정
                    </button>
                  )}
                </div>
                {editingTemplate ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">이름</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">카테고리</label>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">제목 템플릿</label>
                      <input
                        type="text"
                        value={editSubject}
                        onChange={(e) => setEditSubject(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">본문 템플릿</label>
                      <textarea
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        rows={6}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEditTemplate}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4" /> 저장
                      </button>
                      <button
                        onClick={() => setEditingTemplate(false)}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">카테고리</label>
                      <p className="mt-0.5 text-sm text-gray-700">{selectedTemplate.category}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">제목 템플릿</label>
                      <div className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{selectedTemplate.subject}</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">본문 템플릿</label>
                      <div className="mt-1 whitespace-pre-line rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
                        {selectedTemplate.body}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="py-12 text-center text-sm text-gray-500">템플릿을 선택하세요</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "compliance" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">금지 표현 관리</h2>
            <p className="mt-1 text-sm text-gray-500">아래 표현이 이메일에 포함되면 검수 시 경고가 표시됩니다</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {bannedExpressions.map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm text-red-700"
                >
                  {word}
                  <button
                    onClick={() => removeBannedWord(word)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addBannedWord()}
                placeholder="금지 표현 추가..."
                className="h-9 rounded-lg border border-gray-200 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={addBannedWord}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                <Plus className="h-3.5 w-3.5" /> 추가
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">자동 검수 기준</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-100 p-4">
                <p className="text-sm font-medium text-gray-900">과장 표현 감지</p>
                <p className="mt-1 text-xs text-gray-500">금지 표현 목록에 해당하는 단어가 포함되면 경고</p>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <p className="text-sm font-medium text-gray-900">문장 길이 검사</p>
                <p className="mt-1 text-xs text-gray-500">100자 이상의 긴 문장이 있으면 주의 표시</p>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <p className="text-sm font-medium text-gray-900">스팸성 표현 감지</p>
                <p className="mt-1 text-xs text-gray-500">스팸 필터에 걸릴 수 있는 표현 자동 감지</p>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <p className="text-sm font-medium text-gray-900">CTA 적절성 확인</p>
                <p className="mt-1 text-xs text-gray-500">콜투액션이 포함되어 있는지 확인</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "approval" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">승인 정책</h2>
          <div className="mt-6 max-w-lg space-y-5">
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">승인 필수 여부</p>
                <p className="mt-0.5 text-xs text-gray-500">모든 메일 발송 전 승인자의 확인이 필요합니다</p>
              </div>
              <button
                onClick={() => setApprovalRequired(!approvalRequired)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  approvalRequired ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    approvalRequired ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {approvalRequired && (
              <div>
                <label className="text-sm font-medium text-gray-700">승인자</label>
                <select
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {teamMembers
                    .filter((m) => m.role !== "member")
                    .map((m) => (
                      <option key={m.id} value={m.name}>{m.name} ({m.role === "admin" ? "관리자" : "팀장"})</option>
                    ))}
                </select>
              </div>
            )}
            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-sm font-medium text-gray-900">승인 프로세스</p>
              <ol className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">1</span>
                  영업 담당자가 메일 초안 작성
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">2</span>
                  AI 자동 검수 실행
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">3</span>
                  승인자에게 승인 요청
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">4</span>
                  승인 후 발송 예약 또는 즉시 발송
                </li>
              </ol>
            </div>
            <button
              onClick={() => showToast("승인 정책이 저장되었습니다")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save className="h-4 w-4" /> 저장
            </button>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">팀원 관리</h2>
            <button
              onClick={() => setShowNewMember(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> 팀원 추가
            </button>
          </div>

          {showNewMember && (
            <div className="border-b border-gray-100 bg-blue-50/30 px-5 py-4">
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">이름</label>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="mt-1 block w-40 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="이름"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">이메일</label>
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="mt-1 block w-56 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">역할</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as "admin" | "manager" | "member")}
                    className="mt-1 block w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="member">팀원</option>
                    <option value="manager">팀장</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
                <button
                  onClick={handleAddMember}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  추가
                </button>
                <button
                  onClick={() => setShowNewMember(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                  <th className="px-5 py-3">이름</th>
                  <th className="px-5 py-3">이메일</th>
                  <th className="px-5 py-3">역할</th>
                  <th className="px-5 py-3">상태</th>
                  <th className="px-5 py-3">액션</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                          {member.name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{member.email}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          member.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : member.role === "manager"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.role === "admin" ? "관리자" : member.role === "manager" ? "팀장" : "팀원"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          member.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {member.status === "active" ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => deleteTeamMember(member.id)}
                        className="rounded p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <p className="text-sm font-medium text-gray-900">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
