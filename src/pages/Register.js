import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert("User already exists");
    }
  };

 return (
  <div
    className="vh-100 d-flex justify-content-center align-items-center"
    style={{ background: "linear-gradient(to right, #11998e, #38ef7d)" }}
  >
    <div
      className="card p-4 shadow-lg"
      style={{
        width: "350px",
        borderRadius: "15px",
        background: "rgba(255,255,255,0.9)",
      }}
    >
      <h3 className="text-center mb-4 fw-bold">Register</h3>

      <input
        className="form-control mb-3 rounded-pill"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
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
        onClick={handleRegister}
      >
        Register
      </button>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#11998e", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  </div>
);

}

export default Register;
