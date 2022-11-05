<template>
  <div class="wrapper">
    <Panel style="overflow: auto; height: 650px">
      <div class="justify-content-space-between align-items-flex-end">
        <span class="font-size-huge color-focus"> 車站內部路線 </span>
      </div>

      <div
        v-for="(station, index) in data.sationMaps"
        :key="index"
        class="station"
      >
        <span class="font-size-mini color-secondary">
          {{ station.type }}
        </span>
        <span class="font-size-regular color-text">
          {{ station.station }}
        </span>
        <img :src="station.image" />
        <hr />
      </div>
    </Panel>
    <div class="cols mb-1">
      <div class="col-3 p-1">
        <Button color="#f3f5f8" textColor="#00e88e"> &nbsp; </Button>
      </div>
      <div class="col-4 p-1">
        <Button
          @click="$emit('next', 'setNotice')"
          color="#e9a668"
          size="small"
        >
          <Icon icon="bell-ring"></Icon>
        </Button>
      </div>

      <div class="col-5 p-1">
        <Button @click="$emit('next', 'getDetail')" size="small"
          >詳細路線資料</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  mounted() {
    this.$set(this.data, 'sationMaps', [
      {
        type: '起點',
        station: '東門站',
        image:
          'http://140.131.114.159:3000/python/pathdraw?startPoint=Exit2&endPoint=Exit2&startStation=Dongmen&transferStation=Daan&destiStation=Dazhi&startTrainHeadto=%E8%B1%A1%E5%B1%B1&destiTrainHeadto=%E5%8D%97%E6%B8%AF%E5%B1%95%E8%A6%BD%E9%A4%A8&imgNum=0',
      },
      {
        type: '轉乘站',
        station: '大安站',
        image:
          'http://140.131.114.159:3000/python/pathdraw?startPoint=Exit2&endPoint=Exit2&startStation=Dongmen&transferStation=Daan&destiStation=Dazhi&startTrainHeadto=%E8%B1%A1%E5%B1%B1&destiTrainHeadto=%E5%8D%97%E6%B8%AF%E5%B1%95%E8%A6%BD%E9%A4%A8&imgNum=1',
      },
      {
        type: '終點站',
        station: '大直站',
        image:
          'http://140.131.114.159:3000/python/pathdraw?startPoint=Exit2&endPoint=Exit2&startStation=Dongmen&transferStation=Daan&destiStation=Dazhi&startTrainHeadto=%E8%B1%A1%E5%B1%B1&destiTrainHeadto=%E5%8D%97%E6%B8%AF%E5%B1%95%E8%A6%BD%E9%A4%A8&imgNum=2',
      },
    ])
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  /* height: 100%;
  overflow: scroll; */
  box-sizing: border-box;
}

.wrapper > div {
  margin-top: 1rem;
}

.station {
  margin-top: 0.01rem;
  display: flex;
  flex-direction: column;
}

.station > hr {
  width: 100%;
}

.station > * {
  margin-top: 0.2rem;
}
</style>
