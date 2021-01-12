<template>
 <div class="q-gutter-sm">
   <alt-spelling v-for="n in nameList()" :key="n.spellings[0].syllables.formattedName" :spelling="n.getDefaultSpelling()" @click="relatedClicked(n)"/>
</div>
</template>

<script lang="ts">
import { BabyDatabase, BabyName, TBabyDatabase } from 'src/babynames'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import AltSpelling from './alt-spelling.vue'

@Component({
  components: { AltSpelling }
})
export default class RelatedNames extends Vue {
  @Prop({ required: true }) readonly clusters!: number[]

  babyDB: TBabyDatabase

  constructor () {
    super()
    this.babyDB = BabyDatabase
  }

  nameList (): BabyName[] {
    return this.clusters.map(cID => this.babyDB.allNames[cID])
  }

  @Emit()
  relatedClicked (r: BabyName) {
    return r
  }
}
</script>

<style lang="scss">
.buttonspelling {
  color: #ffffff;
  margin-left: 5px;
}
</style>
