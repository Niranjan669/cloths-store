import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Delivery({ userId }) {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ name: "", street: "", city: "", state: "", pincode: "" });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    const res = await fetch(`http://localhost:3001/addresses?userId=${userId}`);
    const data = await res.json();
    setAddresses(data);
  };

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });
    setForm({ name: "", street: "", city: "", state: "", pincode: "" });
    fetchAddresses();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/addresses/${id}`, { method: "DELETE" });
    if (selectedAddress?.id === id) setSelectedAddress(null);
    fetchAddresses();
  };

  const handleEdit = (addr) => navigate(`/update-address/${addr.id}`);

  const handleProceed = async () => {
    if (!selectedAddress) {
      alert("Please select an address to proceed!");
      return;
    }

    const res = await fetch(`http://localhost:3001/carts?userId=${userId}`);
    const cartItems = await res.json();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    for (let item of cartItems) {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          address: selectedAddress,
          status: "Pending",
        }),
      });
      await fetch(`http://localhost:3001/carts/${item.id}`, { method: "DELETE" });
    }

    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Delivery Address</h3>

      <form
        onSubmit={handleSubmit}
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
        <button className="btn btn-primary w-100">Add Address</button>
      </form>

      <h5 className="mt-4 text-center">Your Addresses</h5>
      <div className="row">
        {addresses.map((addr) => (
          <div key={addr.id} className="col-md-6 mb-3">
            <div
              className={`card p-3 shadow-sm ${
                selectedAddress?.id === addr.id ? "border-success border-3" : ""
              }`}
            >
              <p>
                <strong>{addr.name}</strong>
              </p>
              <p>
                {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(addr)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(addr.id)}>
                  Delete
                </button>
                <button className="btn btn-sm btn-success" onClick={() => setSelectedAddress(addr)}>
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-success btn-lg"
          disabled={!selectedAddress}
          onClick={handleProceed}
        >
          place order
        </button>
      </div>
    </div>
  );
}

export default Delivery;
