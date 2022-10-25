<template>
  <div class="loadingContainer" v-if="value">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style>
.loadingContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 3rem;
  height: 3rem;
  border: 0.2rem solid #fff;
  border-radius: 50%;
  border-top-color: #00e88e;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
