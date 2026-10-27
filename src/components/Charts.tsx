"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { students, courses, getAvgScore, isAtRisk, getRiskLevel } from "@/data/mockStudents";

const tooltipStyle = {
  backgroundColor: "#1f2937",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#f9fafb",
};

const cardClass = "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5";

export function CourseBarChart() {
  const data = courses.map((course) => ({
    name: course.split(" ").slice(0, 2).join(" "),
    fullName: course,
    শিক্ষার্থী: students.filter((s) => s.course === course).length,
    ঝুঁকিপূর্ণ: students.filter((s) => s.course === course && isAtRisk(s)).length,
  }));

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-white mb-4">📚 কোর্সভিত্তিক শিক্ষার্থী সংখ্যা</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          <Bar dataKey="শিক্ষার্থী" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="ঝুঁকিপূর্ণ" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskPieChart() {
  const high = students.filter((s) => getRiskLevel(s) === "high").length;
  const medium = students.filter((s) => getRiskLevel(s) === "medium").length;
  const low = students.filter((s) => getRiskLevel(s) === "low").length;

  const data = [
    { name: "নিরাপদ (Low)", value: low, color: "#22c55e" },
    { name: "মধ্যম ঝুঁকি (Medium)", value: medium, color: "#f59e0b" },
    { name: "উচ্চ ঝুঁকি (High)", value: high, color: "#ef4444" },
  ];

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-white mb-4">⚠️ ঝুঁকির স্তর বিতরণ</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AttendanceBarChart() {
  const ranges = [
    { label: "০-৪৯%", min: 0, max: 49 },
    { label: "৫০-৫৯%", min: 50, max: 59 },
    { label: "৬০-৭৪%", min: 60, max: 74 },
    { label: "৭৫-৮৪%", min: 75, max: 84 },
    { label: "৮৫-১০০%", min: 85, max: 100 },
  ];

  const data = ranges.map((r) => ({
    name: r.label,
    count: students.filter((s) => s.attendance >= r.min && s.attendance <= r.max).length,
    color: r.min < 75 ? "#ef4444" : "#22c55e",
  }));

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-white mb-4">📅 উপস্থিতি বিতরণ</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="count" name="শিক্ষার্থী" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScoreLineChart() {
  const sorted = [...students].sort((a, b) => getAvgScore(b) - getAvgScore(a));
  const data = sorted.map((s, i) => ({
    name: `S${i + 1}`,
    গড়নম্বর: getAvgScore(s),
    উপস্থিতি: s.attendance,
  }));

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-white mb-4">📈 নম্বর ও উপস্থিতির তুলনা</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          <Line type="monotone" dataKey="গড়নম্বর" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="উপস্থিতি" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CourseRadarChart() {
  const data = courses.map((course) => {
    const group = students.filter((s) => s.course === course);
    return {
      course: course.split(" ").slice(0, 2).join(" "),
      উপস্থিতি: Math.round(group.reduce((a, s) => a + s.attendance, 0) / group.length),
      মিডটার্ম: Math.round(group.reduce((a, s) => a + s.midterm, 0) / group.length),
      ফাইনাল: Math.round(group.reduce((a, s) => a + s.final, 0) / group.length),
    };
  });

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-white mb-4">🎯 কোর্সভিত্তিক পারফরম্যান্স</h3>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="course" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 9 }} />
          <Radar name="উপস্থিতি" dataKey="উপস্থিতি" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
          <Radar name="মিডটার্ম" dataKey="মিডটার্ম" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
          <Radar name="ফাইনাল" dataKey="ফাইনাল" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
