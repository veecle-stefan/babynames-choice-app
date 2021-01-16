<template>
<q-carousel
  class="q-pa-none q-ma-none"
  v-model="slide"
  vertical
  transition-prev="slide-down"
  transition-next="slide-up"
  swipeable
  animated
  arrows
  height="125px"
  >
  <q-carousel-slide name="2" img-src="/icons/tones/hl1.png" />
  <q-carousel-slide name="1" img-src="/icons/tones/high1.png" />
  <q-carousel-slide name="0" img-src="/icons/tones/low1.png" />
</q-carousel>
</template>

<script lang="ts">
import { Vue, Component, ModelSync } from 'vue-property-decorator'

@Component
export default class VowelSelector extends Vue {
  @ModelSync('value', 'input', { type: Number }) _vowelType!: number
  selectedImg = 'low1'

  get slide (): string {
    return this._vowelType.toString()
  }

  set slide (v: string) {
    this._vowelType = parseInt(v)
  }
}
</script>

<style lang="scss">
.slideimg {
  width: 70px;
}

.vowel-card {
  width: 35px;
  height: 100px;
}
</style>
