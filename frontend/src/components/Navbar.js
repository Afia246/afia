import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from '../components/ContextReducer'; // Adjusted the import path

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const cartItems = useCart(); // Assuming useCart provides access to cart items
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center fs-1 fst-italic" to="/">
            <img src="/images/cover.jpg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn btn-outline-light text-gold bg-dark mx-2" to="/login">Login</Link>
                  <Link className="btn btn-outline-light text-gold bg-dark mx-2" to="/creatuser">SignUp</Link> {/* Corrected typo */}
                </>
              ) : (
                <>
                  <div className="btn btn-outline-light text-gold bg-dark mx-2" onClick={() => { setCartView(true) }}>
                    My Cart {" "}
                    <Badge pill bg="danger">{cartItems.length}</Badge> {/* Updated to use cartItems.length */}
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                  <div className="btn btn-outline-light text-gold bg-dark mx-2" onClick={handleLogout}>
                    Logout
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}