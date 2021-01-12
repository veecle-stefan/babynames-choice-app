<template>
  <q-item-section avatar>
    <q-avatar>
      <img :src="`/icons/flags/${origincode}.png`">
    </q-avatar>
  </q-item-section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NameFlag extends Vue {
  @Prop({ required: true }) readonly origincode!: string
}
</script>
