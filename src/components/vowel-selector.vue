<template>
<q-carousel
  v-model="slide"
  vertical
  transition-prev="fade"
  transition-next="fade"
  swipeable
  animated
  arrows
  height="100px"
  >
  <q-carousel-slide name="2" class="slide">
    <div :class="`slideimg ${disable ? 'slide-disable': ''} tone-2`">
    {{$t('wizard.sound.diphthong')}}
    </div>
  </q-carousel-slide>
  <q-carousel-slide name="1" class="slide">
  <div :class="`slideimg ${disable ? 'slide-disable': ''} tone-1`">
    {{$t('wizard.sound.front')}}
    </div>
  </q-carousel-slide>
  <q-carousel-slide name="0" class="slide">
    <div :class="`slideimg ${disable ? 'slide-disable': ''} tone-0`">
    {{$t('wizard.sound.back')}}
    </div>
  </q-carousel-slide>
</q-carousel>
</template>

<script lang="ts">
import { Vue, Component, ModelSync, Prop } from 'vue-property-decorator'

@Component
export default class VowelSelector extends Vue {
  @Prop({ required: false, default: false }) readonly disable!: boolean
  @ModelSync('value', 'input', { type: Number }) _vowelType!: number
  selectedImg = 'low1'

  get slide (): string {
    return this._vowelType.toString()
  }

  set slide (v: string) {
    this.$emit('change')
    this._vowelType = parseInt(v)
  }
}
</script>

<style lang="scss">
.slide {
  padding: 0;
}
.slideimg {
  width: 50px;
  height: 100px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-position: center;
  background-size: 50px 100px;
  line-height: 100px;
  font-size: 10px;
  color: $primary;
  text-align: center;
  vertical-align: middle;
}

.slide-disable {
  color: #888888 !important;
}

.tone-2 {
  background-image: url('/icons/tones/hl1.png');
}
.tone-1 {
  background-image: url('/icons/tones/high1.png');
}
.tone-0 {
  background-image: url('/icons/tones/low1.png');
}

</style>
