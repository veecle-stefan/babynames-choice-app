<template>
<div class="row q-col-gutter-none">
  <q-checkbox :disable="disable" class="col-4" v-for="oneBit in expandedBitList" :key="oneBit.key" :label="$t(`${tag}.${oneBit.name}`)" :value="oneBit.val" @input="updateBitmap(oneBit, ...arguments)" />
</div>
</template>

<script lang="ts">
import { BitMap } from 'src/babynames/bitstuff'
import { Vue, Component, Prop, ModelSync, Watch } from 'vue-property-decorator'

class ChkboxSetting {
  val: boolean
  key: number
  name: string

  constructor (val: boolean, key: number, name: string) {
    this.val = val
    this.key = key
    this.name = name
  }
}

interface ChkboxLookup {
  [key: string]: ChkboxSetting
}

@Component
export default class BitmaskToggle extends Vue {
  @Prop({ required: true }) readonly tag!: string
  @Prop({ required: false, default: false }) readonly disable!: boolean
  @ModelSync('value', 'input', { type: BitMap }) bitmask!: BitMap

  expandedBitList: ChkboxLookup = {}

  created () {
    if (this.bitmask._map) {
      for (const key in this.bitmask._map) {
        const num = parseInt(key)
        const val = this.bitmask._map[key]
        const checked = (this.bitmask.bits & num) === num
        this.$set(this.expandedBitList, key, new ChkboxSetting(
          checked,
          num,
          val
        ))
      }
    }
  }

  @Watch('bitmask', { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expandBitmaps (newV: BitMap, _oldV: BitMap) {
    if (newV._map) {
      for (const key in newV._map) {
        const num = parseInt(key)
        this.expandedBitList[num].val = (newV.bits & num) === num
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateBitmap (el: ChkboxSetting, newVal: boolean, ev: Event) {
    if (newVal) {
      // set bit
      this.bitmask.bits |= el.key
    } else {
      // unset bit
      this.bitmask.bits &= ~el.key
    }
    this.expandedBitList[el.key].val = newVal
    this.$emit('change', el, newVal)
  }
}
</script>

<style lang="scss">

</style>
