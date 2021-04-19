import React, { Component } from "react";
import * as proj from 'ol/proj';

import 'ol/ol.css';
//import Draw from 'ol/interaction/Draw';
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
import './logWorkout.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

const posViena = proj.fromLonLat([151.2253, -33.9173]);

export default class LogWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = { center: posViena,
            zoom: 17,
            sketch: undefined,
            helpTooltipElement: undefined,
            helpTooltip: undefined,
            measureTooltipElement: undefined,
            measureTooltip: undefined,
            features: [],
            date: undefined,
            workout_type: 'Running',
            distance: 0,
            sum: 0,
            calories_burnt: 0,
            time_spent: 0,
            pace: 0,
            mapjson: undefined,
            message: undefined,
            show: false
        };

        this.source = new VectorSource();

        this.v = new TileLayer({
                    source: new OSM()
                });
        
        this.vector = new VectorLayer({
            source: this.source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: '#de1818',
                    width: 3,
                }),
            }),
        });
    

        this.map = new Map({
            target: null, // set this in componentDidMount
            layers: [
                this.v,
                this.vector
            ],
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });
    }    

    formatLength = (props) => {
        console.log('--------');
        console.log(props);
        const length = getLength(props.name);
        let output;
        if (length > 100) {
          output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
          output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    };

    createMeasureTooltip = () => {

        let element1 = document.createElement('div');
        element1.className = 'ol-tooltip ol-tooltip-measure';
        element1.id = 'measureTooltipElement';

        if(this.state.measureTooltipElement !== undefined) {
            const e = document.getElementById('measureTooltipElement');
            e.parentNode.removeChild(e);
            this.setState({ measureTooltipElement: undefined });
        }
        //this.setState({ measureTooltipElement: element });
        this.setState({ measureTooltipElement: element1 });
        //this.measureTooltipElement = element;

        console.log(this.state.measureTooltipElement);

        const measureTooltip = new Overlay({
            element: element1,//this.state.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        this.setState({ measureTooltip: measureTooltip });
        this.map.addOverlay(measureTooltip);
        console.log(this.state.measureTooltipElement);
        
    }

    createHelpTooltip = () => {

        let element1 = document.createElement('div');
        element1.className = 'ol-tooltip hidden';
        element1.id = 'helpTooltipElement';

        if(this.state.helpTooltipElement !== undefined) {
            const e = document.getElementById('helpTooltipElement');
            e.parentNode.removeChild(e);
            this.setState({ helpTooltipElement: undefined });
        }
        //console.log(element);
        this.setState({ helpTooltipElement: element1});
        //this.helpTooltipElement = element;

        const helpTooltip = new Overlay({
            element: element1,//this.state.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        this.setState({ helpTooltip: helpTooltip });
        this.map.addOverlay(helpTooltip);

        console.log(this.state.helpTooltipElement);
        
    }


    addInteraction = () => {
        //const type = 'LinString';

        let draw = new Draw({
            source: this.source,
            type: 'LineString',
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
            }),
        });

        this.map.addInteraction(draw);

        this.createMeasureTooltip();
        this.createHelpTooltip();

        console.log(this.state.measureTooltipElement);
        console.log(this.state.helpTooltipElement);

        let listener;

        draw.on('drawstart', (evt) => {
            // set sketch
            console.log('*************');
            console.log(evt.feature);

            this.setState({ sketch: evt.feature });
            console.log(this.sketch);
            
            /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
            let tooltipCoord = evt.coordinate;
        
            listener = this.state.sketch.getGeometry().on('change', (evt) => {
                let geom = evt.target;
                let tooltipCoord;
                let output;
                if (geom instanceof LineString) {
                    const length = getLength(geom);
                    //let output;
                    output = Math.round((length / 1000) * 100) / 100
                    
                    tooltipCoord = geom.getLastCoordinate();
                }

                const e = document.getElementById('measureTooltipElement');
                const sum = this.state.sum;
                this.setState({ distance: output + sum });
                //let d_array = this.state.distances
                //this.setState
                e.innerHTML = output;
                //this.measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', () => {

            const e = document.getElementById('measureTooltipElement');
            e.className = 'ol-tooltip ol-tooltip-static';
            //this.measureTooltip.setOffset([0, -7]);
            // unset sketch
            this.setState({ sketch: undefined });

            const distance = this.state.distance;
            const sum = this.state.sum;
            this.setState({ sum: sum + distance });
            //this.sketch = null;
            // unset tooltip so that a new one can be created
            this.measureTooltipElement = null;
            this.createMeasureTooltip();
            unByKey(listener);
        });


    }
    
    pointerMoveHandler = (evt) => {
        if (evt.dragging) {
            return;
        }
        let helpMsg = 'Click to start drawing';
        if (this.state.sketch !== undefined) {
            var geom = this.state.sketch.getGeometry();
            if (geom instanceof LineString) {
                helpMsg = 'Click to continue drawing the line';
            }
        }
        const e = document.getElementById('helpTooltipElement');
        e.innerHTML = helpMsg;
        e.classList.remove('hidden');
    };

    hiddenHandler = () => {

        const e = document.getElementById('helpTooltipElement');
        e.classList.add('hidden');
    };

    handleLogWorkout = () => {

        let features = this.vector.getSource().getFeatures();
        const writer = new GeoJSON();
        const geojson = writer.writeFeatures(features, {featureProjection: 'EPSG:3857'});
        this.setState({ mapjson: geojson });
        console.log(geojson);

        console.log('Saving workout...');
        console.log(this.state.date);

        if(this.state.date === null || this.state.date === undefined) {
            this.setState({ message: 'Please provide a date!' });
            this.setState({ show: true });
        } else if (this.state.date && new Date(this.state.date) > new Date()) {
            this.setState({ message: 'Date must be before today!' });
            this.setState({ show: true });
        } else if(this.state.distance == 0) {
            console.log('distance error');
            this.setState({ message: 'Provide draw a path on the map!' });
            this.setState({ show: true });
        } else if(this.state.time_spent <= 0) {
            console.log('time error');
            this.setState({ message: 'Please provide a positive time!' });
            this.setState({ show: true });
        } else {

            Axios.post('/logWorkout',
                {
                    method: 'post',
                    date: this.state.date,
                    workout_type: this.state.workout_type,
                    mapjson: geojson,
                    distance: this.state.distance,
                    calories_burnt: this.state.calories_burnt,
                    time_spent: this.state.time_spent,
                    pace: this.state.pace
                }
            ).then(
                res => {
                    if(res.data.saved) {
                        this.setState({ message: "A workout has been logged successfully" });
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
            this.props.history.push("/home");
        }
    };

    handleClearDrawing = () => {
        let features = this.vector.getSource().getFeatures();
        features.forEach((feature) => {
            this.vector.getSource().removeFeature(feature);
        });
        this.setState({ distance: 0 });
        this.setState({ sum: 0 });
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
        this.map.setTarget("map");
        
        this.addInteraction();
        this.map.on('pointermove', this.pointerMoveHandler);

        this.map.getViewport().addEventListener('mouseout', this.hiddenHandler);

    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    render() {
        return (
        <div>
            <h1>Log Workout</h1>
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
                    <Form.Label id='workout_type'>Workout Type</Form.Label>
                    <br />
                    <select value={this.state.workout_type} onChange={e => this.setState({ workout_type: e.target.value })}>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Draw Your Path</Form.Label>
                    <div id="map" style={{ width: "70%", height: "360px", margin: "auto"}}/>
                    <br />
                    <Button onClick={this.handleClearDrawing}>Clear Drawing</Button>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distance (km)</Form.Label>
                    <Form.Control disabled value={this.state.distance} type="number"
                    onChange={e => this.setState({ distance: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Calories Burnt</Form.Label>
                    <Form.Control disabled value={this.state.calories_burnt} type="number"
                    onChange={e => this.setState({ calories_burnt: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time Spent (Minutes) </Form.Label>
                    <Form.Control value={this.state.time_spent} type="number"
                    onChange={e => this.setState({ time_spent: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pace</Form.Label>
                    <Form.Control disabled value={this.state.pace} type="number"
                    onChange={e => this.setState({ pace: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handleLogWorkout}>Submit</Button>
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