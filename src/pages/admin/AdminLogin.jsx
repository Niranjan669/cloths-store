import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setRole }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (name === "admin" && password === "admin") {
      setRole("admin");
      navigate("/admin/view");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Admin Login</h3>
      <form onSubmit={handleLogin} className="mx-auto p-4 border rounded shadow-sm" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
