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
import './workoutDetails.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';

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
            completion_date: undefined,
            workout_type: 'Running',
            distance: 0,
            sum: 0,
            calories_burnt: 0,
            time_taken: 0,
            mapjson: undefined,
            message: undefined,
            show: false,
            id: undefined,
            showDelete: false,
            showSave: false,
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
        this.setState({ showDelete: false });
        const location = this.props.location;
        if(this.state.redirect) {
            this.setState({ redirect: false });
            this.props.history.push("/allnewworkouts");
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

    handleEdit = () => {
        const editBtn = document.getElementById('editBtn');
        const deleteBtn = document.getElementById('deleteBtn');
        const completeBtn = document.getElementById('completeBtn');
        const showBtns = document.getElementsByClassName('edit');
        const disable = document.getElementsByClassName('disable');
        const editable = document.getElementsByClassName('editable');

        deleteBtn.style.display = 'none';
        editBtn.style.display = 'none';
        completeBtn.style.display = 'none';

        for (let btn of showBtns) {
            btn.style.display = 'inline';
        }

        for (let d of disable) {
            d.disabled = true;
        }

        for (let e of editable) {
            e.disabled = false;
        }

        this.addInteraction();
        this.map.on('pointermove', this.pointerMoveHandler);

        this.map.getViewport().addEventListener('mouseout', this.hiddenHandler);
        
    };

    handleSave = () => {
        let features = this.vector.getSource().getFeatures();
        const writer = new GeoJSON();
        const geojson = writer.writeFeatures(features, {featureProjection: 'EPSG:3857'});
        this.setState({ mapjson: geojson });
        console.log(geojson);

        if(this.state.completion_date === null || this.state.completion_date === undefined) {
            this.setState({ message: 'Please provide a completion date!' });
            this.setState({ show: true });
        } else if (this.state.completion_date && new Date(this.state.completion_date) < new Date()) {
            this.setState({ message: 'Invalid completion date!' });
            this.setState({ show: true });
        } else if(this.state.distance == 0) {
            console.log('distance error');
            this.setState({ message: 'Provide draw a path on the map!' });
            this.setState({ show: true });
        } else if(this.state.time_taken <= 0) {
            console.log('time error');
            this.setState({ message: 'Please provide a positive time!' });
            this.setState({ show: true });
        } else {

            Axios.post('/updateNewWorkout',
                {
                    method: 'post',
                    id: this.state.id,
                    completion_date: this.state.completion_date,
                    workout_type: this.state.workout_type,
                    mapjson: geojson,
                    distance: this.state.distance,
                    calories_burnt: this.state.calories_burnt,
                    time_taken: this.state.time_taken
                }
            ).then(
                res => {
                    if(res.data.updated) {
                        this.setState({ message: 'Changes have been saved successfully!' });
                        this.setState({ showSave: true });
                        this.setState({ redirect: true });
                    }

                }
            )
        }
    };

    handleCancel = () => {
        this.setState({ show: true });
    };

    handleDiscard = () => {
        this.setState({ show: false });

        /*
        this.setState({ id: this.props.match.params.id });
        console.log('&&&&&&&&&&&');
        console.log(this.props.location.workoutjson);
        const workout = this.props.location.workoutjson;

        console.log(workout['completion_date']);
        this.setState({ completion_date: new Date(workout['completion_date']) })
        this.setState({ workout_type: workout['workout_type'] })
        this.setState({ distance: workout['distance'] })
        this.setState({ calories_burnt: workout['calories_burnt'] })
        this.setState({ time_taken: workout['time_taken'] })
        this.setState({ mapjson: workout['mapjson'] })
        
        let features = new GeoJSON().readFeatures(workout['mapjson'], {
                            featureProjection:"EPSG:3857"
                        })
        for (let f of features) {
            this.source.addFeature(f);
        }
        */
        //console.log(this.props.location.workoutjson['completion_date']);
        const workout = this.props.location.workoutjson;
        this.setState({ completion_date: new Date(workout['completion_date']) })
        this.setState({ workout_type: workout['workout_type'] })
        this.setState({ distance: workout['distance'] })
        this.setState({ calories_burnt: workout['calories_burnt'] })
        this.setState({ time_taken: workout['time_taken'] })
        this.setState({ mapjson: workout['mapjson'] })
        
        let features = new GeoJSON().readFeatures(workout['mapjson'], {
                            featureProjection:"EPSG:3857"
                        })
        this.handleClearDrawing();
        for (let f of features) {
            this.source.addFeature(f);
        }
        
        const editBtn = document.getElementById('editBtn');
        const deleteBtn = document.getElementById('deleteBtn');
        const completeBtn = document.getElementById('completeBtn');
        const showBtns = document.getElementsByClassName('edit');
        const disable = document.getElementsByClassName('disable');
        const editable = document.getElementsByClassName('editable');

        deleteBtn.style.display = 'inline';
        editBtn.style.display = 'inline';
        completeBtn.style.display = 'inline';

        for (let btn of showBtns) {
            btn.style.display = 'none';
        }

        for (let d of disable) {
            d.disabled = true;
        }

        for (let e of editable) {
            e.disabled = true;
        }

    }

    handleDelete = () => {
        this.setState({ showDelete: true });
    }

    handleYes = () => {
        // send to backend
        // then redirect to /allnewworkouts
        Axios.post(
            '/deleteworkout',
            {
                method: 'post',
                id: this.state.id
            }
        ).then(
            res => {
                if(res.data.deleted) {
                    this.props.history.push("/allnewworkouts");
                }
            }
        );
        
    };

    handleBack = () => {
        this.props.history.push("/allnewworkouts");
    };

    handleComplete = () => {
        Axios.post(
            '/completeWorkout/id=' + this.state.id,
            {
                method: 'post',
            }
        ).then(
            res => {
                if(res.data.completed) {
                    this.setState({ message: 'Workout has been marked as completed!' });
                    this.setState({ showSave: true });
                    this.setState({ redirect: true });
                }
            }
        );
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
        this.map.setTarget("map");
        
        //this.addInteraction();
        //this.map.on('pointermove', this.pointerMoveHandler);

        //this.map.getViewport().addEventListener('mouseout', this.hiddenHandler);
        this.setState({ id: this.props.match.params.id });
        console.log('&&&&&&&&&&&');
        console.log(this.props.location.workoutjson);
        const workout = this.props.location.workoutjson;

        if(workout !== undefined) {
            //this.setState({ json: workout });
            console.log(workout['completion_date']);
            this.setState({ completion_date: new Date(workout['completion_date']) })
            this.setState({ workout_type: workout['workout_type'] })
            this.setState({ distance: workout['distance'] })
            this.setState({ calories_burnt: workout['calories_burnt'] })
            this.setState({ time_taken: workout['time_taken'] })
            this.setState({ mapjson: workout['mapjson'] })
            
            let features = new GeoJSON().readFeatures(workout['mapjson'], {
                                featureProjection:"EPSG:3857"
                            })
            for (let f of features) {
                this.source.addFeature(f);
            }
        } else {
            const url = '/getWorkoutDetails/id=' + this.props.match.params.id
            Axios.get(
                url,
                {
                    method: 'get'
                }
            ).then(
                res => {
                    console.log(res.data.workout);
                    const workout = res.data.workout;
                    //this.setState({ json: workout });
                    console.log(workout);
                    console.log(workout['completion_date']);
                    this.setState({ completion_date: new Date(workout['completion_date']) })
                    this.setState({ workout_type: workout['workout_type'] })
                    this.setState({ distance: workout['distance'] })
                    this.setState({ calories_burnt: workout['calories_burnt'] })
                    this.setState({ time_taken: workout['time_taken'] })
                    this.setState({ mapjson: workout['mapjson'] })
                    
                    let features = new GeoJSON().readFeatures(workout['mapjson'], {
                                        featureProjection:"EPSG:3857"
                                    })
                    for (let f of features) {
                        this.source.addFeature(f);
                    }
                }
            );
        }
        /*
        const url = '/getWorkoutDetails/id=' + this.props.match.params.id
        Axios.get(
            url,
            {
                method: 'get'
            }
        ).then(
            res => {
                console.log(res.data.workout);
                const workout = res.data.workout;
                console.log(workout['completion_date']);
                this.setState({ completion_date: new Date(workout['completion_date']) })
                this.setState({ workout_type: workout['workout_type'] })
                this.setState({ distance: workout['distance'] })
                this.setState({ calories_burnt: workout['calories_burnt'] })
                this.setState({ time_taken: workout['time_taken'] })
                this.setState({ mapjson: workout['mapjson'] })
                
                let features = new GeoJSON().readFeatures(workout['mapjson'], {
                                    featureProjection:"EPSG:3857"
                                })
                for (let f of features) {
                    this.source.addFeature(f);
                }
            }
        );
        */

    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    render() {
        return (
        <div>
            <h1>New Workout Details</h1>
            <Form id="new_workout_form">
                <Form.Group>
                    <Button onClick={this.handleBack}>Back</Button>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Completion Date</Form.Label>
                    <br />
                    <DatePicker disabled className='editable'
                        onChange={e => this.setState({ completion_date: e })}
                        value={this.state.completion_date}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label id='workout_type'>Workout Type</Form.Label>
                    <br />
                    <select disabled className='editable' value={this.state.workout_type} onChange={e => this.setState({ workout_type: e.target.value })}>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Draw Your Path</Form.Label>
                    <div disabled id="map" className='editable' style={{ width: "70%", height: "360px", margin: "auto"}}/>
                    <br />
                    <Button onClick={this.handleClearDrawing} className='edit'>Clear Drawing</Button>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distance (km)</Form.Label>
                    <Form.Control disabled className='disable' value={this.state.distance} type="number"
                    onChange={e => this.setState({ distance: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Calories Burnt</Form.Label>
                    <Form.Control disabled className='disable' value={this.state.calories_burnt} type="number"
                    onChange={e => this.setState({ calories_burnt: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time Taken</Form.Label>
                    <Form.Control disabled className='editable' value={this.state.time_taken} type="number"
                    onChange={e => this.setState({ time_taken: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handleEdit} id='editBtn'>Edit</Button>
                    <Button onClick={this.handleDelete} id='deleteBtn'>Delete</Button>
                    <Button onClick={this.handleComplete} id='completeBtn'>Complete</Button>
                    <Button className='edit' onClick={this.handleSave}>Save</Button>
                    <Button className='edit' onClick={this.handleCancel}>Cancel</Button>
                </Form.Group>
            </Form>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to discard all changes?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleDiscard}>
                    Discard Changes
                </Button>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this workout?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleYes}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={this.handleClose}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showSave} onHide={this.handleClose}>
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