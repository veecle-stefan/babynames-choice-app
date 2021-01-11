<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="col-12">
        Familienname
      </div>
      <div class="col-12">
        Schwester | Bruder
      </div>
      <div class="col-12">
        Klang: Scrollrad mit Anfangsbuchstabe, dann 2-5 hoch/tief Silben, dann Endbuchstabe
      </div>
      <div class="col-5" v-for="name in testNames()" :key="name.spellings[0].syllables.formattedName">
        <namecard :name="name"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'
import { BabyDatabase, BabyName } from '../babynames'

@Component({
  components: { Namecard }
})
export default class Sound extends Vue {
  testNames (): BabyName[] {
    const result: BabyName[] = []
    do {
      const num = Math.floor(Math.random() * BabyDatabase.allNames.length)
      const newName = BabyDatabase.allNames[num]
      if (Object.keys(newName.indic).length === 0) {
        continue
      }
      if (!result.includes(newName)) {
        result.push(newName)
      }
    } while (result.length < 10)
    return result
  }
}
</script>

<style lang="scss">

</style>
