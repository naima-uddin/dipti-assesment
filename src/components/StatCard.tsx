"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; label: string };
  color?: "blue" | "violet" | "green" | "red" | "yellow" | "orange";
};

const colorMap = {
  blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
  violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
  green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
  red: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
  yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400",
  orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400",
};

const iconBg = {
  blue: "bg-blue-500/20 text-blue-400",
  violet: "bg-violet-500/20 text-violet-400",
  green: "bg-green-500/20 text-green-400",
  red: "bg-red-500/20 text-red-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  orange: "bg-orange-500/20 text-orange-400",
};

export default function StatCard({ title, value, subtitle, icon, trend, color = "blue" }: Props) {
  return (
    <div className={clsx(
      "rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
      colorMap[color]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={clsx("p-2.5 rounded-xl", iconBg[color])}>
          {icon}
        </div>
        {trend && (
          <span className={clsx(
            "text-xs px-2 py-1 rounded-full",
            trend.value >= 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
          )}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-300">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
