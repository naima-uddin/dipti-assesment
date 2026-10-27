"use client";

import { useState, Fragment } from "react";
import { students, getAvgScore, getRiskLevel, isAtRisk, courses } from "@/data/mockStudents";
import { Search, Filter, Users, ChevronDown, ChevronUp, Mail, Phone, Calendar, BookOpen, Bot } from "lucide-react";
import { clsx } from "clsx";

const riskConfig = {
  high: { label: "উচ্চ ঝুঁকি", badge: "bg-red-500/20 text-red-300 border border-red-500/30", dot: "bg-red-500" },
  medium: { label: "মধ্যম ঝুঁকি", badge: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30", dot: "bg-yellow-500" },
  low: { label: "নিরাপদ", badge: "bg-green-500/20 text-green-300 border border-green-500/30", dot: "bg-green-500" },
};

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "attendance" | "score">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = students
    .filter((s) => {
      const matchSearch =
        s.name.includes(search) ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.course.toLowerCase().includes(search.toLowerCase());
      const matchCourse = selectedCourse === "all" || s.course === selectedCourse;
      const matchRisk = selectedRisk === "all" || getRiskLevel(s) === selectedRisk;
      return matchSearch && matchCourse && matchRisk;
    })
    .sort((a, b) => {
      let valA: number | string = a.name;
      let valB: number | string = b.name;
      if (sortBy === "attendance") { valA = a.attendance; valB = b.attendance; }
      if (sortBy === "score") { valA = getAvgScore(a); valB = getAvgScore(b); }
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDir === "asc" ? valA - valB : valB - valA;
      }
      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortBtn = ({ col, label }: { col: typeof sortBy; label: string }) => (
    <button
      onClick={() => toggleSort(col)}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {label}
      <span className="text-gray-600">{sortBy === col ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}</span>
    </button>
  );

  // Summary counts
  const highRiskCount = students.filter((s) => getRiskLevel(s) === "high").length;
  const mediumRiskCount = students.filter((s) => getRiskLevel(s) === "medium").length;
  const safeCount = students.filter((s) => getRiskLevel(s) === "low").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-400" />
            শিক্ষার্থী ব্যবস্থাপনা
          </h1>
          <p className="text-gray-400 text-sm mt-1">সকল শিক্ষার্থীর বিস্তারিত তথ্য ও পারফরম্যান্স</p>
        </div>
      </div>

      {/* Quick Summary Pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "মোট শিক্ষার্থী", value: students.length, color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
          { label: "নিরাপদ", value: safeCount, color: "bg-green-500/15 text-green-300 border-green-500/30" },
          { label: "মধ্যম ঝুঁকি", value: mediumRiskCount, color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30" },
          { label: "উচ্চ ঝুঁকি", value: highRiskCount, color: "bg-red-500/15 text-red-300 border-red-500/30" },
        ].map((item) => (
          <div key={item.label} className={clsx("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium", item.color)}>
            <span className="font-bold text-base">{item.value}</span>
            <span className="opacity-80">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম, ID বা কোর্স দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-gray-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
          >
            <option value="all">📚 সকল কোর্স</option>
            {courses.map((c) => (
              <option key={c} value={c} className="bg-gray-800">{c}</option>
            ))}
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-gray-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
          >
            <option value="all">⚡ সব স্তর</option>
            <option value="high" className="bg-gray-800">🔴 উচ্চ ঝুঁকি</option>
            <option value="medium" className="bg-gray-800">🟡 মধ্যম ঝুঁকি</option>
            <option value="low" className="bg-gray-800">🟢 নিরাপদ</option>
          </select>

          {(search || selectedCourse !== "all" || selectedRisk !== "all") && (
            <button
              onClick={() => { setSearch(""); setSelectedCourse("all"); setSelectedRisk("all"); }}
              className="px-3 py-2 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              ✕ ক্লিয়ার
            </button>
          )}
        </div>

        <span className="text-xs text-gray-500 ml-auto bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {filtered.length} / {students.length} জন
        </span>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/3">
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">ID</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">
                <SortBtn col="name" label="নাম" />
              </th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">কোর্স</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">ব্যাচ</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">
                <SortBtn col="attendance" label="উপস্থিতি" />
              </th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">মিডটার্ম</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">ফাইনাল</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">
                <SortBtn col="score" label="গড় স্কোর" />
              </th>
              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">অবস্থা</th>
              <th className="py-3 px-4 text-xs" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const risk = getRiskLevel(s);
              const cfg = riskConfig[risk];
              const avg = getAvgScore(s);
              const expanded = expandedId === s.id;

              return (
                <Fragment key={s.id}>
                  <tr
                    className={clsx(
                      "border-b border-white/5 transition-all duration-200 cursor-pointer",
                      expanded ? "bg-blue-500/10" : "hover:bg-white/5"
                    )}
                    onClick={() => setExpandedId(expanded ? null : s.id)}
                  >
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">{s.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={clsx("w-2 h-2 rounded-full shrink-0", cfg.dot)} />
                        <span className="text-white font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-400 text-xs bg-white/5 px-2 py-1 rounded-lg">
                        {s.course.split(" ").slice(0, 2).join(" ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{s.batch}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-white/10 rounded-full h-1.5">
                          <div
                            className={clsx("h-1.5 rounded-full transition-all", s.attendance >= 75 ? "bg-green-500" : "bg-red-500")}
                            style={{ width: `${s.attendance}%` }}
                          />
                        </div>
                        <span className={clsx("text-xs font-semibold w-8", s.attendance < 75 ? "text-red-400" : "text-green-400")}>
                          {s.attendance}%
                        </span>
                        {s.attendance < 75 && <span className="text-red-500 text-xs">⚠</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={clsx("text-xs font-medium px-2 py-0.5 rounded", s.midterm < 50 ? "bg-red-500/20 text-red-300" : "text-gray-300")}>
                        {s.midterm}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={clsx("text-xs font-medium px-2 py-0.5 rounded", s.final < 50 ? "bg-red-500/20 text-red-300" : "text-gray-300")}>
                        {s.final}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 bg-white/10 rounded-full h-1.5">
                          <div
                            className={clsx("h-1.5 rounded-full", avg >= 70 ? "bg-blue-500" : avg >= 50 ? "bg-yellow-500" : "bg-red-500")}
                            style={{ width: `${avg}%` }}
                          />
                        </div>
                        <span className={clsx("text-xs font-bold", avg < 50 ? "text-red-400" : avg < 70 ? "text-yellow-400" : "text-blue-300")}>
                          {avg}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={clsx("text-xs px-2 py-1 rounded-full", cfg.badge)}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {expanded
                        ? <ChevronUp className="w-4 h-4 text-blue-400" />
                        : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expanded && (
                    <tr className="border-b border-white/5 bg-blue-500/5">
                      <td colSpan={10} className="px-6 py-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                            <div>
                              <p className="text-gray-500 text-xs">ইমেইল</p>
                              <p className="text-gray-200 text-xs">{s.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-400 shrink-0" />
                            <div>
                              <p className="text-gray-500 text-xs">ফোন</p>
                              <p className="text-gray-200 text-xs">{s.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-violet-400 shrink-0" />
                            <div>
                              <p className="text-gray-500 text-xs">ভর্তির তারিখ</p>
                              <p className="text-gray-200 text-xs">{s.enrollDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-yellow-400 shrink-0" />
                            <div>
                              <p className="text-gray-500 text-xs">অ্যাসাইনমেন্ট</p>
                              <p className="text-gray-200 text-xs font-semibold">{s.assignment}/100</p>
                            </div>
                          </div>
                        </div>

                        {/* Score breakdown */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {[
                            { label: "মিডটার্ম", value: s.midterm, color: s.midterm < 50 ? "text-red-400" : "text-green-400" },
                            { label: "ফাইনাল", value: s.final, color: s.final < 50 ? "text-red-400" : "text-green-400" },
                            { label: "অ্যাসাইনমেন্ট", value: s.assignment, color: s.assignment < 50 ? "text-red-400" : "text-green-400" },
                          ].map((item) => (
                            <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                              <p className={clsx("text-xl font-bold", item.color)}>{item.value}</p>
                              <p className="text-gray-500 text-xs mt-0.5">{item.label}</p>
                              <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                                <div
                                  className={clsx("h-1 rounded-full", item.value >= 70 ? "bg-green-500" : item.value >= 50 ? "bg-yellow-500" : "bg-red-500")}
                                  style={{ width: `${item.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Full course name */}
                        <p className="text-xs text-gray-500 mb-2">
                          📚 <span className="text-gray-300">{s.course}</span> — {s.batch}
                        </p>

                        {/* AI advice for at-risk */}
                        {isAtRisk(s) && (
                          <div className="flex items-start gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                            <Bot className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-violet-400 font-semibold mb-1">AI পরামর্শ বার্তা:</p>
                              <p className="text-sm text-gray-200 leading-relaxed">
                                {risk === "high"
                                  ? `${s.name.split(" ")[0]}, আপনার উপস্থিতি (${s.attendance}%) ও গড় নম্বর (${avg}) উভয়ই উদ্বেগজনক। অনুগ্রহ করে আজই মেন্টরের সাথে যোগাযোগ করুন।`
                                  : s.attendance < 75
                                  ? `${s.name.split(" ")[0]}, আপনার উপস্থিতি ${s.attendance}% — নিয়মিত ক্লাসে আসুন, নইলে সার্টিফিকেট ঝুঁকিতে পড়বে।`
                                  : `${s.name.split(" ")[0]}, আপনার গড় নম্বর ${avg}/100 — পরীক্ষার প্রস্তুতি বাড়ান এবং মেন্টরের সাথে extra session নিন।`}
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">কোনো শিক্ষার্থী পাওয়া যায়নি</p>
            <p className="text-xs mt-1 text-gray-600">অনুসন্ধান বা ফিল্টার পরিবর্তন করুন</p>
          </div>
        )}
      </div>
    </div>
  );
}
