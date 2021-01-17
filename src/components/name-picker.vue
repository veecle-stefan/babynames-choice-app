<template>
 <div class="q-pa-md flex justify-center">
    <div style="width: 300px;">
        <q-intersection
          v-for="n in nameList" :key="n.ID"
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

  nameList = Array<BabyIDList>(0)

  mounted () {
    for (let i = 0; i < 100; i++) {
      const newID = this.nameList.length
      this.nameList.push({ name: BabyDatabase.allNames[newID], ID: newID })
    }
  }

  onLoad (index: number, done: () => void) {
    for (let i = 0; i < 10; i++) {
      const newID = this.nameList.length
      this.nameList.push({ name: BabyDatabase.allNames[newID], ID: newID })
    }
    done()
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
