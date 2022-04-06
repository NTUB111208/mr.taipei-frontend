<template>
  <div>
    <div style="height: 100vh">
      <client-only>
        <l-map :zoom="15" :center="[latitude, longitude]">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[latitude, longitude]"></l-marker>
        </l-map>
      </client-only>
    </div>
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: "",
      longitude: "",
    };
  },
  created: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((postion) => {
        console.log(postion.coords.latitude);
        console.log(postion.coords.longitude);
        this.latitude = postion.coords.latitude;
        this.longitude = postion.coords.longitude;
      });
    } else {
      console.log("Your brower does not suppot gelocation api");
    }
  },
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;

  z-index: 1000;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
