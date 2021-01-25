<template>
<q-btn-toggle
  push
  dense
  v-model="gender"
  rounded
  :options="genderOptions"
  >
  <template v-for="o in genderOptions" v-slot:[o.slot]>
    <q-img :key="o.slot" class="genderpicker" :src="`/icons/${o.slot}.png`" @click="gender = o.value" />
  </template>
</q-btn-toggle>
</template>

<script lang="ts">
import { Vue, Component, ModelSync } from 'vue-property-decorator'

@Component
export default class GenderPicker extends Vue {
  @ModelSync('value', 'input', { type: String }) readonly gender!: string

  genderOptions = [
    { value: 'f', slot: 'genderf' },
    { value: 'u', slot: 'genderu' },
    { value: 'm', slot: 'genderm' }
  ]
}
</script>

<style lang="scss">
.genderpicker {
  width: 24px;
  height: 24px;
}
</style>
