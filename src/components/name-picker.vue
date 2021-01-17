<template>
<div class="row">
  <div class="col-12 col-sm-5">
    <namecard v-for="n in nameList()" :key="n.ID" :name="n.name" :lastname="family.familyname.name" />
  </div>
</div>
</template>

<script lang="ts">
import { BabyDatabase, BabyName, Family } from 'src/babynames'
import { Vue, Component, Prop } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'

interface BabyIDList {
  name: BabyName
  ID: number
}

@Component({
  components: { Namecard }
})
export default class NamePicker extends Vue {
  @Prop({ required: true }) readonly family!: Family

  nameList (): BabyIDList[] {
    return [
      { name: BabyDatabase.allNames[0], ID: 0 }
    ]
  }
}
</script>

<style lang="scss">

</style>
