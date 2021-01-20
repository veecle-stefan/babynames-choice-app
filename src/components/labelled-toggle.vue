<template>
<q-item tag="label" v-ripple>
  <q-item-section avatar top>
    <q-toggle v-model="checkedValue" />
  </q-item-section>
  <q-item-section>
    <q-item-label>{{ label }}</q-item-label>
    <q-item-label caption>
      {{ hint }}
      <slot></slot>
    </q-item-label>
  </q-item-section>
</q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from 'vue-property-decorator'

@Component
export default class LabelledToggle extends Vue {
  @Prop({ required: true }) readonly label!: string
  @Prop({ required: true }) readonly hint!: string
  @ModelSync('value', 'input', { type: Boolean }) readonly checkedValue!: boolean
}
</script>

<style lang="scss">

</style>
