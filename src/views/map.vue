<template>
  <div>
    <div class="map-container" id="map-container"></div>
    <zoomButtons @zoomIn="zoomIn" @zoomOut="zoomOut" @resetMap="resetMap"></zoomButtons>
  </div>
</template>

<script>
import zoomButtons from "../components/zoomButtons";
import $L from "leaflet";
import { MarkerClusterGroup } from "leaflet.markercluster";
export default {
  //   name: "map",
  components: { zoomButtons },
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container", {
      zoomControl: false
    });
    // 加载 open street map 图层服务
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});

    // 设施地图视图 中心位置
    this.map.setView([41.105, 116], 8);
    // var markers = MarkerClusterGroup();
    // this.$utils.map.createCLS(this.map);
    var markers = $L.MarkerClusterGroup();
  },

  methods: {
    zoomIn() {
      this.map.zoomIn();
    },
    zoomOut() {
      this.map.zoomOut();
    },
    resetMap() {
      this.map.setView([41.105, 116], 8);
      //   this.map.flyTo([41.105, 116], 8);
      //     this.map.panTo([41.105, 116]);
    }
  }
};
</script>
<style lang="scss">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

