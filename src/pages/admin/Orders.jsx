import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3001/orders");
    const data = await res.json();
    setOrders(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);


  const getProduct = (productId) => products.find(p => p.id === productId);

  const getUser = (userId) => users.find(u => u.id === userId);

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.userId]) acc[order.userId] = [];
    acc[order.userId].push(order);
    return acc;
  }, {});

  return (
    <div className="container mt-3">
      <h3 className="mb-4">All Users Orders</h3>

      {Object.keys(groupedOrders).length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        Object.keys(groupedOrders).map(userId => {
          const userOrders = groupedOrders[userId];
          const user = getUser(Number(userId));
          if (!user) return null;

          const totalAmount = userOrders.reduce((total, order) => {
            const product = getProduct(order.productId);
            return product ? total + Number(product.price) : total;
          }, 0);

          const address = userOrders[0].address;

          return (
            <div key={userId} className="mb-5 border p-3 rounded shadow-sm">
              <h5>User: {user.name}</h5>
              {address && (
                <div className="mb-3 p-2 border rounded bg-light">
                  <p><strong>Delivery Address:</strong></p>
                  <p>{address.name}</p>
                  <p>{address.street}, {address.city} - {address.pincode}</p>
                  <p>{address.state}</p>
                </div>
              )}

              <div className="row">
                {userOrders.map(order => {
                  const product = getProduct(order.productId);
                  if (!product) return null;
                  return (
                    <div key={order.id} className="col-md-3 mb-3">
                      <div className="card h-100 shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-img-top"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title">{product.name}</h6>
                          <p className="mb-1">Category: {product.category}</p>
                          <p className="mb-1">Price: ₹{product.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h6 className="mt-3">Total Amount: ₹{totalAmount} (COD Available)</h6>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;
