<template>
 <div class="q-pa-md flex justify-center">
    <div style="width: 300px;">
        <q-intersection
          v-for="n in nameList()" :key="n.ID"
          transition="slide-left"
          class="newitem"
        >
          <namecard :name="n.name" :lastname="family.familyname.name" />
        </q-intersection>
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
    const list: BabyIDList[] = []
    for (let i = 0; i < 100; i++) {
      const baby = BabyDatabase.allNames[i]
      // filter those whose language doesn't match
      let langExists = false
      for (const s of baby.spellings) {
        if ((s.origins.bits & this.family.narrow.languages.bitMap.bits) !== 0) {
          langExists = true
          break
        }
      }
      if (langExists) {
        list.push({ name: baby, ID: i })
      }
    }
    return list
  }
}
</script>

<style lang="scss">
.newitem {
  width: 300px;
  margin: 20px;
  min-height: 200px;
}
</style>
