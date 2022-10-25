<template>
  <div class="wrapper">
    <Panel>
      <div class="justify-content-space-between align-items-flex-end">
        <span class="font-size-huge color-focus"> 路線資訊 </span>
        <span class="font-size-regular color-focus"> NT 45 </span>
      </div>

      <div class="col-12 mt-3">
        <div class="rows flex-cols-flex-start">
          <span class="font-size-small color-secondary">起點</span>
        </div>
      </div>

      <div class="cols mt-1">
        <div class="col-10 flex-cols-flex-start">
          <span class="font-size-large color-text">{{
            data.fromLocation
          }}</span>
        </div>
        <div class="col-2 flex-cols-flex-start arrival-time">
          <span class="color-secondary font-size-small">{{
            departure_time
          }}</span>
        </div>
      </div>

      <div class="col-12 mt-3">
        <div class="rows flex-cols-flex-start">
          <span class="font-size-small color-secondary">目的地</span>
        </div>
      </div>
      <div class="cols mt-1">
        <div class="col-10 flex-cols-flex-start">
          <span class="font-size-large color-text">{{ data.toLocation }}</span>
        </div>
        <div class="col-2 flex-cols-flex-start arrival-time">
          <span class="color-secondary font-size-small mr-0">{{
            arrival_time
          }}</span>
        </div>
      </div>
      <div v-if="data.detailRoutes">
        <div v-for="(detail, index) in data.detailRoutes" :key="index">
          <hr v-if="data.fromLocation === '信愛公園' || detail.type == 'metro'"/>
          <VerticalMetroRoute
            v-if="detail.type == 'metro'"
            :route="detail.route"
          ></VerticalMetroRoute>
          <VerticalUBikeRoute
            v-if="detail.type == 'ubike' && data.fromLocation === '信愛公園'"
            :route="detail.route"
          ></VerticalUBikeRoute>
        </div>
      </div>
    </Panel>
    <div class="cols mb-1">
      <div class="col-3 p-1">
        <Button color="#f3f5f8" textColor="#00e88e"> &nbsp; </Button>
      </div>
      <div class="col-2 p-1">
        <Button @click="favorite" color="#e68181" textColor="#ffffff" size="small">
          <Icon icon="heart"></Icon>
        </Button>
      </div>
      <div class="col-2 p-1">
        <Button
          @click="$emit('next', 'setNotice')"
          color="#e9a668"
          size="small"
        >
          <Icon icon="bell-ring"></Icon>
        </Button>
      </div>
      <div class="col-5 p-1">
        <Button @click="$emit('next', 'getStationMap')" size="small"
          >車站內部路線</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import favRoute from '~/tools/favRoute'
let isSaved = false
export default {
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    async favorite() {
      if(isSaved){
        // this.color = '#ffffff'
        // this.textColor = '#e68181'
        await favRoute.writeFavRouteToDB(this.data.fromLocation, this.data.toLocation)
        isSaved = false
        console.log(isSaved)
      }
      else {

        // this.color = '#e68181'
        // this.textColor = '#ffffff'
        isSaved = true
        console.log(isSaved)
      }
    }
  },
  mounted() {
    let routeTime = JSON.parse(localStorage.getItem('Navigation:RouteTime'))
    this.departure_time = routeTime.departure_time.text
    this.arrival_time = routeTime.arrival_time.text
    this.duration = routeTime.duration.text

    let quantity =localStorage.getItem('愛國金山路口-sbi')
    let vacancy = localStorage.getItem('東門站出口-bemp') 

    const routes = JSON.parse(localStorage.getItem('Routes'))
    this.$set(this.data, 'detailRoutes', [
      {
        type: 'ubike',
        route: [
          {
            version: '1.0',
            name: '金山愛國路口',
            distance: '',
            quantity: quantity,
            vacancy: null,
          },
          {
            version: '1.0',
            name: '捷運東門站',
            distance: '',
            quantity: null,
            vacancy: vacancy,
          },
        ],
      },
      {
        type: 'metro',
        route: routes,
        // route: [
        //   {
        //     color: 'red',
        //     code: 'R07',
        //     title: '搭乘淡水信義線',
        //     tips: '往象山方向',
        //     datetime: '',
        //     notice: false,
        //   },
        //   {
        //     color: 'red',
        //     code: 'R05',
        //     title: '在大安下車',
        //     tips: '',
        //     datetime: '10:35',
        //     notice: true,
        //   },
        //   {
        //     color: '#e9a668',
        //     code: 'BR09',
        //     title: '搭乘文湖線',
        //     tips: '往南港展覽館方向',
        //     datetime: '10:38',
        //     notice: false,
        //   },
        //   {
        //     color: '#e9a668',
        //     code: 'BR14',
        //     title: '在大直下車',
        //     tips: '出口 1',
        //     datetime: '10:52',
        //     notice: true,
        //   },
        // ],
      },
    ])
  },
  data() {
    return {
      arrival_time: null,
      departure_time: null,
      duration: null,
    }
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}

.wrapper > div {
  margin-top: 1rem;
}
.arrival-time {
  position: relative;
}
.arrival-time > span {
  position: absolute;
  bottom: 0;
}
</style>
