import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            // Replace with dynamic email fetching logic
            const response = await fetch("http://localhost:5000/api/myOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: "user@example.com" }) // Replace with actual email
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOrderData(data.orderData); // Assuming data.orderData contains the fetched order data
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {Object.keys(orderData).length !== 0 ? (
                        orderData.order_data.slice(0).reverse().map((item) => (
                            item.map((arrayData) => (
                                <div className="col-12 col-md-6 col-lg-3" key={arrayData._id}>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                <span className="m-1">{arrayData.qty}</span>
                                                <span className="m-1">{arrayData.size}</span>
                                                <span className="m-1">{arrayData.Order_date}</span>
                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
