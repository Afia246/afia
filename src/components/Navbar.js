import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center fs-1 fst-italic" to="/">
            <img src="/images/cover.jpg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            CENTRAL PERK
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
                  <Link className="nav-link" aria-current="page" to="/orders">My Orders</Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn btn-outline-light text-gold bg-dark mx-2" to="/login">Login</Link>
                  <Link className="btn btn-outline-light text-gold bg-dark mx-2" to="/creatuser">SignUp</Link>
                </>
              ) : (
                <>
                  <div className="btn btn-outline-light text-gold bg-dark mx-2">My Cart</div>
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
