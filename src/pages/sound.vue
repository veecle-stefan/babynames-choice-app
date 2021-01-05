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
    <namecard :name="testName()"/>
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
  testName (): BabyName {
    return BabyDatabase.allNames[0]
  }
}
</script>

<style lang="scss">

</style>
