<template>
  <div>
   <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">{{ defaultDisplayName() }}</div>
        <div class="text-subtitle2">Subtitle</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        Bla
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BabyName } from '../babynames'

@Component
export default class Namecard extends Vue {
  @Prop({ required: false, default: 100 }) readonly width!: number
  @Prop({ required: false, default: 300 }) readonly height!: number
  @Prop({ required: true }) readonly name!: BabyName

  defaultDisplayName (): string {
    // take the shortest name
    let shortest = 999
    let shortestName = ''
    for (const spelling of this.name.spellings) {
      if (spelling.spelling.length < shortest) {
        shortest = spelling.spelling.length
        shortestName = spelling.spelling
      }
    }
    return shortestName
  }
}
</script>

<style lang="scss">

</style>
