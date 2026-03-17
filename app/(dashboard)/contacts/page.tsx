"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Users, Mail, FileText, Building2, X, Plus, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Contact, ContactRole } from "@/lib/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import { PageHeader } from "@/components/shared/page-header";

const roleTabs: { value: ContactRole | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "decision_maker", label: "의사결정권자" },
  { value: "influencer", label: "영향자" },
  { value: "practitioner", label: "실무자" },
  { value: "unknown", label: "미분류" },
];

const roleOptions: { value: ContactRole; label: string }[] = [
  { value: "decision_maker", label: "의사결정권자" },
  { value: "influencer", label: "영향자" },
  { value: "practitioner", label: "실무자" },
  { value: "unknown", label: "미분류" },
];

function ContactsContent() {
  const searchParams = useSearchParams();
  const accountIdFilter = searchParams.get("accountId");

  const contacts = useAppStore((s) => s.contacts);
  const accounts = useAppStore((s) => s.accounts);
  const addContact = useAppStore((s) => s.addContact);
  const deleteContact = useAppStore((s) => s.deleteContact);

  const [search, setSearch] = useState("");
  const [roleTab, setRoleTab] = useState<ContactRole | "all">("all");
  const [companyFilter, setCompanyFilter] = useState(accountIdFilter ?? "all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<ContactRole>("unknown");
  const [newAccountId, setNewAccountId] = useState("");

  const companies = useMemo(() => {
    const names = Array.from(new Set(contacts.map((c) => c.accountName)));
    return names.sort();
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.title.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleTab === "all" || c.role === roleTab;
      const matchCompany =
        companyFilter === "all" ||
        c.accountId === companyFilter ||
        c.accountName === companyFilter;
      return matchSearch && matchRole && matchCompany;
    });
  }, [search, roleTab, companyFilter, contacts]);

  const resetForm = () => {
    setNewName("");
    setNewTitle("");
    setNewDepartment("");
    setNewEmail("");
    setNewRole("unknown");
    setNewAccountId("");
  };

  const handleCreateContact = () => {
    if (!newName.trim() || !newAccountId) return;
    const account = accounts.find((a) => a.id === newAccountId);
    addContact({
      accountId: newAccountId,
      accountName: account?.name ?? "",
      name: newName.trim(),
      title: newTitle.trim(),
      department: newDepartment.trim(),
      email: newEmail.trim(),
      role: newRole,
      aiConfidence: 50,
      emailStatus: "unverified",
      recommendedApproach: "",
      recommendedFirstLine: "",
    });
    resetForm();
    setShowCreateModal(false);
  };

  const handleDeleteContact = (id: string) => {
    if (selectedContact?.id === id) setSelectedContact(null);
    deleteContact(id);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="담당자 관리" description="의사결정권자와 영향자를 역할별로 탐색하세요" />

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="이름 또는 직책 검색..." className="w-64" />
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">전체 회사</option>
            {companies.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            담당자 추가
          </button>
        </div>
      </div>

      <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1">
        {roleTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setRoleTab(tab.value)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              roleTab === tab.value
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-2 text-sm text-gray-500">
            총 <strong className="text-gray-900">{filteredContacts.length}</strong>명
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                  selectedContact?.id === contact.id ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge type="role" value={contact.role} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteContact(contact.id);
                      }}
                      className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      title="삭제"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <Building2 className="h-3 w-3" />
                  <span>{contact.accountName}</span>
                  <span className="text-gray-300">·</span>
                  <span>{contact.department}</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>AI 신뢰도</span>
                    <span className="font-medium text-gray-700">{contact.aiConfidence}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${contact.aiConfidence}%` }}
                    />
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-xs text-gray-600">{contact.recommendedApproach}</p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/accounts/${contact.accountId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
                  >
                    회사 상세
                  </Link>
                  <Link
                    href={`/email-studio?accountId=${contact.accountId}&contactId=${contact.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                  >
                    메일 작성
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedContact && (
          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">프로필 상세</h3>
                <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">{selectedContact.name}</p>
                  <p className="text-sm text-gray-500">{selectedContact.title}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <StatusBadge type="role" value={selectedContact.role} />
                  </div>
                </div>
                <hr className="border-gray-100" />
                <div>
                  <p className="text-xs font-medium text-gray-500">회사</p>
                  <p className="mt-0.5 text-sm text-gray-900">{selectedContact.accountName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">부서</p>
                  <p className="mt-0.5 text-sm text-gray-900">{selectedContact.department}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">이메일</p>
                  <p className="mt-0.5 text-sm text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">AI 신뢰도</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${selectedContact.aiConfidence}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{selectedContact.aiConfidence}%</span>
                  </div>
                </div>
                <hr className="border-gray-100" />
                <div>
                  <p className="text-xs font-medium text-gray-500">추천 접근법</p>
                  <p className="mt-1 text-sm text-gray-700">{selectedContact.recommendedApproach}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">추천 첫 문장</p>
                  <p className="mt-1 text-sm italic text-gray-600">&ldquo;{selectedContact.recommendedFirstLine}&rdquo;</p>
                </div>
                <Link
                  href={`/email-studio?accountId=${selectedContact.accountId}&contactId=${selectedContact.id}`}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4" /> 메일 작성하기
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">담당자 추가</h3>
              <button onClick={() => { setShowCreateModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">이름 *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="홍길동"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">직책</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="부장"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">부서</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="영업팀"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">이메일</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">역할</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as ContactRole)}
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {roleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">회사 *</label>
                  <select
                    value={newAccountId}
                    onChange={(e) => setNewAccountId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">회사 선택</option>
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowCreateModal(false); resetForm(); }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleCreateContact}
                disabled={!newName.trim() || !newAccountId}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <ContactsContent />
    </Suspense>
  );
}
