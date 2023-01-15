import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Navibar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {}, [location]);
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate("/login")
    
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/Home" ? "active" : ""
                }`}
                to="/Home"
              >
                Home
              </Link>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex">
              <Link className="btn btn-secondary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-secondary mx-1" to="/signup" role="button">
                Sign Up
              </Link>
            </form> :<button onClick={handleLogout} className=" btn btn-secondary"> Logout</button>}
          </div>
        </div>
      </div>
    </nav>
  );
}; 
