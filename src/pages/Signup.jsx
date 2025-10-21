import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-3xl font-semibold mb-4">Create Account</h2>
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 shadow rounded-md w-80 space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          Sign Up
        </button>
      </form>
    </div>
  );
}
