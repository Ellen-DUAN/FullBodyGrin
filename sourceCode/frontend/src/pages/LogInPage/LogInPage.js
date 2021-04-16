import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogInPage.css';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Cookies from "universal-cookie";


const cookies = new Cookies();


class LogInPage extends React.Component {
    state = {
        show: false,
        redirect: false,
        email: '',
        password: '',
        message: ''
    };

    handleLogIn = () => {
        console.log(this.state);
        if(this.state.email === '' || this.state.password === '') {
            console.log('jahahaha');
            this.setState({ message: "Please fill all fields!" });
            this.setState({ show: true });
        } else {
            Axios.post('/checkLogIn',
                {
                    method: 'post',
                    email: this.state.email,
                    password: this.state.password
                }
            ).then(
                res => {
                    if(res.data.login) {
                        this.setState({ message: "You have logged in successfully!" });
                        this.setState({ show: true });
                        this.setState({ redirect: true });
                    } else {
                        this.setState({ message: "Wrong email or password!" });
                        this.setState({ show: true });
                    }

                }
            )
        }
    };

    handleClose = () => {
        this.setState({ show: false });
        const location = this.props.location;
        if(this.state.redirect) {
            cookies.set("TOKEN", 'abc', {
                path: "/",
            });
            this.props.history.push("/home");
            //window.location.href = "/home";
        }
    };

    render () {
        return (
            <div id='login'>
                <h2 id='title'>Log In</h2>
                <Form id='login_form'>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email"
                        onChange={e => this.setState({ email: e.target.value })}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                        onChange={e => this.setState({ password: e.target.value })}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Stay signed in"/>
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={this.handleLogIn}>Log In</Button>
                    </Form.Group>
                </Form>
                <div className='btn1'>
                    <p>Don't have an account?</p>
                    <Link to='/signup'><Button>Sign Up</Button></Link>
                </div>
                <div className='btn1'>
                    <p>Forgot your password?</p>
                    <Link to='/'><Button>Recover password</Button></Link>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LogInPage;