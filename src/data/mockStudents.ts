export type Student = {
  id: string;
  name: string;
  course: string;
  batch: string;
  attendance: number; // percentage
  midterm: number;   // out of 100
  final: number;     // out of 100
  assignment: number; // out of 100
  email: string;
  phone: string;
  enrollDate: string;
  status: "active" | "inactive";
};

export const students: Student[] = [
  // AI Automation & Data Visualization
  { id: "S001", name: "মাহফুজ আহমেদ", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 85, midterm: 78, final: 82, assignment: 90, email: "mahfuz@example.com", phone: "01711000001", enrollDate: "2024-01-10", status: "active" },
  { id: "S002", name: "তাসনিম রহমান", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 62, midterm: 45, final: 50, assignment: 55, email: "tasnim@example.com", phone: "01711000002", enrollDate: "2024-01-10", status: "active" },
  { id: "S003", name: "রিফাত হোসেন", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 91, midterm: 88, final: 92, assignment: 95, email: "rifat@example.com", phone: "01711000003", enrollDate: "2024-01-10", status: "active" },
  { id: "S004", name: "সাদিয়া ইসলাম", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 70, midterm: 48, final: 55, assignment: 60, email: "sadia@example.com", phone: "01711000004", enrollDate: "2024-01-10", status: "active" },
  { id: "S005", name: "নাফিস উদ্দিন", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 55, midterm: 40, final: 44, assignment: 50, email: "nafis@example.com", phone: "01711000005", enrollDate: "2024-01-10", status: "active" },
  { id: "S006", name: "ফারহানা বেগম", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 80, midterm: 72, final: 76, assignment: 80, email: "farhana@example.com", phone: "01711000006", enrollDate: "2024-01-10", status: "active" },
  { id: "S007", name: "ইমরান খান", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 48, midterm: 35, final: 40, assignment: 45, email: "imran@example.com", phone: "01711000007", enrollDate: "2024-01-10", status: "active" },
  { id: "S008", name: "শিরিন আক্তার", course: "AI Automation & Data Visualization", batch: "Batch-03", attendance: 95, midterm: 90, final: 94, assignment: 98, email: "shirin@example.com", phone: "01711000008", enrollDate: "2024-01-10", status: "active" },

  // Web Development
  { id: "S009", name: "আরিফ হাসান", course: "Web Development", batch: "Batch-05", attendance: 78, midterm: 65, final: 70, assignment: 75, email: "arif@example.com", phone: "01711000009", enrollDate: "2024-02-05", status: "active" },
  { id: "S010", name: "মিতু রানী", course: "Web Development", batch: "Batch-05", attendance: 60, midterm: 42, final: 48, assignment: 55, email: "mitu@example.com", phone: "01711000010", enrollDate: "2024-02-05", status: "active" },
  { id: "S011", name: "রাকিব হাওলাদার", course: "Web Development", batch: "Batch-05", attendance: 88, midterm: 80, final: 85, assignment: 88, email: "rakib@example.com", phone: "01711000011", enrollDate: "2024-02-05", status: "active" },
  { id: "S012", name: "সুমাইয়া খান", course: "Web Development", batch: "Batch-05", attendance: 72, midterm: 58, final: 62, assignment: 68, email: "sumaiya@example.com", phone: "01711000012", enrollDate: "2024-02-05", status: "active" },
  { id: "S013", name: "তানভীর আলম", course: "Web Development", batch: "Batch-05", attendance: 45, midterm: 30, final: 38, assignment: 42, email: "tanvir@example.com", phone: "01711000013", enrollDate: "2024-02-05", status: "active" },
  { id: "S014", name: "নুসরাত জাহান", course: "Web Development", batch: "Batch-05", attendance: 92, midterm: 85, final: 88, assignment: 91, email: "nusrat@example.com", phone: "01711000014", enrollDate: "2024-02-05", status: "active" },

  // Digital Marketing
  { id: "S015", name: "কামাল উদ্দিন", course: "Digital Marketing", batch: "Batch-02", attendance: 68, midterm: 52, final: 58, assignment: 62, email: "kamal@example.com", phone: "01711000015", enrollDate: "2024-03-01", status: "active" },
  { id: "S016", name: "সোনালী দাস", course: "Digital Marketing", batch: "Batch-02", attendance: 82, midterm: 74, final: 78, assignment: 82, email: "sonali@example.com", phone: "01711000016", enrollDate: "2024-03-01", status: "active" },
  { id: "S017", name: "মোস্তাফা জামান", course: "Digital Marketing", batch: "Batch-02", attendance: 57, midterm: 44, final: 48, assignment: 50, email: "mostafa@example.com", phone: "01711000017", enrollDate: "2024-03-01", status: "active" },
  { id: "S018", name: "পিয়া আক্তার", course: "Digital Marketing", batch: "Batch-02", attendance: 90, midterm: 83, final: 87, assignment: 89, email: "pia@example.com", phone: "01711000018", enrollDate: "2024-03-01", status: "active" },
  { id: "S019", name: "জুবায়ের হোসেন", course: "Digital Marketing", batch: "Batch-02", attendance: 75, midterm: 66, final: 70, assignment: 73, email: "jubayer@example.com", phone: "01711000019", enrollDate: "2024-03-01", status: "active" },

  // Graphic Design
  { id: "S020", name: "লামিয়া সুলতানা", course: "Graphic Design", batch: "Batch-04", attendance: 65, midterm: 48, final: 52, assignment: 57, email: "lamia@example.com", phone: "01711000020", enrollDate: "2024-01-20", status: "active" },
  { id: "S021", name: "সজীব আহমেদ", course: "Graphic Design", batch: "Batch-04", attendance: 88, midterm: 79, final: 84, assignment: 87, email: "sajib@example.com", phone: "01711000021", enrollDate: "2024-01-20", status: "active" },
  { id: "S022", name: "মেহজাবিন হক", course: "Graphic Design", batch: "Batch-04", attendance: 50, midterm: 38, final: 43, assignment: 48, email: "mehjabeen@example.com", phone: "01711000022", enrollDate: "2024-01-20", status: "active" },
  { id: "S023", name: "আশিকুর রহমান", course: "Graphic Design", batch: "Batch-04", attendance: 93, midterm: 86, final: 90, assignment: 93, email: "ashik@example.com", phone: "01711000023", enrollDate: "2024-01-20", status: "active" },
  { id: "S024", name: "দিলরুবা বেগম", course: "Graphic Design", batch: "Batch-04", attendance: 71, midterm: 60, final: 65, assignment: 68, email: "dilruba@example.com", phone: "01711000024", enrollDate: "2024-01-20", status: "active" },

  // Freelancing & Outsourcing
  { id: "S025", name: "সাইফুল ইসলাম", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 42, midterm: 32, final: 36, assignment: 40, email: "saiful@example.com", phone: "01711000025", enrollDate: "2024-04-01", status: "active" },
  { id: "S026", name: "নাজমা বেগম", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 79, midterm: 68, final: 73, assignment: 76, email: "najma@example.com", phone: "01711000026", enrollDate: "2024-04-01", status: "active" },
  { id: "S027", name: "হাসান মাহমুদ", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 86, midterm: 77, final: 81, assignment: 84, email: "hasan@example.com", phone: "01711000027", enrollDate: "2024-04-01", status: "active" },
  { id: "S028", name: "তাহমিনা আক্তার", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 63, midterm: 46, final: 51, assignment: 55, email: "tahmina@example.com", phone: "01711000028", enrollDate: "2024-04-01", status: "active" },
  { id: "S029", name: "রুবেল মিয়া", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 94, midterm: 87, final: 91, assignment: 94, email: "rubel@example.com", phone: "01711000029", enrollDate: "2024-04-01", status: "active" },
  { id: "S030", name: "মুন্নি আক্তার", course: "Freelancing & Outsourcing", batch: "Batch-06", attendance: 74, midterm: 55, final: 60, assignment: 64, email: "munni@example.com", phone: "01711000030", enrollDate: "2024-04-01", status: "active" },
];

export const courses = [...new Set(students.map((s) => s.course))];

export function getAvgScore(s: Student): number {
  return Math.round((s.midterm + s.final + s.assignment) / 3);
}

export function getRiskLevel(s: Student): "high" | "medium" | "low" {
  const avg = getAvgScore(s);
  if (s.attendance < 75 && avg < 50) return "high";
  if (s.attendance < 75 || avg < 50) return "medium";
  return "low";
}

export function isAtRisk(s: Student): boolean {
  return s.attendance < 75 || getAvgScore(s) < 50;
}

export function generateAIMessage(s: Student): string {
  const avg = getAvgScore(s);
  const risk = getRiskLevel(s);

  if (risk === "high") {
    return `প্রিয় ${s.name}, আপনার উপস্থিতির হার মাত্র ${s.attendance}% এবং গড় নম্বর ${avg}/100। এটি অত্যন্ত উদ্বেগজনক। অনুগ্রহ করে অবিলম্বে আপনার মেন্টরের সাথে যোগাযোগ করুন এবং মিস করা ক্লাসগুলো পূরণ করুন। আপনার সাফল্য নিশ্চিত করতে DIPTI সর্বদা আপনার পাশে আছে।`;
  } else if (s.attendance < 75) {
    return `প্রিয় ${s.name}, আপনার উপস্থিতির হার ${s.attendance}%, যা ন্যূনতম ৭৫%-এর কম। নিয়মিত ক্লাসে অংশগ্রহণ করুন। বেশি অনুপস্থিত থাকলে সার্টিফিকেট পেতে সমস্যা হতে পারে।`;
  } else {
    return `প্রিয় ${s.name}, আপনার গড় নম্বর ${avg}/100, যা উত্তীর্ণ হওয়ার জন্য যথেষ্ট নয়। অ্যাসাইনমেন্ট নিয়মিত জমা দিন এবং মেন্টরের সাথে বিশেষ সেশনে অংশ নিন।`;
  }
}
