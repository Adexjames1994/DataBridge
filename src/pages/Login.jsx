import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow rounded-md w-80 space-y-4"
      >
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
          Login
        </button>
      </form>
    </div>
  );
}
