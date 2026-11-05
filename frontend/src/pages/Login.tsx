import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError(false);
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (typeof data.access_token !== "string") {
        throw new Error("Login succeeded but no access token was returned.");
      }

      sessionStorage.setItem("access_token", data.access_token);

      navigate("/feed", { replace: true });
    } catch (err) {
      setError(true);
      setMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Login to your account
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Haven't registered yet?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </p>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              error ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;