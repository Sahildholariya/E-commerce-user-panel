import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(savedCart);
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      const updatedCart = cart.filter((item) => item.id !== productId);

      setCart(updatedCart);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      toast.info("Product removed from cart", {
        autoClose: 1000,
      });
    }

    window.location.reload()
  };

  const handleUpdateQuantity = (productId, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      cart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });


      setCart(cart);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Your cart is empty</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {[ "Category", "Price", "Quantity", "Total", "Actions"].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {/* <td className="px-4 py-4 whitespace-nowrap">{item.title}</td> */}
                  <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-4 py-4">${Math.round(item.price)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity === 10}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex justify-between items-center">
        <h4 className="text-2xl font-bold">Total: ${calculateTotal().toFixed(2)}</h4>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;