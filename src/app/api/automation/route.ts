import { NextResponse } from "next/server";
import { students, getAvgScore, getRiskLevel, isAtRisk, generateAIMessage } from "@/data/mockStudents";

export async function POST() {
  // Simulate AI automation workflow
  const atRiskStudents = students.filter(isAtRisk).map((s) => ({
    id: s.id,
    name: s.name,
    course: s.course,
    batch: s.batch,
    email: s.email,
    phone: s.phone,
    attendance: s.attendance,
    avgScore: getAvgScore(s),
    riskLevel: getRiskLevel(s),
    lowAttendance: s.attendance < 75,
    lowScore: getAvgScore(s) < 50,
    aiMessage: generateAIMessage(s),
    notificationSent: true,
    processedAt: new Date().toISOString(),
  }));

  const workflowLog = [
    { step: 1, name: "ডেটা লোড", status: "success", message: `${students.length} জন শিক্ষার্থীর ডেটা লোড করা হয়েছে` },
    { step: 2, name: "বিশ্লেষণ", status: "success", message: "উপস্থিতি ও ফলাফল বিশ্লেষণ সম্পন্ন" },
    { step: 3, name: "ঝুঁকি শনাক্ত", status: "success", message: `${atRiskStudents.length} জন ঝুঁকিপূর্ণ শিক্ষার্থী শনাক্ত হয়েছে` },
    { step: 4, name: "AI বার্তা তৈরি", status: "success", message: "প্রতিটি ঝুঁকিপূর্ণ শিক্ষার্থীর জন্য AI পরামর্শ তৈরি হয়েছে" },
    { step: 5, name: "নোটিফিকেশন", status: "success", message: `${atRiskStudents.length}টি Follow-up Message প্রস্তুত` },
    { step: 6, name: "রিপোর্ট সংরক্ষণ", status: "success", message: "ফলাফল Google Sheets-এ সংরক্ষণের জন্য প্রস্তুত" },
  ];

  return NextResponse.json({
    success: true,
    processedAt: new Date().toISOString(),
    totalStudents: students.length,
    atRiskCount: atRiskStudents.length,
    atRiskStudents,
    workflowLog,
    summary: {
      highRisk: atRiskStudents.filter((s) => s.riskLevel === "high").length,
      mediumRisk: atRiskStudents.filter((s) => s.riskLevel === "medium").length,
      lowAttendanceOnly: atRiskStudents.filter((s) => s.lowAttendance && !s.lowScore).length,
      lowScoreOnly: atRiskStudents.filter((s) => s.lowScore && !s.lowAttendance).length,
      both: atRiskStudents.filter((s) => s.lowAttendance && s.lowScore).length,
    },
  });
}
