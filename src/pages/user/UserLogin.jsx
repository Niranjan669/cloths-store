import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserLogin({ setRole, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === "user"
    );

    if (user) {
      setRole("user");
      setUserId(user.id);
      navigate("/products");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">User Login</h3>
      <form
        onSubmit={handleLogin}
        className="mx-auto p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="btn btn-primary w-100 mb-3">Login</button>

        <div className="text-center">
          <p className="mb-0">
            Don’t have an account?{" "}
            <Link to="/user/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
