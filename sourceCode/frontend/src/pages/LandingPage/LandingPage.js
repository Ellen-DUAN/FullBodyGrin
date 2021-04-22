import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'

function LandingPage() {
    return (
        <div>
            <div id="logo">
                <Link to="/signup"><Button id="btn1">Sign Up</Button></Link>
                <Link to="/login"><Button id="btn2">Log In</Button></Link>
            </div>
        </div>
    );
}

export default LandingPage;