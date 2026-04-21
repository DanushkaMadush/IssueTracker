import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { colors } from "../theme/colors";
import { login } from "../api/services/auth.service";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const inputStyle: React.CSSProperties = {
    padding: "0.6rem 0.75rem",
    borderRadius: "0.375rem",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: "0.9rem",
    outline: "none",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      await login({ email, password });

      navigate("/home");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Card style={{ width: "400px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: colors.text,
          }}
        >
          Issue Tracker
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && (
            <p style={{ color: colors.error, fontSize: "0.85rem" }}>{error}</p>
          )}

          <Button variant="primary" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button variant="tertiary" onClick={() => navigate("/register")}>
            Don’t have an account? Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;