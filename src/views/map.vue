<template>
  <div>
    <div class="map-container" id="map-container"></div>
    <zoomButtons
      @zoomIn="zoomIn"
      @zoomOut="zoomOut"
      @resetMap="resetMap"
      @getPos="getPos"
    ></zoomButtons>
    <div class="optionsBar">
      <button @click="addPoint">加点</button>
      <md-button type="small" icon="edit" inline @click="showPopUp('right')"
        >点位列表</md-button
      >
    </div>
    <md-popup
      v-model="isPopupShow.right"
      position="right"
      class="detailLists"
      :hasMask="false"
    >
      <div class="warper">
        <div class="closebutton" @click="hidePopUp('right')">
          关闭
          <md-icon name="close"></md-icon>
        </div>

        <md-scroll-view
          class="scrollBar"
          ref="scrollView"
          :scrolling-x="false"
          @endReached="$_onEndReached"
        >
          <!-- <div v-for="(i,index) in pagedList" :key="i.id" class="scroll-view-list">
            <p class="scroll-view-item">
              {{index+1}}-{{i.long}},{{i.lat}},{{i.time}}
              <br>
              东{{i.x}},北{{i.y}}
            </p>
          </div>-->
          <table>
            <tr>
              <th>序号</th>
              <th>经纬度</th>
              <th>平面坐标</th>
            </tr>
            <template v-for="(i, index) in pagedList">
              <tr>
                <td rowspan="2">{{ index + 1 }}</td>
                <td>{{ i.long }}</td>
                <td>{{ i.x }}</td>
              </tr>
              <tr>
                <td>{{ i.lat }}</td>

                <td>{{ i.y }}</td>
              </tr>
            </template>
          </table>

          <md-scroll-view-more
            slot="more"
            :is-finished="isFinished"
          ></md-scroll-view-more>
        </md-scroll-view>
      </div>
    </md-popup>
  </div>
</template>

<script>
import zoomButtons from "../components/zoomButtons";
import $L from "leaflet";
// import { MarkerClusterGroup } from "leaflet.markercluster";
export default {
  //   name: "map",
  components: { zoomButtons },
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      list: 10,
      isFinished: false,
      isPopupShow: {},
      pointLists: [],
      page: 0,
      pagedList: []
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container", {
      zoomControl: false
    });
    this.map._layersMaxZoom = 19;
    this.$utils.map.chinaProvider(
      "GaoDe.Normal.Map",
      {
        maxZoom: 18,
        minZoom: 5
      },
      this.map
    );
    // 加载 open street map 图层服务
    // this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});

    // 设施地图视图 中心位置
    this.map.setView([41.105, 111], 8);
    // this.getPoints();
    // ///点聚合测试
    // let cluster = this.$utils.map.createMakerCluster();
    // for (let i = 0; i < 1000; i++) {
    //   let latlng = this.$utils.map.getRandomLatLng(this.map);
    //   let maker = this.$utils.map.createMakerByLatlng(latlng);
    //   cluster.addLayer(maker);
    // }
    // this.map.addLayer(cluster);
  },

  methods: {
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      // async data
      setTimeout(() => {
        var count = 10;
        this.page += 1;
        this.pagedList = this.pointLists.slice(0, (this.page + 1) * count);

        if ((this.page + 1) * count >= this.pointLists.length) {
          this.isFinished = true;
        }
        this.$refs.scrollView.finishLoadMore();
      }, 50);
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    getPoints() {
      this.$axios.get("https://www.codingyang.com:3001/gps").then(lists => {
        // debugger;
        this.pointLists = lists.data.data.reverse();
        this.pagedList = this.pointLists.slice(0, 10);
        let cluster = this.$utils.map.createMakerCluster();
        for (let single of lists.data.data) {
          let mark = this.$utils.map.createMakerByLatlng(
            $L.latLng(parseFloat(single.lat), parseFloat(single.long))
          );
          cluster.addLayer(mark);
        }
        this.map.addLayer(cluster);
      });
    },
    addPoint() {
      // $L.marker([40, 111]).addTo(this.map);

      this.map.on("click", e => {
        console.log(e);
        $L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      });
    },
    zoomIn() {
      this.map.zoomIn();
    },
    zoomOut() {
      this.map.zoomOut();
    },
    resetMap() {
      this.map.setView([41.105, 111], 8);
      //   this.map.flyTo([41.105, 116], 8);
      //     this.map.panTo([41.105, 116]);
    },
    getPos() {
      // debugger;
      this.$utils.navi.getPos(this.showPos, this.fb);
      // navigator.geolocation.getCurrentPosition(this.showPos, this.fb);
    },
    showPos(pos) {
      // debugger;
      console.log(pos);
      var posi = this.$utils.map.createMakerByLatlng(
        $L.latLng(pos.coords.latitude, pos.coords.longitude)
      );
      this.map.flyTo($L.latLng(pos.coords.latitude, pos.coords.longitude));
      this.map.addLayer(posi);
    },
    fb(err) {
      debugger;
      console.log(err);
    }
  }
};
</script>
<style lang="scss">
//去除logo信息
#map-container {
  .leaflet-control-attribution.leaflet-control {
    a {
      display: none;
    }
  }
}
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.optionsBar {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 1000;
  .md-button {
    // width: 40px;
    // height: 50px;
  }
}
.detailLists {
  .warper {
    background: white;
    .closebutton {
      &:hover {
        background: rgb(197, 191, 191);
      }
    }
    .scrollBar {
      height: 400px;
      table {
        // border: 1px grey solid;
        tr {
          margin: 0;
        }
        td {
          margin: 0;
          border: 1px grey solid;
        }
      }
    }
  }
  // background: white;
}
</style>
