import React, { Component } from "react";
import * as proj from 'ol/proj';

import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, TileJSON, Vector as VectorSource} from 'ol/source';
import {LineString, Polygon} from 'ol/geom';
import {getLength} from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import {unByKey} from 'ol/Observable';
import GeoJSON from 'ol/format/GeoJSON';
import './Goal.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';


export default class Goal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: undefined,
            workout_type: 'Running',
            distance: 0,
            calories_burnt: 0,
            time_spent: 0,
            message: undefined,
            show: false
        };

        
    }    


    handleGoal = () => {

        
        if(this.state.date === null || this.state.date === undefined) {
            this.setState({ message: 'Please provide a date!' });
            this.setState({ show: true });
        } else if (this.state.date && new Date(this.state.date) <= new Date()) {
            this.setState({ message: 'Date must be after today!' });
            this.setState({ show: true });
        } else if(this.state.time_spent == 0 && this.state.calories_burnt == 0 && this.state.distance == 0) {
            this.setState({ message: "Please fill at least one of 'Total Distance Travelled', 'Total Calories Burnt' and 'Total Time Spent'!" });
            this.setState({ show: true });
        } else if(this.state.time_spent < 0 && this.state.calories_burnt < 0 && this.state.distance < 0) {
            this.setState({ message: "Please enter positive numbers!" });
            this.setState({ show: true });
        } else {

            Axios.post('/createNewGoal',
                {
                    method: 'post',
                    completion_date: this.state.date,
                    workout_type: this.state.workout_type,
                    total_distance: this.state.distance,
                    total_calories: this.state.calories_burnt,
                    total_time: this.state.time_spent
                }
            ).then(
                res => {
                    if(res.data.saved) {
                        this.setState({ message: "A new goal has been created successfully" });
                        this.setState({ show: true });
                    }
                    this.setState({ redirect: true });
                }
            )
        }

    }

    handleClose = () => {
        this.setState({ show: false });
        const location = this.props.location;
        if(this.state.redirect) {
            this.props.history.push("/alloldworkouts");
        }
    };

    
    handleBack = () => {
        this.props.history.push("/alloldworkouts");
    };

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
            <h1>Create New Goal</h1>
            <Form id="new_workout_form">
                <Form.Group>
                    <Form.Group>
                        <Button onClick={this.handleBack}>Back</Button>
                    </Form.Group>
                    <Form.Label>Completion Date</Form.Label>
                    <br />
                    <DatePicker
                        onChange={e => this.setState({ date: e })}
                        value={this.state.date}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label id='workout_type'>Workout Type</Form.Label>
                    <br />
                    <select value={this.state.workout_type} onChange={e => this.setState({ workout_type: e.target.value })}>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label id='workout_type'>Please fill at least one of the three following fields</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total Distance Travelled (km)</Form.Label>
                    <Form.Control value={this.state.distance} type="number"
                    onChange={e => this.setState({ distance: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total Calories Burnt</Form.Label>
                    <Form.Control value={this.state.calories_burnt} type="number"
                    onChange={e => this.setState({ calories_burnt: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total Time Spent</Form.Label>
                    <Form.Control value={this.state.time_spent} type="number"
                    onChange={e => this.setState({ time_spent: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handleGoal}>Submit</Button>
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