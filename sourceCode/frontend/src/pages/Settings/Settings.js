import React from 'react';
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Settings.css';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';


class Settings extends React.Component {

    state = {
        new_email: undefined,
        old_email: undefined,
        new_password: undefined,
        old_height: undefined,
        old_weight: undefined,
        new_height: undefined,
        new_weight: undefined,
        show: false,
        message: undefined,
        redirect: false
    }

    
    componentDidMount() {
        Axios.get(
            '/loggedIn',
            {
                method: 'get'
            }
        ).then(
            res => {
                if(! res.data.loggedin) {
                    this.props.history.push("/");
                }
            }
        );
        Axios.get(
            '/getUserInfo',
            {
              method: 'get'
            }
          ).then(
            res => {
                this.setState({ old_email: res.data.old_email });
                this.setState({ old_height: res.data.old_height });
                this.setState({ old_weight: res.data.old_weight });
                //this.setState({ goals: res.data.goals });
                //this.setState({ recommendations: res.data.recommendations })
            }
        );
    };

    handleEmailPassword = () => {

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        if(email.disabled) {
            console.log('email disabled');

            // Check if password is undefined
            if(this.state.password === undefined || this.state.password === null) {
                this.setState({ show:true });
                this.setState({ message:'Please provide a new password!' });
            } else {
                Axios.post(
                    '/updateEmailPassword',
                    {
                        method: 'post',
                        old_email: this.state.old_email,
                        new_email: '',
                        new_password: this.state.new_password
                    }
                ).then(
                    res => {
                        if(res.data.updated) {
                            this.setState({ show: true });
                            this.setState({ redirect: true });
                            this.setState({ message: 'Password has been updated successfully!' });
                        }
                    }
                );
            }
        } else if(password.disabled) {
            console.log('password disabled');
            // Check if email is undefined
            if(this.state.email === undefined || this.state.email === null) {
                this.setState({ show:true });
                this.setState({ message:'Please provide a new email address!' });
            } else {
                Axios.post(
                    '/updateEmailPassword',
                    {
                        method: 'post',
                        old_email: this.state.old_email,
                        new_email: this.state.new_email,
                        new_password: ''
                    }
                ).then(
                    res => {
                        if(res.data.updated) {
                            this.setState({ show: true });
                            this.setState({ redirect: true });
                            this.setState({ message: 'Password has been updated successfully!' });
                        }
                    }
                );
            }
        }
    };

    handleHeightWeight = () => {
        Axios.post(
            '/updateHeightWeight',
            {
                method: 'post',
                new_height: this.state.new_height,
                new_weight: this.state.new_weight
            }
        ).then(
            res => {
                if(res.data.updated) {
                    this.setState({ show: true })
                    this.setState({ message: 'Height/Weight has been updated successfully!' });
                }
            }
        );
    };

    handleEmail = () => {
        const btn1 = document.getElementsByClassName('btn1');
        const btns = document.getElementsByClassName('change1');
        //submitBtn.style.display = 'block';
        for(let btn of btn1) {
            btn.style.display = 'inline';
        }

        for(let btn of btns) {
            btn.style.display = 'none';
        }
        const email = document.getElementById('email')
        email.disabled = false;
    }

    handlePassword = () => {
        const btn1 = document.getElementsByClassName('btn1');
        const btns = document.getElementsByClassName('change1');
        //submitBtn.style.display = 'block';
        for(let btn of btn1) {
            btn.style.display = 'inline';
        }

        for(let btn of btns) {
            btn.style.display = 'none';
        }
        const password = document.getElementById('password')
        password.disabled = false;
    }

    handleHeight = () => {
        const btn2 = document.getElementsByClassName('btn2');
        const btns = document.getElementsByClassName('change2');
        
        for(let btn of btn2) {
            btn.style.display = 'inline';
        }

        for(let btn of btns) {
            btn.style.display = 'none';
        }
        const height = document.getElementById('height')
        height.disabled = false;
    }

    handleWeight = () => {
        const btn2 = document.getElementsByClassName('btn2');
        const btns = document.getElementsByClassName('change2');
        
        for(let btn of btn2) {
            btn.style.display = 'inline';
        }

        for(let btn of btns) {
            btn.style.display = 'none';
        }
        const weight = document.getElementById('weight')
        weight.disabled = false;
    }

    handleCancel = () => {
        const btn1 = document.getElementsByClassName('btn1');
        const btns1 = document.getElementsByClassName('change1');
        for(let btn of btn1) {
            btn.style.display = 'none';
        }
        for(let btn of btns1) {
            btn.style.display = 'inline';
        }
        const password = document.getElementById('password')
        password.setAttribute('value', '')
        password.disabled = true;
        const email = document.getElementById('email')
        email.disabled = true;
        email.setAttribute('value', '')
        


        const btn2 = document.getElementsByClassName('btn2');
        const btns2 = document.getElementsByClassName('change2');
        for(let btn of btn2) {
            btn.style.display = 'none';
        }
        for(let btn of btns2) {
            btn.style.display = 'inline';
        }
        const weight = document.getElementById('weight');
        weight.disabled = true;
        weight.setAttribute('value', '')
        const height = document.getElementById('height');
        height.disabled = true;
        height.setAttribute('value', '')

    }

    handleClose = () => {
        this.setState({ show: false });
        if(this.state.redirect) {
            this.props.history.push("/login");
        }
    }


    render() {
        return (
            <div>
                <video src='running.mp4' autoPlay loop muted/>
                <h1>Update User Info</h1>
                <Link to='/home'><Button id='backBtn'>Back</Button></Link>
                <CardColumns>
                    <Card className="card_item">
                        <Card.Body>
                        <Card.Title>Change Email/Password</Card.Title>
                        <Form>
                            <Form.Group>
                                <div>Current Email Address: {this.state.old_email}</div>
                                <Form.Label>New Email Address:</Form.Label>
                                <Form.Control disabled type="email" id='email'
                                onChange={e => this.setState({ email: e.target.value })}/>
                            </Form.Group>
                            <Form.Group>
                                <div></div>
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control disabled type="password" id='password'
                                onChange={e => this.setState({ password: e.target.value })}/>
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={this.handleEmailPassword} className='btn1'>Submit</Button>
                                <Button onClick={this.handleCancel} className='btn1'>Cancel</Button>
                                <Button onClick={this.handleEmail} className='change1'>Change Email</Button>
                                <Button onClick={this.handlePassword} className='change1'>Change Password</Button>
                            </Form.Group>
                        </Form>
                        </Card.Body>
                    </Card>

                    <Card className="card_item">
                        <Card.Body>
                        <Card.Title>Change Height/Weight</Card.Title>
                        
                        <Form>
                            <Form.Group>
                                <div>Current Height: {this.state.old_height} cm</div>
                                <Form.Label>New Height:</Form.Label>
                                <Form.Control disabled type="number" id='height'
                                onChange={e => this.setState({ email: e.target.value })}/>
                            </Form.Group>
                            <Form.Group>
                                <div>Current Weight: {this.state.old_weight} kg</div>
                                <Form.Label>New Weight:</Form.Label>
                                <Form.Control disabled type="number" id='weight'
                                onChange={e => this.setState({ password: e.target.value })}/>
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={this.handleHeightWeight} className='btn2'>Submit</Button>
                                <Button onClick={this.handleCancel} className='btn2'>Cancel</Button>
                                <Button onClick={this.handleHeight} className='change2'>Change Height</Button>
                                <Button onClick={this.handleWeight} className='change2'>Change Weight</Button>
                            </Form.Group>
                        </Form> 

                        </Card.Body>
                    </Card>
                </CardColumns>
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

export default Settings;