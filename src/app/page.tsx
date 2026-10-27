"use client";

import { students, getAvgScore, isAtRisk, getRiskLevel } from "@/data/mockStudents";
import StatCard from "@/components/StatCard";
import {
  CourseBarChart,
  RiskPieChart,
  AttendanceBarChart,
  ScoreLineChart,
  CourseRadarChart,
} from "@/components/Charts";
import RiskStudentTable from "@/components/RiskStudentTable";
import {
  Users, UserCheck, UserX, BarChart2, TrendingUp, AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const total = students.length;
  const atRisk = students.filter(isAtRisk).length;
  const safe = total - atRisk;
  const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendance, 0) / total);
  const avgScore = Math.round(students.reduce((a, s) => a + getAvgScore(s), 0) / total);
  const highRisk = students.filter((s) => getRiskLevel(s) === "high").length;

  return (
    <div className="space-y-8">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            📊 Performance Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            DIPTI শিক্ষার্থীদের সামগ্রিক পারফরম্যান্স বিশ্লেষণ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500">সর্বশেষ আপডেট</p>
            <p className="text-sm text-gray-300 font-medium">
              {new Date().toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-300 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* ─── KPI Stats ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="মোট শিক্ষার্থী"
          value={total}
          subtitle="৫টি কোর্সে"
          icon={<Users className="w-5 h-5" />}
          color="blue"
          trend={{ value: 12, label: "এ মাসে" }}
        />
        <StatCard
          title="নিরাপদ"
          value={safe}
          subtitle="ভালো পারফরম্যান্স"
          icon={<UserCheck className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          title="ঝুঁকিপূর্ণ"
          value={atRisk}
          subtitle="মনোযোগ প্রয়োজন"
          icon={<UserX className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="উচ্চ ঝুঁকি"
          value={highRisk}
          subtitle="জরুরি ব্যবস্থা"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          title="গড় উপস্থিতি"
          value={`${avgAttendance}%`}
          subtitle={avgAttendance >= 75 ? "লক্ষ্যমাত্রা পূরণ" : "লক্ষ্যমাত্রার নিচে"}
          icon={<BarChart2 className="w-5 h-5" />}
          color="violet"
        />
        <StatCard
          title="গড় নম্বর"
          value={`${avgScore}/100`}
          subtitle="সকল কোর্স মিলিয়ে"
          icon={<TrendingUp className="w-5 h-5" />}
          color="yellow"
        />
      </div>

      {/* ─── Risk Alert Banner ─── */}
      {highRisk > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
          <div className="p-2.5 rounded-xl bg-red-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-red-300 font-semibold">
              ⚠️ {highRisk} জন শিক্ষার্থী উচ্চ ঝুঁকিতে আছে!
            </p>
            <p className="text-red-400/70 text-sm mt-0.5">
              উপস্থিতি ৭৫%-এর নিচে এবং গড় নম্বর ৫০%-এর কম — তাৎক্ষণিক Follow-up প্রয়োজন।
            </p>
          </div>
          <a
            href="/automation"
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors whitespace-nowrap shadow-lg shadow-red-500/25"
          >
            AI দিয়ে পদক্ষেপ নিন →
          </a>
        </div>
      )}

      {/* ─── Charts Row 1 ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseBarChart />
        <RiskPieChart />
      </div>

      {/* ─── Charts Row 2 ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttendanceBarChart />
        <ScoreLineChart />
        <CourseRadarChart />
      </div>

      {/* ─── Quick Insights ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: "📌",
            title: "সর্বোচ্চ ঝুঁকির কোর্স",
            value: (() => {
              const counts: Record<string, number> = {};
              students.filter(isAtRisk).forEach((s) => {
                counts[s.course] = (counts[s.course] || 0) + 1;
              });
              return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0].split(" ").slice(0, 3).join(" ") || "—";
            })(),
            color: "text-red-300",
          },
          {
            icon: "🏆",
            title: "সর্বোচ্চ উপস্থিতি",
            value: `${Math.max(...students.map((s) => s.attendance))}%`,
            color: "text-green-300",
          },
          {
            icon: "📈",
            title: "সর্বোচ্চ গড় নম্বর",
            value: `${Math.max(...students.map((s) => getAvgScore(s)))}/100`,
            color: "text-blue-300",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <p className="text-gray-500 text-xs">{item.title}</p>
              <p className={`text-lg font-bold mt-0.5 ${item.color}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Full Table ─── */}
      <RiskStudentTable />
    </div>
  );
}
