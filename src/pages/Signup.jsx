import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (name && email && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-medium py-2 sm:py-3 rounded-md hover:bg-blue-800 transition duration-200 text-sm sm:text-base"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
