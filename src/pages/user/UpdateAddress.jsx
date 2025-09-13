import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAddress({ userId }) {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", street: "", city: "", state: "", pincode: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddr = async () => {
      const res = await fetch(`http://localhost:3001/addresses/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchAddr();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/addresses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });
    navigate("/delivery");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Update Address</h3>
      <form
        onSubmit={handleUpdate}
        className="p-3 border rounded shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-2">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Street / Area</label>
          <input
            className="form-control"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">City</label>
          <input
            className="form-control"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">State</label>
          <input
            className="form-control"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Pincode</label>
          <input
            className="form-control"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Update Address</button>
      </form>
    </div>
  );
}

export default UpdateAddress;
