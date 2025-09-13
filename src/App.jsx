import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

import AdminHeader from "./components/AdminHeader";
import UserHeader from "./components/UserHeader";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AddProduct from "./pages/admin/AddProduct";
import ViewProducts from "./pages/admin/ViewProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Orders from "./pages/admin/Orders";

// User pages
import UserLogin from "./pages/user/UserLogin";
import Register from "./pages/user/Register";
import AllProducts from "./pages/user/AllProducts";
import Cart from "./pages/user/Cart";
import Delivery from "./pages/user/Delivery";
import UpdateAddress from "./pages/user/UpdateAddress";
import MyOrders from "./pages/user/MyOrders";

function App() {
  const [role, setRole] = useState(null); // "admin" or "user"
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Header role={role} setRole={setRole} setUserId={setUserId} />

      {role === "admin" && <AdminHeader />}
      {role === "user" && <UserHeader />}

      <Routes>
        <Route path="/" element={<Home role={role} />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setRole={setRole} />} />
        <Route path="/admin/add" element={role==="admin"?<AddProduct/>:<Home role={role} />} />
        <Route path="/admin/view" element={role==="admin"?<ViewProducts/>:<Home role={role} />} />
        <Route path="/admin/update/:id" element={role==="admin"?<UpdateProduct/>:<Home role={role} />} />
        <Route path="/admin/orders" element={role==="admin"?<Orders/>:<Home role={role} />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin setRole={setRole} setUserId={setUserId} />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/products" element={role==="user"?<AllProducts userId={userId} role={role}/>:<Home role={role} />} />
        <Route path="/cart" element={role==="user"?<Cart userId={userId}/>:<Home role={role} />} />
        <Route path="/delivery" element={role==="user"?<Delivery userId={userId}/>:<Home role={role} />} />
        <Route path="/update-address/:id" element={role==="user"?<UpdateAddress userId={userId}/>:<Home role={role} />} />
        <Route path="/orders" element={role==="user"?<MyOrders userId={userId}/>:<Home role={role} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
