import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../Screens/trash.svg'; // Ensure this path is correct

export default function Cart() {
  const data = useCart(); // Access cart state
  const dispatch = useDispatchCart(); // Access dispatch function

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        The Cart is Empty!
      </div>
    );
  }

  // Calculate total price
  const totalPrice = data.reduce((total, item) => total + (item.price), 0); // Summing up item prices

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        alert("User email is not available. Please log in.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        console.error("Error placing order:", response.statusText);
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className='container m-auto mt-5'>
      <table className='table table-hover'>
        <thead className='text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Size</th>
            <th scope='col'>Price</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.size}</td>
              <td className='text-white'>{item.price.toFixed(2)}</td> {/* Display price of single item */}
              <td>
                <button type='button' className='btn p-0'>
                  <img src={trash} alt='delete' onClick={() => dispatch({ type: 'REMOVE', index })} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='fs-2 text-white'>
        <h1>Total Price: {totalPrice.toFixed(2)}</h1>
      </div>
      <div>
        <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  );
}
