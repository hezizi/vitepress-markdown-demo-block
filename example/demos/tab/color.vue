<template>
  <a-space wrap>
    <a-tag
      v-for="(color, index) of colors"
      :key="index"
      :color="color"
      closable
      >{{ color }}</a-tag
    >
  </a-space>
  <h3>Custom Color:</h3>
  <a-space wrap>
    <a-tag
      v-for="(color, index) of custom"
      :key="index"
      :color="color"
      closable
      >{{ color }}</a-tag
    >
  </a-space>
</template>

<script>
export default {
  setup() {
    const colors = [
      'red',
      'orangered',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'arcoblue',
      'purple',
      'pinkpurple',
      'magenta',
      'gray'
    ]
    const custom = [
      '#f53f3f',
      '#7816ff',
      '#00b42a',
      '#165dff',
      '#ff7d00',
      '#eb0aa4',
      '#7bc616',
      '#86909c',
      '#b71de8',
      '#0fc6c2',
      '#ffb400',
      '#168cff',
      '#ff5722'
    ]

    return {
      colors,
      custom
    }
  }
}
</script>
