"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  className?: string;
}

export function KpiCard({ title, value, change, icon: Icon, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={cn("mt-1 text-xs font-medium", change >= 0 ? "text-gray-900" : "text-gray-500")}>
              {change >= 0 ? "+" : ""}
              {change}% vs 지난주
            </p>
          )}
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5 text-gray-500">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
