import React, { Component } from "react";
import ReactDOM from 'react-dom';
//import Map from "ol/Map.js";
//import View from "ol/View.js";
//import Overlay from "ol/Overlay.js";
import LayerTile from "ol/layer/Tile.js";
import SourceOSM from "ol/source/OSM.js";
import * as proj from 'ol/proj';

import 'ol/ol.css';
//import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {LineString, Polygon} from 'ol/geom';
import {getLength} from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import {unByKey} from 'ol/Observable';
import GeoJSON from 'ol/format/GeoJSON';
import Axios from 'axios';
import './PlanNewWorkout.css';
import { textHeights } from "ol/render/canvas";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            features: []
        };
        /*
        this.sketch = undefined;
        this.helpTooltipElement = undefined;
        this.helpTooltip = undefined;
        this.measureTooltipElement = undefined;
        this.measureTooltip = undefined;
        */

        this.source = new VectorSource();

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
                new TileLayer({
                source: new OSM()
                }),
                this.vector
            ],
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });


        //this.formatLength = this.formatLength.bind(this)
        //this.createMeasureTooltip = this.createMeasureTooltip.bind(this)
        //this.createHelpTooltip = this.createHelpTooltip.bind(this)
        //this.addInteraction = this.addInteraction.bind(this)
        //this.pointerMoveHandler = this.pointerMoveHandler.bind(this)
        //this.hiddenHandler = this.hiddenHandler.bind(this)
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

        this.map.addOverlay(measureTooltip);
        console.log(this.state.measureTooltipElement);
        /*
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        //this.setState({ measureTooltipElement: document.createElement('div') });
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        const measureTooltip = new Overlay({
            element: this.state.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        this.map.addOverlay(measureTooltip);

        console.log(this.measureTooltipElement);
        */
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
        this.map.addOverlay(helpTooltip);

        console.log(this.state.helpTooltipElement);
        /*
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'ol-tooltip hidden';
        console.log()
        const helpTooltip = new Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        this.map.addOverlay(helpTooltip);
        */
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

            let f = this.state.features;
            f.push(evt.feature);
            this.setState({ features: f });

            const writer = new GeoJSON();
            const geojson = writer.writeFeatures(this.state.features, {featureProjection: 'EPSG:3857'});
            console.log('Saving......');
            console.log(geojson);
            console.log('Saving completed......');
            //this.sketch = evt.feature;
        
            /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
            let tooltipCoord = evt.coordinate;
        
            listener = this.state.sketch.getGeometry().on('change', function (evt) {
                let geom = evt.target;
                let output;
                let tooltipCoord;
                if (geom instanceof LineString) {
                    const length = getLength(geom);
                    //let output;
                    if (length > 100) {
                        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
                    } else {
                        output = Math.round(length * 100) / 100 + ' ' + 'm';
                    }
                    //output = this.formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }

                const e = document.getElementById('measureTooltipElement');
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
        //this.helpTooltip.setPosition(evt.coosketchrdinate);
        e.classList.remove('hidden');
    };

    hiddenHandler = () => {

        const e = document.getElementById('helpTooltipElement');
        e.classList.add('hidden');
    }

    componentDidMount() {
        this.map.setTarget("map");
        console.log('create Help Tool Tip');
        //this.createHelpTooltip();
        this.addInteraction();
        console.log('--------------');
        console.log(this.helpTooltipElement);
        console.log(this.measureTooltipElement);
        console.log('---------------');
        this.map.on('pointermove', this.pointerMoveHandler);

        this.map.getViewport().addEventListener('mouseout', this.hiddenHandler);

        //const typeSelect = document.getElementById('type');
        /*
        typeSelect.onchange = function () {
            this.map.removeInteraction(thisdraw);
            this.addInteraction();
        };
        */


        /*
        // Listen to map changes
        this.map.on("moveend", () => {
        let center = this.map.getView().getCenter();
        let zoom = this.map.getView().getZoom();
        this.setState({ center, zoom });
        });

        // Basic overlay
        const overlay = new Overlay({
        position: posViena,
        element: ReactDOM.findDOMNode(this).querySelector('#overlay'),
        positioning: 'center-center',
        stopEvent: false
        });
        this.map.addOverlay(overlay);

        // Popup showing the position the user clicked
        this.popup = new Overlay({
        element: ReactDOM.findDOMNode(this).querySelector('#popup')
        });

        // Listener to add Popup overlay showing the position the user clicked
        this.map.on('click', evt => {
        this.popup.setPosition(evt.coordinate);
        this.map.addOverlay(this.popup);
        })
        */
    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    render() {
        return (
        <div>

            <div id="map" style={{ width: "100%", height: "360px" }}/>
        </div>
        );
    }
}