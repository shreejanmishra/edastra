import { useState } from "react";
import bgImage from "../assets/bgImage2.jpg";

const PreLaunch = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phoneNumber: "",
    gender: "select",
    feedback: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const apiUrl = import.meta.env.PROD
        ? "/api/pre-launch"
        : "http://localhost:5000/api/pre-launch";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Registration successful!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          phoneNumber: "",
          gender: "select",
          feedback: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to connect to the server. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Pre-Launch
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Join our exclusive list
          </p>

          {status.message && (
            <div
              className={`mb-4 p-3 rounded ${
                status.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Only letters and spaces allowed"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                  placeholder="Ram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Only letters and spaces allowed"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                  placeholder="Prasad"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                placeholder="ram@gmail.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                >
                  <option value="select" disabled>
                    Select
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="^\+?[0-9]{10,15}$"
                title="Please enter a valid phone number (10-15 digits)"
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors"
                placeholder="9988776655"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Feedback (Optional)
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows="3"
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FAD502] focus:ring-1 focus:ring-[#FAD502] transition-colors resize-none"
                placeholder="Tell us what you think..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FAD502] text-black font-bold py-3 rounded hover:bg-[#e5c302] transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Join Pre-Launch"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreLaunch;
