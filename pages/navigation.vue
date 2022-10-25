<template>
  <div class="wrapper">
    <Icon
      v-if="panelHistory.length > 1"
      @click.native="prev"
      icon="arrow-left"
      class="prev"
    ></Icon>
    <component
      :is="currentPanel"
      :data="data"
      :map="map"
      @next="nextPressed"
    ></component>
  </div>
</template>

<script>
import InfoPanel from '~/components/Navigation/Panels/1-Info.vue'
import RoutePanel from '~/components/Navigation/Panels/2-Route.vue'
import DetailPanel from '~/components/Navigation/Panels/3-Detail.vue'
import StationMapPanel from '~/components/Navigation/Panels/4-StationMap.vue'
import FavoriteRotuesPanel from '~/components/Navigation/Panels/Z-FavoriteRotues.vue'

export default {
  name: 'NavigatoinPage',
  layout: 'map',

  data() {
    return {
      // 目前頁面及頁面瀏覽紀錄
      currentPanel: InfoPanel,
      panelHistory: [],

      // 傳進各個頁面的資料
      data: {
        leaveTime: new Date(),
        tokenResult: {},
        idTokenDecode: {},
      },

      map: null,
    }
  },

  mounted() {
    let queryParams = this.$route.query
    this.map = this.$nuxt.$map
  },

  methods: {
    nextPressed(event) {
      if (event == 'getInfoPanel') {
        this.currentPanel = InfoPanel
      }
      if (event == 'getRoute') {
        if (this.panelHistory.length <= 1) {
          this.panelHistory.push(InfoPanel)
        }
        this.panelHistory.push(RoutePanel)
        this.currentPanel = RoutePanel
      }
      if (event == 'getDetail') {
        this.panelHistory.push(DetailPanel)
        this.currentPanel = DetailPanel
      }
      if (event == 'getStationMap') {
        this.panelHistory.push(StationMapPanel)
        this.currentPanel = StationMapPanel
      }
      if (event == 'getFavoriteRotues') {
        this.panelHistory.push(FavoriteRotuesPanel)
        this.currentPanel = FavoriteRotuesPanel
      }
    },
    prev() {
      if (this.panelHistory.length > 1) {
        this.panelHistory.pop()
        this.currentPanel = this.panelHistory[this.panelHistory.length - 1]
        if (this.currentPanel == InfoPanel) {
          this.panelHistory = []
        }
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}
.prev {
  position: fixed;
  bottom: 1.5rem;
  left: 1rem;
  /* background-color: #f3f5f8; */
  width: 20%;
  font-size: 2rem;
  color: #17e68e;
  /* border-radius: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
