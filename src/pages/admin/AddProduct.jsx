import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Men",
    image: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please enter the image path (e.g., /images/men1.jpg)");
      return;
    }
    await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Product added successfully");
    setForm({ name: "", price: "", description: "", category: "Men", image: "" });
    navigate("/admin/view");
  };

  return (
    <div className="container mt-3">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input 
          className="form-control mb-2" 
          placeholder="Product Name" 
          value={form.name} 
          onChange={e => setForm({ ...form, name: e.target.value })} 
          required 
        />
        <input 
          className="form-control mb-2" 
          placeholder="Price" 
          type="number" 
          value={form.price} 
          onChange={e => setForm({ ...form, price: e.target.value })} 
          required 
        />
        <input 
          className="form-control mb-2" 
          placeholder="Description" 
          value={form.description} 
          onChange={e => setForm({ ...form, description: e.target.value })} 
          required 
        />
        <select 
          className="form-select mb-2" 
          value={form.category} 
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <input 
          className="form-control mb-2" 
          placeholder="Enter image path (e.g., /images/men1.jpg)" 
          value={form.image} 
          onChange={e => setForm({ ...form, image: e.target.value })} 
          required 
        />

        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
