"use client";

import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScoreBadge({ score, size = "md", className }: ScoreBadgeProps) {
  const colorClass = score >= 60
    ? "bg-gray-900 text-white border-gray-900"
    : "bg-gray-100 text-gray-500 border-gray-200";

  const sizeClass = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-0.5",
    lg: "text-base px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-semibold",
        colorClass,
        sizeClass[size],
        className
      )}
    >
      {score}
    </span>
  );
}
