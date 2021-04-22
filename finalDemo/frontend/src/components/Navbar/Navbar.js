import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import Cookies from "universal-cookie";


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click); 
    const closeMobileMenu = () => setClick(false); 

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('TOKEN', { path: '/' });
    }

    useEffect(() => {
        showButton();
      }, []);

    window.addEventListener('resize', showButton);
    
    return (
            <>
            <nav className='navbar'>
                <div className="navbar-container">
                    <Link to="/home" className='navbar-logo' onClick={closeMobileMenu} id="t">
                        FullBodyGrin  
                        <i className="fab fa-avianex"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/settings' className="nav-links" onClick={closeMobileMenu}>
                               Settings
                            </Link>
                        </li>
                    </ul>
                    <Link to='/'><Button buttonstyle='btn--outline' id="btn" onClick={handleLogout}>LOG OUT</Button></Link>
                </div>
            </nav>
            </>
    );
}

export default Navbar;