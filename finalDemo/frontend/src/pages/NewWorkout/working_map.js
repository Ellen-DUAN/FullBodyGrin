import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Map from "ol/Map.js";
import View from "ol/View.js";
import Overlay from "ol/Overlay.js";
import LayerTile from "ol/layer/Tile.js";
import SourceOSM from "ol/source/OSM.js";
import * as proj from 'ol/proj';
import './PlanNewWorkout.css';

const posViena = proj.fromLonLat([16.3725, 48.208889]);

export default class PlanNewWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = { center: posViena, zoom: 3 };

    this.map = new Map({
      target: null, // set this in componentDidMount
      layers: [
        new LayerTile({
          source: new SourceOSM()
        })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.map.setTarget("map");
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
  }

  componentWillUnmount() {
    this.map.setTarget(null);
  }

  render() {
    return (
      <div>
        <div id="map" style={{ width: "100%", height: "360px" }}/>
        <div className="blue-circle" id="overlay" title="overlay"/>
        <div className="blue-circle" id="popup" title="Welcome to OpenLayers"/>
      </div>
    );
  }
}