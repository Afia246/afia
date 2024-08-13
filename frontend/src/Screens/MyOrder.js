import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [userEmail] = useState(localStorage.getItem('userEmail'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        console.log("Email to be used for fetching orders:", userEmail);

        if (!userEmail) {
            console.error("No email provided.");
            setError("User email is missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/myOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched Order Data:", data);

            if (data.orderData && Array.isArray(data.orderData)) {
                setOrderData(data.orderData);
            } else {
                setOrderData([]);
            }

        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, [userEmail]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? null : date.toLocaleDateString();
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : orderData.length > 0 ? (
                    <div className="row">
                        {orderData.slice(0).reverse().map((itemArray, index) => (
                            <div className="col-12" key={index}>
                                <ul className="list-group mt-3">
                                    {itemArray.map((arrayData, subIndex) => {
                                        const formattedDate = formatDate(arrayData.Order_date);
                                        return (
                                            <li className="list-group-item" key={subIndex}>
                                                <h5>{arrayData.name}</h5>
                                                <p>Quantity: {arrayData.qty}</p>
                                                <p>Size: {arrayData.size}</p>
                                                {formattedDate && <p>Date: {formattedDate}</p>}
                                                <p>Price: ৳{arrayData.price}/-</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
