import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpPage.css';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';


//const [value, onChange] = useState(new Date());

class SignUpPage extends React.Component {

    state = {
        show: false,
        username: '',
        email: '',
        date_of_birth: '',
        height: '',
        weight: '',
        password: '',
        confirm_password: '',
        member: false,
        error_message: '',
        redirect: false
    };

    handleSignUp = () => {

        let pattern_height = /^[1-9][0-9]{2}(\.[0-9]+)?$/
        let pattern_weight = /^[1-9][0-9]+(\.[0-9]+)?$/
        const values = Object.values(this.state);
        let size = values.filter(function(value) { return value === '' }).length;
        console.log(this.state);
        console.log(size);
        if(size > 1) {
            //console.log('error');
            this.setState({ error_message: "Please fill all fields!" });
            this.setState({ show: true });
            //console.log(this.state.error_message);
        } else {
            console.log(this.state.height);
            /*
            Axios.post('/saveSignUpData', {
                method: 'post',
                username: this.state.username
                //email: this.state.email,
                //date_of_birth: this.state.date_of_birth,
                //height: this.state.height,
                //weight: this.state.weight,
                //password: this.state.password
            }).then(
                res => {
                    if(res.data.saved) {
                        this.setState({ error_message: "You has signed up successfully!"});
                        //console.log(this.state.error_message);
                        //console.log(this.state)
                        this.setState({ show: true });
                    } else {
                        this.setState({ error_message: res.data.error_message});
                        this.setState({ show: true });
                    }
                }
            )
            */
            
            // Check username and email
            Axios.post('/checkUsernameAndEmail', 
                {
                    method: 'post',
                    username: this.state.username,
                    email: this.state.email
                }
            ).then(
                res => {
                    console.log(res);
                    if(res.data.valid) {
                        // Check date of birth
                        if(this.state.date_of_birth === '' || this.state.date_of_birth >= new Date()) {
                            this.setState({ error_message: "Invalid date of birth!" });
                        }

                        // Check height & weight 
                        if(! pattern_height.test(this.state.height) || ! pattern_weight.test(this.state.weight)) {
                            this.setState({ error_message: "Height and Weight must be positive numbers!" });
                        }
                        
                        // Check password
                        if(this.state.password !== this.state.confirm_password) {
                            this.setState({ error_message: "The new password and confirmation password do not match!"});
                        }

                    } else {
                        this.setState({ error_message: "Username or email has been registed. Please enter a new one!"});
                    }
                    
                    if(this.state.error_message !== '') {
                        this.setState({ show: true });
                        console.log(this.state)
                    } else {
                        return Axios.post('/saveSignUpData', {
                            method: 'post',
                            username: this.state.username,
                            email: this.state.email,
                            date_of_birth: this.state.date_of_birth,
                            height: this.state.height,
                            weight: this.state.weight,
                            password: this.state.password,
                            member: this.state.member
                        }).then(
                            res => {
                                if(res.data.saved) {
                                    this.setState({ error_message: "You has signed up successfully!"});
                                    //console.log(this.state.error_message);
                                    //console.log(this.state)
                                    this.setState({ show: true });
                                    this.setState({ redirect: true });
                                } 
                
                            }
                        )
                    }

                }
            )
            
        }
        
    };


    handleClose = () => {
        this.setState({ show: false });
        const location = this.props.location;
        if(this.state.redirect) {
            this.props.history.push("/login");
        } else {
            this.setState({ error_message: '' });
        }
    };

    
    render() {
        return (
            <div id='signup'>
                <h2 id="title">Sign Up</h2>
                <div id="form_container">
                    <Form id="signup_form">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                            onChange={e => this.setState({ username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email"
                            onChange={e => this.setState({ email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <br />
                            <DatePicker
                                onChange={e => this.setState({ date_of_birth: e })}
                                value={this.state.date_of_birth}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Height (cm)</Form.Label>
                            <Form.Control type="number"
                            onChange={e => this.setState({ height: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control type="number"
                            onChange={e => this.setState({ weight: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                            onChange={e => this.setState({ password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password"
                            onChange={e => this.setState({ confirm_password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Member Subscription</Form.Label>
                            <Form.Control type="checkbox"
                            onChange={e => this.setState({ member: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={this.handleSignUp}>Submit</Button>
                        </Form.Group>
                    </Form>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.error_message}</Modal.Body>
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

export default SignUpPage;