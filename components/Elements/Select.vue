<template>
  <div class="wrapper">
    <div
      :class="titleClass"
      :style="{
        color: titleColor,
      }"
    >
      {{ title }}
    </div>
    <select
      :class="elementClass"
      :style="{
        color: color,
        background: backgroundColor,
      }"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script>
import sizes from '~/static/sizes.js'
export default {
  props: {
    title: {
      type: String,
    },
    titleColor: {
      type: String,
      default: '#96979a',
    },
    backgroundColor: {
      type: String,
      default: '#96979a',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    size: {
      type: String,
      default: 'regular',
    },

    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    elementClass() {
      return `select font-size-${this.size}`
    },
    titleClass() {
      let size =
        sizes.findIndex((_) => _ == this.size) == 0
          ? sizes[0]
          : sizes[sizes.findIndex((_) => _ == this.size) - 1]
      return `title font-size-${size}`
    },
  },
}
</script>

<style scoped>
.title {
  margin-bottom: 0.2rem;
}
.select {
  position: relative;
  border: 1px solid black;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  transition: 0.4s;
}
.select:focus-visible {
  outline: 0;
  box-shadow: 0 0 4px 0px rgba(255, 255, 255, 0.6);
}
</style>
