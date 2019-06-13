import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet";
import {
    MarkerClusterGroup
} from 'leaflet.markercluster'
// Leaflet()


const createMap = (divId, options) => {
    let map = Leaflet.map(divId, options);
    // this.map = map;
    return map;
};
const createTileLayer = async (map, url, options) => {
    let tileLayer = await Leaflet.tileLayer(url, options);
    tileLayer.addTo(map);
    return tileLayer;
};
const createCLS = (map) => {
    var markers = MarkerClusterGroup();
    // markers.addLayer(Leaflet.marker(Leaflet.getRandomLatLng(map)));
    // markers.addLayer(Leaflet.marker(Leaflet.getRandomLatLng(map)));
    // markers.addLayer(Leaflet.marker(Leaflet.getRandomLatLng(map)));
    map.addLayer(markers);
}


export default {
    createMap,
    createTileLayer,
    createCLS
};