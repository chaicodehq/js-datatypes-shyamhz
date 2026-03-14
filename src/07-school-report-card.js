/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if (
    student === undefined ||
    student === null ||
    !Object.keys(student).length ||
    Object.prototype !== Object.getPrototypeOf(student)
  ) {
    return null;
  }

  if (
    typeof student["name"] !== "string" ||
    student["name"] === ""
  ) {
    return null;
  }

  if (
    student["marks"] === undefined ||
    student["marks"] === null ||
    !Object.keys(student["marks"]).length ||
    Object.prototype !== Object.getPrototypeOf(student["marks"])
  ) {
    return null;
  }


  for (const marks of Object.values(student["marks"])) {
    if (
      typeof marks !== "number" ||
      marks < 0 ||
      marks > 100
    ) {
      return null;
    }
  }
  const numSubjects = Object.values(student["marks"]).length;
  const totalMarks = Object.values(student["marks"]).reduce((total, currMark) => total + currMark);

  const percentage = Number.parseFloat(((totalMarks / (numSubjects * 100)) * 100).toFixed(2));

  const highestSubjectMarks = Math.max(...Object.values(student["marks"]));
  const lowestSubjectMarks = Math.min(...Object.values(student["marks"]));

  const highestSubject = Object.keys(student["marks"]).find((key) => student["marks"][key] === highestSubjectMarks);
  const lowestSubject = Object.keys(student["marks"]).find((key) => student["marks"][key] === lowestSubjectMarks);
  const passedSubjects = [];

  for (const [sub, marks] of Object.entries(student["marks"])) {

    if (marks >= 40) {
      passedSubjects.push(sub);
    }
  }

  const failedSubjects = [];

  for (const [sub, marks] of Object.entries(student["marks"])) {

    if (marks < 40) {
      failedSubjects.push(sub);
    }
  }

  const subjectCount = Object.values(student["marks"]).length;

  let grade = "";

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80 && percentage < 90) {
    grade = "A";
  } else if (percentage >= 70 && percentage < 80) {
    grade = "B";
  } else if (percentage >= 60 && percentage < 70) {
    grade = "C";
  } else if (percentage >= 40 && percentage < 60) {
    grade = "D";
  } else {
    grade = "F"
  }

  const ReportCard = {
    name: student["name"],
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount,
  }

  return ReportCard;

}
