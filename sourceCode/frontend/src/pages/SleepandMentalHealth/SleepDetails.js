import React, { Component } from "react";
import * as proj from 'ol/proj';
import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Fill, Stroke, Style} from 'ol/style';
import {OSM, TileJSON, Vector as VectorSource} from 'ol/source';
import {LineString} from 'ol/geom';
import {getLength} from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import {unByKey} from 'ol/Observable';
import GeoJSON from 'ol/format/GeoJSON';
import './SleepDetails.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import ok from './images/ok.png';
import happy from './images/happy.png';
import unhappy from './images/unhappy.png';
import Figure from 'react-bootstrap/Figure';


export default class PlanNewWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: undefined,
            time: 0,
            feeling: undefined,
            figure: undefined
        };
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
       
    
        this.setState({ id: this.props.match.params.id });
        const sleep = this.props.location.sleepjson;

        if(sleep !== undefined) {
            //console.log(workout['completion_date']);
            this.setState({ date: new Date(sleep['date']) });
            this.setState({ time: sleep['time'] });
            this.setState({ feeling: sleep['feeling'] });
            if(sleep['feeling'] === 'happy') {
                this.setState({ figure: happy });
            } else if(sleep['feeling'] === 'ok') {
                this.setState({ figure: ok });
            } else if(sleep['feeling'] === 'unhappy') {
                this.setState({ figure: unhappy });
            }
        } else {
            const url = '/getSleepDetails/id=' + this.props.match.params.id
            Axios.get(
                url,
                {
                    method: 'get'
                }
            ).then(
                res => {
                    console.log(res.data.sleep);
                    const sleep = res.data.sleep;
                
                    this.setState({ date: new Date(sleep['date']) });
                    this.setState({ time: sleep['time'] });
                    this.setState({ feeling: sleep['feeling'] });
                    if(sleep['feeling'] === 'happy') {
                        this.setState({ figure: happy });
                    } else if(sleep['feeling'] === 'ok') {
                        this.setState({ figure: ok });
                    } else if(sleep['feeling'] === 'unhappy') {
                        this.setState({ figure: unhappy });
                    }
                }
            );
        }

    }

    render() {
        return (
        <div>
            <h1>Sleep Details</h1>
            <Form id="new_workout_form">
                <Form.Group>
                    <Link to='/viewsleep'><Button>Back</Button></Link>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <br />
                    <DatePicker disabled
                        value={this.state.date}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time Asleep</Form.Label>
                    <Form.Control readOnly value={this.state.time} type="number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Feeling</Form.Label>
                    <Figure.Image id='img'
                        width={40}
                        height={40}
                        src={this.state.figure}
                    />
                </Form.Group>
            </Form>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>This workout has been added to upcoming workouts!</Modal.Body>
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