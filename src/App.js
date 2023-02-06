import React, { useState, useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.slice(0, 10));
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const updateQuantity = (index, newQuantity) => {
    const newCart = [...cart];
    newCart[index].quantity = Number(newQuantity);
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container">
      <h1 className="text-center m-3">Product List</h1>
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {product.title} - {product.price}
            <button
              className="btn btn-primary"
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-center m-3">Cart</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item, index, e.target.value)}
                />
              </td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-right m-3">Total Price: {totalItems}</h3>
      <h3 className="text-right m-3">Total Quantity: {totalQuantity}</h3>
    </div>
  );
};

export default App;
