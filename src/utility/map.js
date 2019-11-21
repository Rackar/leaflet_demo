import "leaflet/dist/leaflet.css";
import $L from "leaflet";
// 引入 leaflet.markercluster
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

import "leaflet.chinatmsproviders";

// 解决默认 maker 无法显示的问题
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = $L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

const createMap = (divId, options) => {
  let map = $L.map(divId, options);
  // this.map = map;
  return map;
};
const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};

const chinaProvider = (name, option, map) => {
  return $L.tileLayer.chinaProvider(name, option).addTo(map);
};

const createMakerCluster = () => {
  return $L.markerClusterGroup();
};

const getRandomLatLng = map => {
  let bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return $L.latLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
};

const createMakerByLatlng = latlng => {
  return $L.marker(latlng);
};

export default {
  createMap,
  createTileLayer,
  createMakerCluster,
  getRandomLatLng,
  createMakerByLatlng,
  chinaProvider
};
