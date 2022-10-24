<template>
  <div>
    <section ref="map" id="map"></section>
    <Loading v-model="loading"></Loading>
    <div class="wrapper">
      <nuxt v-if="map" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      loading:true,
      position: {
        latitude: 25.0487269,
        longitude: 121.5181263,
      },
    };
  },

  async mounted() {
    if (navigator.geolocation) {
      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.position.latitude = position.coords.latitude;
          this.position.longitude = position.coords.longitude;
          resolve();
        });
      });
    } else {
      console.warn("Brower does not suppot gelocation API.");
    }

    this.map = new google.maps.Map(this.$refs.map, {
      zoom: 15,
      center: new google.maps.LatLng(this.position.latitude, this.position.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    this.$nuxt.$map = this.map;
    this.loading = false;

    new google.maps.Marker({
      position: new google.maps.LatLng(this.position.latitude, this.position.longitude),
      map: this.map,
    });
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;

  z-index: 1000;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
