import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
  <div
    className="vh-100 d-flex justify-content-center align-items-center"
    style={{ background: "linear-gradient(to right, #667eea, #764ba2)" }}
  >
    <div
      className="card p-4 shadow-lg"
      style={{
        width: "350px",
        borderRadius: "15px",
        background: "rgba(255,255,255,0.9)",
      }}
    >
      <h3 className="text-center mb-4 fw-bold">Login</h3>

      <input
        type="email"
        className="form-control mb-3 rounded-pill"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3 rounded-pill"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-dark w-100 rounded-pill"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#667eea", fontWeight: "bold" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
);


}

export default Login;
