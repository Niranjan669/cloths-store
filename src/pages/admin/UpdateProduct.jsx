import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Men",
    image: ""
  });

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Product updated successfully");
    navigate("/admin/view");
  };

  return (
    <div className="container mt-3">
      <h3>Update Product</h3>
      <form onSubmit={handleUpdate}>
        <input className="form-control mb-2" placeholder="Product Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input className="form-control mb-2" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
        <input className="form-control mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/>
        <select className="form-select mb-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>
        <input className="form-control mb-2" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} required/>
        <button className="btn btn-success">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
