import { Link } from 'react-router-dom';
import "./navbar.css";

function Navbar(){
    return(
        <div>
            <nav className="navbar navbar-expand-lg fixed-top bar">
                <div className="container-fluid">
                    {/* Logo */}

                    <Link to='' className="navbar-brand ms-3 fs-3 text-white" href="#">
                        Medicare 
                    </Link>

                    {/* Toggler */}
                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" 
                        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Side Bar */}
                    <div className="sidebar offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        {/* Side Bar Header */}
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title text-black" id="offcanvasNavbarLabel">Medicare</h5>
                            <button type="button" className="btn-close btn-close-black shadow-none" data-bs-dismiss="offcanvas" aria-label="Close">
                            </button>
                        </div>
                        {/* Side Bar body */}
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to='/home' className="nav-link mx-3 fs-5" aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/doctors' className="nav-link mx-3 fs-5" href="#">Doctors</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/diagnosis' className="nav-link mx-3 fs-5" href="#">Diagnosis</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle mx-3 fs-5" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Settings
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                                        <li><Link to="/" className="dropdown-item">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar
