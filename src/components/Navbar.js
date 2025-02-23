import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
    let navigate =  useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    let location = useLocation();

    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">INotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')}?
                    <form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        {/* <button className="btn mx-2 btn-outline-success" type="submit">Search</button> */}
                        <Link className="btn mx-2 btn-primary" to="/login">LoginIn</Link>
                        <Link className="btn  btn-primary" to="/signup">SignUp</Link>
                    </form>:
                  <button className="btn btn-primary" onClick={handleLogout}>LogOut </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
