import { useState, type FormEvent } from "react";
import { loginUser } from "../services/api";

function Login() {
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

      // Store the JWT for this browser session
      sessionStorage.setItem("access_token", data.access_token);

      setMessage("Login successful!");
      setPassword("");
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
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="mb-1 block font-medium" htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border p-2"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              error ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;