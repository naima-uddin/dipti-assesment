"use client";

import { useState } from "react";
import {
  students, getAvgScore, getRiskLevel, isAtRisk, generateAIMessage,
} from "@/data/mockStudents";
import {
  Bot, Play, CheckCircle2, Loader2, AlertTriangle, Clock,
  MessageSquare, ChevronDown, ChevronUp, Users, BarChart2,
  Zap, Database, BrainCircuit, Send, FileSpreadsheet,
} from "lucide-react";
import { clsx } from "clsx";

type StepStatus = "pending" | "running" | "success";

type WorkflowStep = {
  step: number;
  name: string;
  icon: React.ReactNode;
  status: StepStatus;
  message: string;
  detail: string;
};

type AtRiskStudent = {
  id: string;
  name: string;
  course: string;
  batch: string;
  attendance: number;
  avgScore: number;
  riskLevel: "high" | "medium" | "low";
  lowAttendance: boolean;
  lowScore: boolean;
  aiMessage: string;
};

const buildSteps = (): WorkflowStep[] => [
  { step: 1, name: "ডেটা লোড", icon: <Database className="w-4 h-4" />, status: "pending", message: "Student database থেকে ডেটা লোড হচ্ছে...", detail: `${students.length} জন শিক্ষার্থীর ডেটা সফলভাবে লোড হয়েছে` },
  { step: 2, name: "বিশ্লেষণ", icon: <BarChart2 className="w-4 h-4" />, status: "pending", message: "উপস্থিতি ও পরীক্ষার ফলাফল বিশ্লেষণ হচ্ছে...", detail: "উপস্থিতি ও পরীক্ষার ফলাফল বিশ্লেষণ সম্পন্ন" },
  { step: 3, name: "ঝুঁকি শনাক্ত", icon: <AlertTriangle className="w-4 h-4" />, status: "pending", message: "৭৫%< উপস্থিতি ও ৫০%< নম্বর পরীক্ষা হচ্ছে...", detail: `${students.filter(isAtRisk).length} জন ঝুঁকিপূর্ণ শিক্ষার্থী চিহ্নিত হয়েছে` },
  { step: 4, name: "AI বার্তা তৈরি", icon: <BrainCircuit className="w-4 h-4" />, status: "pending", message: "AI দিয়ে ব্যক্তিগতকৃত পরামর্শ বার্তা তৈরি হচ্ছে...", detail: `${students.filter(isAtRisk).length}টি AI-generated পরামর্শ বার্তা প্রস্তুত` },
  { step: 5, name: "নোটিফিকেশন", icon: <Send className="w-4 h-4" />, status: "pending", message: "Follow-up message পাঠানোর প্রস্তুতি হচ্ছে...", detail: `${students.filter(isAtRisk).length}টি Follow-up Message প্রস্তুত ও পাঠানো হয়েছে` },
  { step: 6, name: "রিপোর্ট সংরক্ষণ", icon: <FileSpreadsheet className="w-4 h-4" />, status: "pending", message: "ফলাফল Google Sheets-এ সংরক্ষণ হচ্ছে...", detail: "ফলাফল Google Sheets-এ সফলভাবে সংরক্ষণ হয়েছে ✓" },
];

const riskLabel: Record<string, string> = { high: "উচ্চ ঝুঁকি", medium: "মধ্যম ঝুঁকি", low: "নিরাপদ" };
const riskBadge: Record<string, string> = {
  high: "bg-red-500/20 text-red-300 border border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  low: "bg-green-500/20 text-green-300 border border-green-500/30",
};

export default function AutomationPage() {
  const [steps, setSteps] = useState<WorkflowStep[]>(buildSteps());
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<AtRiskStudent[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const atRiskStudents: AtRiskStudent[] = students.filter(isAtRisk).map((s) => ({
    id: s.id,
    name: s.name,
    course: s.course,
    batch: s.batch,
    attendance: s.attendance,
    avgScore: getAvgScore(s),
    riskLevel: getRiskLevel(s),
    lowAttendance: s.attendance < 75,
    lowScore: getAvgScore(s) < 50,
    aiMessage: generateAIMessage(s),
  }));

  const runWorkflow = async () => {
    setRunning(true);
    setDone(false);
    setResults([]);
    setExpandedId(null);
    setCurrentStep(0);
    const fresh = buildSteps();
    setSteps(fresh);

    for (let i = 0; i < fresh.length; i++) {
      setCurrentStep(i + 1);
      setSteps((prev) => prev.map((s, idx) => idx === i ? { ...s, status: "running" } : s));
      await new Promise((r) => setTimeout(r, 900));
      setSteps((prev) => prev.map((s, idx) => idx === i ? { ...s, status: "success", message: s.detail } : s));
    }

    setResults(atRiskStudents);
    setRunning(false);
    setDone(true);
    setCurrentStep(0);
  };

  const reset = () => {
    setSteps(buildSteps());
    setDone(false);
    setResults([]);
    setExpandedId(null);
    setCurrentStep(0);
  };

  const highCount = results.filter((s) => s.riskLevel === "high").length;
  const mediumCount = results.filter((s) => s.riskLevel === "medium").length;

  return (
    <div className="space-y-8">
      {/* ─── Header ─── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="w-7 h-7 text-violet-400" />
            AI Automation Workflow
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            স্বয়ংক্রিয়ভাবে ঝুঁকিপূর্ণ শিক্ষার্থী শনাক্ত করুন ও AI পরামর্শ বার্তা তৈরি করুন
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-xl font-bold text-white">{students.length}</p>
            <p className="text-xs text-gray-500">মোট শিক্ষার্থী</p>
          </div>
          <div className="text-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-xl font-bold text-red-400">{atRiskStudents.length}</p>
            <p className="text-xs text-gray-500">ঝুঁকিপূর্ণ</p>
          </div>
        </div>
      </div>

      {/* ─── How it works info ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "📊", title: "নিয়ম ১", desc: "উপস্থিতি < ৭৫%", color: "border-blue-500/30 bg-blue-500/5" },
          { icon: "📝", title: "নিয়ম ২", desc: "গড় নম্বর < ৫০%", color: "border-violet-500/30 bg-violet-500/5" },
          { icon: "🤖", title: "ফলাফল", desc: "AI Follow-up বার্তা", color: "border-green-500/30 bg-green-500/5" },
        ].map((item) => (
          <div key={item.title} className={clsx("rounded-xl border p-4 flex items-center gap-3", item.color)}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-white font-semibold text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Workflow Stepper ─── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" /> Automation Steps
          </h3>
          {running && (
            <span className="text-xs text-blue-300 bg-blue-500/15 border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" /> Step {currentStep} of {steps.length} চলছে...
            </span>
          )}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {steps.map((step) => (
            <div
              key={step.step}
              className={clsx(
                "relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-500",
                step.status === "success"
                  ? "bg-green-500/10 border-green-500/30 shadow-md shadow-green-500/10"
                  : step.status === "running"
                  ? "bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/20 scale-105"
                  : "bg-white/3 border-white/10"
              )}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                  step.status === "success"
                    ? "bg-green-500 text-white"
                    : step.status === "running"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-600"
                )}
              >
                {step.status === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : step.status === "running" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  step.icon
                )}
              </div>
              <p
                className={clsx(
                  "text-xs font-medium leading-tight",
                  step.status === "success"
                    ? "text-green-300"
                    : step.status === "running"
                    ? "text-blue-300"
                    : "text-gray-600"
                )}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700"
            style={{ width: `${(steps.filter((s) => s.status === "success").length / steps.length) * 100}%` }}
          />
        </div>

        {/* Step logs */}
        {steps.some((s) => s.status !== "pending") && (
          <div className="space-y-2 mb-5 max-h-40 overflow-y-auto">
            {steps.filter((s) => s.status !== "pending").map((step) => (
              <div
                key={step.step}
                className={clsx(
                  "flex items-center gap-3 text-xs px-3 py-2 rounded-xl",
                  step.status === "success"
                    ? "text-green-300 bg-green-500/10"
                    : "text-blue-300 bg-blue-500/10"
                )}
              >
                {step.status === "running" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{step.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={runWorkflow}
            disabled={running}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            {running ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {running ? "Workflow চলছে..." : "▶ Workflow চালান"}
          </button>
          {done && (
            <button
              onClick={reset}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all border border-white/10"
            >
              ↺ আবার চালান
            </button>
          )}
        </div>
      </div>

      {/* ─── Results ─── */}
      {done && results.length > 0 && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users className="w-5 h-5" />, label: "মোট ঝুঁকিপূর্ণ", value: results.length, color: "text-white", bg: "bg-white/5 border-white/10" },
              { icon: <AlertTriangle className="w-5 h-5" />, label: "উচ্চ ঝুঁকি", value: highCount, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
              { icon: <Clock className="w-5 h-5" />, label: "মধ্যম ঝুঁকি", value: mediumCount, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
              { icon: <MessageSquare className="w-5 h-5" />, label: "বার্তা প্রেরিত", value: results.length, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
            ].map((item) => (
              <div key={item.label} className={clsx("rounded-2xl p-4 border flex items-center gap-3", item.bg)}>
                <div className={item.color}>{item.icon}</div>
                <div>
                  <p className={clsx("text-2xl font-bold", item.color)}>{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Student AI Message Cards */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-violet-400" />
              AI-তৈরি Follow-up Messages
              <span className="ml-auto text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {results.length}টি বার্তা প্রস্তুত
              </span>
            </h3>

            {/* Group by risk */}
            {(["high", "medium"] as const).map((level) => {
              const group = results.filter((s) => s.riskLevel === level);
              if (group.length === 0) return null;
              return (
                <div key={level} className="mb-4">
                  <p className={clsx(
                    "text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2",
                    level === "high" ? "text-red-400" : "text-yellow-400"
                  )}>
                    {level === "high" ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {riskLabel[level]} ({group.length} জন)
                  </p>
                  <div className="space-y-2">
                    {group.map((s) => (
                      <div
                        key={s.id}
                        className={clsx(
                          "rounded-xl border transition-all",
                          level === "high"
                            ? "bg-red-500/5 border-red-500/20"
                            : "bg-yellow-500/5 border-yellow-500/20"
                        )}
                      >
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer"
                          onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                              level === "high" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"
                            )}>
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{s.name}</p>
                              <p className="text-gray-500 text-xs">{s.course.split(" ").slice(0, 3).join(" ")} · {s.batch}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                              {s.lowAttendance && (
                                <span className="text-red-400 text-xs block">উপস্থিতি: {s.attendance}%</span>
                              )}
                              {s.lowScore && (
                                <span className="text-red-400 text-xs block">গড়: {s.avgScore}/100</span>
                              )}
                            </div>
                            <span className={clsx("text-xs px-2 py-1 rounded-full hidden sm:inline", riskBadge[s.riskLevel])}>
                              {riskLabel[s.riskLevel]}
                            </span>
                            <div className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                              {expandedId === s.id
                                ? <ChevronUp className="w-4 h-4 text-gray-400" />
                                : <ChevronDown className="w-4 h-4 text-gray-400" />}
                            </div>
                          </div>
                        </div>

                        {expandedId === s.id && (
                          <div className="px-4 pb-4 border-t border-white/5 pt-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Bot className="w-4 h-4 text-violet-400" />
                              <span className="text-xs text-violet-400 font-medium">AI-তৈরি পরামর্শ বার্তা:</span>
                              <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> পাঠানো হয়েছে
                              </span>
                            </div>
                            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3">
                              <p className="text-sm text-gray-200 leading-relaxed">{s.aiMessage}</p>
                            </div>
                            <div className="flex gap-2 mt-2 text-xs text-gray-500">
                              <span>📧 {s.id.toLowerCase()}@dipti.edu</span>
                              <span>·</span>
                              <span>📱 SMS পাঠানো হয়েছে</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Google Sheets simulation */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <FileSpreadsheet className="w-5 h-5 text-green-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Google Sheets রিপোর্ট</h3>
                <p className="text-xs text-gray-500">ফলাফল স্বয়ংক্রিয়ভাবে সংরক্ষণ হয়েছে</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-green-400 text-xs bg-green-500/15 px-3 py-1 rounded-full border border-green-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    {["ID", "নাম", "কোর্স", "উপস্থিতি", "গড় নম্বর", "ঝুঁকি স্তর", "বার্তা"].map((h) => (
                      <th key={h} className="text-left text-gray-500 font-medium py-2 px-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 5).map((s) => (
                    <tr key={s.id} className="border-b border-white/5">
                      <td className="py-2 px-2 text-gray-600 font-mono">{s.id}</td>
                      <td className="py-2 px-2 text-gray-200">{s.name}</td>
                      <td className="py-2 px-2 text-gray-400 max-w-[100px] truncate">{s.course.split(" ").slice(0, 2).join(" ")}</td>
                      <td className="py-2 px-2 text-red-400">{s.attendance}%</td>
                      <td className="py-2 px-2 text-red-400">{s.avgScore}</td>
                      <td className="py-2 px-2">
                        <span className={clsx("px-1.5 py-0.5 rounded text-xs", riskBadge[s.riskLevel])}>
                          {riskLabel[s.riskLevel]}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-green-400">✓ পাঠানো</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.length > 5 && (
                <p className="text-center text-xs text-gray-600 mt-2">... এবং আরও {results.length - 5}টি row</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
