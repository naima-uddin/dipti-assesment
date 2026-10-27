import { NextResponse } from "next/server";
import { students, getAvgScore, getRiskLevel, isAtRisk, generateAIMessage } from "@/data/mockStudents";

export async function GET() {
  return NextResponse.json({ students });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === "analyze") {
    const atRisk = students.filter(isAtRisk);
    const safe = students.filter((s) => !isAtRisk(s));

    const courseStats = students.reduce((acc, s) => {
      if (!acc[s.course]) acc[s.course] = { total: 0, atRisk: 0, avgAttendance: 0, avgScore: 0, scores: [], attendances: [] };
      acc[s.course].total++;
      if (isAtRisk(s)) acc[s.course].atRisk++;
      acc[s.course].scores.push(getAvgScore(s));
      acc[s.course].attendances.push(s.attendance);
      return acc;
    }, {} as Record<string, { total: number; atRisk: number; avgAttendance: number; avgScore: number; scores: number[]; attendances: number[] }>);

    Object.keys(courseStats).forEach((course) => {
      const c = courseStats[course];
      c.avgScore = Math.round(c.scores.reduce((a, b) => a + b, 0) / c.scores.length);
      c.avgAttendance = Math.round(c.attendances.reduce((a, b) => a + b, 0) / c.attendances.length);
    });

    return NextResponse.json({
      total: students.length,
      atRisk: atRisk.length,
      safe: safe.length,
      avgAttendance: Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length),
      avgScore: Math.round(students.reduce((a, s) => a + getAvgScore(s), 0) / students.length),
      courseStats,
      atRiskStudents: atRisk.map((s) => ({
        ...s,
        avgScore: getAvgScore(s),
        riskLevel: getRiskLevel(s),
        aiMessage: generateAIMessage(s),
      })),
    });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
