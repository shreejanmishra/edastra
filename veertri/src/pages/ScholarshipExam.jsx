import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { scholarships } from "../data/scholarships";
import { Award, XCircle, Clock, AlertCircle } from "lucide-react";

export default function ScholarshipExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [examAnswers, setExamAnswers] = useState({});
  const [examScore, setExamScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    // Find scholarship by ID
    const found = scholarships.find((s) => s.id === parseInt(id));
    if (found) {
      setScholarship(found);
    } else {
      // Handle not found
      navigate("/scholarship");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (examScore === null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && examScore === null) {
      handleExamSubmit();
    }
  }, [timeLeft, examScore]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const examQuestions = [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      correct: "New Delhi",
    },
    {
      id: 2,
      question: "Who is known as the Father of the Nation?",
      options: [
        "Jawaharlal Nehru",
        "Subhash Chandra Bose",
        "Mahatma Gandhi",
        "Bhagat Singh",
      ],
      correct: "Mahatma Gandhi",
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: "Mars",
    },
    {
      id: 4,
      question: "What is 15 * 12?",
      options: ["180", "160", "150", "200"],
      correct: "180",
    },
    {
      id: 5,
      question: "Which is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Brain"],
      correct: "Skin",
    },
  ];

  const handleExamSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      let score = 0;
      examQuestions.forEach((q) => {
        if (examAnswers[q.id] === q.correct) score++;
      });
      setExamScore(score);
      setIsSubmitting(false);

      // Save result to localStorage
      const passed = score >= 3;
      const status = passed ? "passed" : "failed";
      localStorage.setItem(`scholarship_exam_status_${id}`, status);
    }, 1000);
  };

  if (!scholarship)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );

  if (examScore !== null) {
    const passed = examScore >= 3; // Need 3/5 to pass
    return (
      <div className="min-h-screen dark:bg-black bg-gray-50 pt-24 px-4 md:px-16 pb-12 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full border dark:border-gray-800 border-gray-200 shadow-2xl text-center">
          {passed ? (
            <>
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={40} />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
                Exam Passed!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
                You scored {examScore}/{examQuestions.length}.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Congratulations! You are fully eligible for the{" "}
                <span className="text-[#FAD502] font-semibold">
                  {scholarship.title}
                </span>
                .
              </p>
              <button
                onClick={() => navigate("/scholarship")}
                className="w-full bg-[#FAD502] text-[#090D0E] py-3 rounded-lg font-bold hover:bg-[#FAD502]/90 transition-colors"
              >
                Proceed to Application
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
                Exam Failed
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
                You scored {examScore}/{examQuestions.length}.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                You need at least 3 correct answers to qualify.
              </p>
              <button
                onClick={() => navigate("/scholarship")}
                className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Scholarships
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50 pt-24 px-4 md:px-16 pb-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-2">
              Eligibility Exam
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {scholarship.title}
            </p>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-xl ${
              timeLeft < 60
                ? "bg-red-500/20 text-red-500"
                : "bg-blue-500/20 text-blue-500"
            }`}
          >
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border dark:border-gray-800 border-gray-200 shadow-xl">
          <div className="flex items-start gap-4 mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle
              className="text-yellow-500 flex-shrink-0 mt-1"
              size={20}
            />
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              Please answer all questions correctly. You need to score at least
              60% to pass this eligibility test. Do not refresh the page.
            </p>
          </div>

          <div className="space-y-8">
            {examQuestions.map((q, index) => (
              <div key={q.id} className="space-y-4">
                <p className="dark:text-white text-gray-900 font-medium text-lg">
                  <span className="text-gray-400 mr-2">{index + 1}.</span>
                  {q.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                  {q.options.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        examAnswers[q.id] === option
                          ? "border-[#FAD502] bg-[#FAD502]/10 ring-1 ring-[#FAD502]"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          examAnswers[q.id] === option
                            ? "border-[#FAD502]"
                            : "border-gray-400"
                        }`}
                      >
                        {examAnswers[q.id] === option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FAD502]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={examAnswers[q.id] === option}
                        onChange={() =>
                          setExamAnswers({ ...examAnswers, [q.id]: option })
                        }
                        className="hidden"
                      />
                      <span className="dark:text-gray-300 text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t dark:border-gray-800 border-gray-200 flex justify-end">
            <button
              onClick={handleExamSubmit}
              disabled={
                Object.keys(examAnswers).length !== examQuestions.length ||
                isSubmitting
              }
              className="bg-[#FAD502] text-[#090D0E] px-8 py-3 rounded-lg font-bold hover:bg-[#FAD502]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
