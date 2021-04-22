import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Polygon} from 'ol/geom';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getArea, getLength} from 'ol/sphere';
import {unByKey} from 'ol/Observable';

var map = new ol.Map({
    target: 'map',
    layers: [
    new ol.layer.Tile({
        source: new ol.source.OSM()
    })
    ],
    view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4
    })
});