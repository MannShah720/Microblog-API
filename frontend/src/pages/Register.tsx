import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await registerUser(email, password);

      navigate("/login", {
        replace: true,
        state: { registered: true },
        });
    
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Create an account
        </h1>

        <label className="mb-2 block font-medium" htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="you@example.com"
        />

        <label className="mb-2 block font-medium" htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border p-3"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
        >
            Log in
        </Link>
      </p>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}