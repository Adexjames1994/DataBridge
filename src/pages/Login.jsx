import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-medium py-2 sm:py-3 rounded-md hover:bg-blue-800 transition duration-200 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
