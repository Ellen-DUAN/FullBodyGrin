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
import './oldWorkoutDetails.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

const posViena = proj.fromLonLat([151.2253, -33.9173]);

export default class PlanNewWorkout extends Component {
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
            show: false,
            id: undefined,
            showDelete: false
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
                e.innerHTML = output;
                //this.measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', () => {

            const e = document.getElementById('measureTooltipElement');
            e.className = 'ol-tooltip ol-tooltip-static';
            
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

    
    handleClose = () => {
        this.setState({ show: false });
        this.props.history.push("/alloldworkouts");
    };

    handleReuse = () => {
        Axios.post(
            '/reUseOldWorkout',
            {
                method: 'post',
                id: this.props.match.params.id
            }
        ).then(
            res => {
                if(res.data.reuse) {
                    this.setState({ show: true });
                }
            }
        );
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
    
        this.setState({ id: this.props.match.params.id });
        const workout = this.props.location.workoutjson;

        if(workout !== undefined) {
            //console.log(workout['completion_date']);
            this.setState({ date: new Date(workout['date']) });
            this.setState({ workout_type: workout['workout_type'] });
            this.setState({ distance: workout['distance'] });
            this.setState({ calories_burnt: workout['calories_burnt'] });
            this.setState({ time_spent: workout['time_spent'] });
            this.setState({ mapjson: workout['mapjson'] });
            this.setState({ pace: workout['pace'] });
            
            let features = new GeoJSON().readFeatures(workout['mapjson'], {
                                featureProjection:"EPSG:3857"
                            })
            for (let f of features) {
                this.source.addFeature(f);
            }
        } else {
            const url = '/getOldWorkoutDetails/id=' + this.props.match.params.id
            Axios.get(
                url,
                {
                    method: 'get'
                }
            ).then(
                res => {
                    console.log(res.data.workout);
                    const workout = res.data.workout;
                
                    this.setState({ completion_date: new Date(workout['date']) });
                    this.setState({ workout_type: workout['workout_type'] });
                    this.setState({ distance: workout['distance'] });
                    this.setState({ calories_burnt: workout['calories_burnt'] });
                    this.setState({ time_spent: workout['time_spent'] });
                    this.setState({ mapjson: workout['mapjson'] });
                    this.setState({ pace: workout['pace'] });
                    
                    let features = new GeoJSON().readFeatures(workout['mapjson'], {
                                        featureProjection:"EPSG:3857"
                                    })
                    for (let f of features) {
                        this.source.addFeature(f);
                    }
                }
            );
        }

    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    render() {
        return (
        <div>
            <h1>Old Workout Details</h1>
            <Form id="new_workout_form">
                <Form.Group>
                    <Link to='/alloldworkouts'><Button>Back</Button></Link>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <br />
                    <DatePicker disabled
                        value={this.state.date}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label id='workout_type'>Workout Type</Form.Label>
                    <br />
                    <select disabled value={this.state.workout_type}>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Draw Your Path</Form.Label>
                    <div readOnly id="map" style={{ width: "70%", height: "360px", margin: "auto"}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distance (km)</Form.Label>
                    <Form.Control readOnly className='disable' value={this.state.distance} type="number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Calories Burnt</Form.Label>
                    <Form.Control readOnly className='disable' value={this.state.calories_burnt} type="number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time Spent</Form.Label>
                    <Form.Control readOnly value={this.state.time_spent} type="number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pace</Form.Label>
                    <Form.Control readOnly value={this.state.pace} type="number"/>
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handleReuse}>Reuse</Button>
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