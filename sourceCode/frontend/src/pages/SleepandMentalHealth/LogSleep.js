import React, { Component } from "react";
import * as proj from 'ol/proj';

import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {LineString} from 'ol/geom';
import {getLength} from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import {unByKey} from 'ol/Observable';
import GeoJSON from 'ol/format/GeoJSON';
import './LogSleep.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import happy from './images/happy.png';
import ok from './images/ok.png';
import unhappy from './images/unhappy.png';


export default class LogSleep extends React.Component {

    state = { 
        date: undefined,
        time: 0,
        message: undefined,
        mental_health: undefined,
        show: false,
        redirect: false,
        feeling: undefined
    };  


    handleClose = () => {
        this.setState({ show: false });
        if(this.state.redirect) {
            this.props.history.push("/home");
        }
    };

    handleSleep = () => {

        const checkboxes = document.getElementsByClassName('form-check-input');
        console.log(checkboxes);
        let checked = 0;
        let b;
        for (let box of checkboxes) {
            console.log(box.id);
            if(box.checked) {
                checked = checked + 1;
                b = box;
                //this.setState({ feeling: box.id });
            }
        }

        console.log(this.state.feeling);
        //console.log(new Date(this.state.date));
        if(this.state.date === undefined || this.state.date === null) {
            this.setState({ show: true })
            this.setState({ message: 'Please provide a date!' });
        } else if(this.state.date > new Date()) {
            this.setState({ show: true })
            this.setState({ message: 'Date must not be after today!' });
        } else if(this.state.time === undefined || this.state.time <= 0) {
            this.setState({ show: true })
            this.setState({ message: 'Time asleep must be a positive number!' });
        } else if(checked !== 1) {
            this.setState({ show: true });
            this.setState({ message: 'Please select only one checkbox!' });
        } else {
            Axios.post(
                '/logSleep',
                {
                    method: 'post',
                    date: this.state.date,
                    time: this.state.time,
                    feeling: b.id
                }
            ).then(
                res => {
                    if(res.data.saved) {
                        this.setState({ show:true });
                        this.setState({ redirect:true });
                        this.setState({ message: 'New sleep data has been logged!' });
                    }
                    else {
                        this.setState({ message: "Upgrade to full membership to log more sleeps" });
                        this.setState({ show: true });
                        this.setState({ redirect: false });
                    }
                }
            );
        }
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
    }

    render() {
        return (
        <div>
            <h1>Log Sleep</h1>
            <Form id="new_workout_form">
                <Form.Group>
                    <Form.Group>
                        <Link to='/home'><Button>Back</Button></Link>
                    </Form.Group>
                    <Form.Label>Date</Form.Label>
                    <br />
                    <DatePicker
                        onChange={e => this.setState({ date: e })}
                        value={this.state.date}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time Asleep</Form.Label>
                    <Form.Control value={this.state.time} type="number"
                    onChange={e => this.setState({ time: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>How are you feeling today?</Form.Label>
                    <Form.Check type="checkbox" label="" id='happy'/>
                    <Figure.Image id='happyImg'
                        width={40}
                        height={40}
                        src={happy}
                    />
                    <Form.Check type="checkbox" label="" id='ok'/>
                    <Figure.Image id='okImg'
                        width={40}
                        height={40}
                        src={ok}
                    />
                    <Form.Check type="checkbox" label="" id='unhappy'/>
                    <Figure.Image id='unhappyImg'
                        width={40}
                        height={40}
                        src={unhappy}
                    />
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handleSleep}>Submit</Button>
                </Form.Group>
            </Form>
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