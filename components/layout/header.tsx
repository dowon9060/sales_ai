"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Search, User, Settings, LogOut } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "대시보드",
  "/accounts": "계정 관리",
  "/contacts": "담당자 관리",
  "/email-studio": "메일 작성",
  "/campaigns": "캠페인",
  "/insights": "인사이트",
  "/settings": "설정",
};

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentPage =
    Object.entries(pageTitles).find(([path]) => pathname.startsWith(path))?.[1] ?? "대시보드";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400">SalesAI</span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-900">{currentPage}</span>
      </div>

      <div className="flex items-center gap-3">
        {searchOpen ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder="회사, 담당자, 캠페인 검색..."
              className="h-8 w-64 rounded-lg border border-gray-200 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <Search className="h-4 w-4" />
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">알림</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-800">그린텍제조에서 답장이 도착했습니다</p>
                  <p className="mt-0.5 text-xs text-blue-600">5분 전</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-sm font-medium text-green-800">원스톱HR 미팅이 확정되었습니다</p>
                  <p className="mt-0.5 text-xs text-green-600">1시간 전</p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-sm font-medium text-orange-800">승인 대기 메일이 3건 있습니다</p>
                  <p className="mt-0.5 text-xs text-orange-600">2시간 전</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
              김
            </div>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="h-4 w-4" />
                내 프로필
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="h-4 w-4" />
                팀 설정
              </button>
              <hr className="my-1 border-gray-100" />
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
