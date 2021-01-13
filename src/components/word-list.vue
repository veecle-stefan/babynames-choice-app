<template>
    <q-virtual-scroll
    :items="list"
    virtual-scroll-horizontal
  >
  <template v-slot:before>
    <q-item dense>
      <q-item-section>
      <q-item-label class="text-uppercase">{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical spaced />
  </template>
    <template v-slot="{ item, index }">
       <q-item dense>
      <q-item-section>
      <q-item-label class="list-item">{{ item }}</q-item-label>
      </q-item-section>
    </q-item>
    </template>
  </q-virtual-scroll>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class WordList extends Vue {
  @Prop({ required: true }) readonly list!: string[]
  @Prop({ required: true }) readonly title!: string
}
</script>

<style lang="scss">
.list-item {
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background: rgba(0,0,0,0.2);
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
}

</style>
