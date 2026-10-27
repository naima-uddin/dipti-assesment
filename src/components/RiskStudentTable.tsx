"use client";

import { students, getAvgScore, getRiskLevel } from "@/data/mockStudents";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { clsx } from "clsx";

const riskConfig = {
  high: {
    label: "উচ্চ ঝুঁকি",
    rowBg: "bg-red-500/10",
    badge: "bg-red-500/20 text-red-300 border border-red-500/30",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  medium: {
    label: "মধ্যম ঝুঁকি",
    rowBg: "bg-yellow-500/10",
    badge: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  low: {
    label: "নিরাপদ",
    rowBg: "",
    badge: "bg-green-500/20 text-green-300 border border-green-500/30",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
};

export default function RiskStudentTable() {
  const sorted = [...students].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[getRiskLevel(a)] - order[getRiskLevel(b)];
  });

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-white">🎓 শিক্ষার্থী পারফরম্যান্স টেবিল</h3>
        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          মোট {students.length} জন
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["ID", "নাম", "কোর্স", "উপস্থিতি", "মিডটার্ম", "ফাইনাল", "গড়", "অবস্থা"].map((h) => (
                <th key={h} className="text-left text-gray-400 font-medium py-3 px-3 text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => {
              const risk = getRiskLevel(s);
              const cfg = riskConfig[risk];
              const avg = getAvgScore(s);
              return (
                <tr key={s.id} className={clsx("border-b border-white/5 transition-colors hover:bg-white/5", cfg.rowBg)}>
                  <td className="py-3 px-3 text-gray-500 font-mono text-xs">{s.id}</td>
                  <td className="py-3 px-3 text-white font-medium">{s.name}</td>
                  <td className="py-3 px-3 text-gray-400 text-xs max-w-[120px] truncate">{s.course}</td>
                  <td className="py-3 px-3">
                    <span className={clsx("text-xs font-semibold", s.attendance < 75 ? "text-red-400" : "text-green-400")}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={clsx("text-xs", s.midterm < 50 ? "text-red-400" : "text-gray-300")}>
                      {s.midterm}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={clsx("text-xs", s.final < 50 ? "text-red-400" : "text-gray-300")}>
                      {s.final}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 w-16">
                        <div
                          className={clsx("h-1.5 rounded-full", avg >= 70 ? "bg-green-500" : avg >= 50 ? "bg-yellow-500" : "bg-red-500")}
                          style={{ width: `${avg}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300 w-6">{avg}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={clsx("flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit", cfg.badge)}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
