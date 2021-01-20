<template>
<labelled-toggle v-if="filter.hasMap()" :label="$t(`${tag}.${name}.label`)" :hint="$t(`${tag}.${name}.hint`)" v-model="filter.onOff">
  <bitmask-toggle :disable="!filter.onOff" v-model="filter.bitMap" :tag="_subtag()" @change="checkboxChanged"/>
</labelled-toggle>
<labelled-toggle v-else :label="$t(`${tag}.${name}.label`)" :hint="$t(`${tag}.${name}.hint`)" v-model="filter.onOff" />
</template>

<script lang="ts">
import { FilterSetting } from 'src/babynames/bitstuff'
import BitmaskToggle from './bitmask-toggle.vue'
import LabelledToggle from './labelled-toggle.vue'
import { Vue, Component, Prop, ModelSync } from 'vue-property-decorator'

@Component({
  components: { BitmaskToggle, LabelledToggle }
})
export default class FilterToggle extends Vue {
  @Prop({ required: true }) readonly tag!: string
  @Prop({ required: true }) readonly name!: string
  @Prop({ required: false, default: '' }) readonly subtag!: string
  @ModelSync('value', 'input', { type: FilterSetting }) filter!: FilterSetting

  _subtag () {
    return (this.subtag === '') ? this.tag : this.subtag
  }

  checkboxChanged () {
    this.filter.onOff = true
  }
}
</script>

<style lang="scss">

</style>
