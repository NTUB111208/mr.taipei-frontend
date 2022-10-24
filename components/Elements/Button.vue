<template>
  <div
    :class="elementClass"
    :style="{
      'background-color': this.color,
      color: this.textColor,
    }"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#17e68e',
    },
    textColor: {
      type: String,
      default: '#000000',
    },
    size: {
      type: String,
      default: 'regular',
    },
  },
  computed: {
    elementClass() {
      return `button button-size-${this.size} font-size-${this.size}`
    },
  },
}
</script>

<style scoped>
.button {
  border-radius: 12px;
  padding: 0.8rem 1rem;

  display: flex;
  justify-content: center;
}
.button-size-mini{
  padding: 0.3rem 0.2rem ;
}
</style>
