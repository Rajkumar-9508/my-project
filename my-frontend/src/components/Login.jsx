import { useState } from "react";
import { api } from "../api";

export default function Login({ onLoggedIn }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const { data } = await api.post(url, form);
      onLoggedIn(data.user); // parent state update
    } catch (e) {
      setErr(e?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        {mode === "login" ? "Login" : "Create account"}
      </h2>
      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && (
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          {loading ? "Please wait..." : (mode === "login" ? "Login" : "Register")}
        </button>
      </form>

      <button
        className="mt-3 text-sm underline"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Create new account" : "Already have account? Login"}
      </button>
    </div>
  );
}