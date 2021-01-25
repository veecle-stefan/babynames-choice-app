<template>
  <div class="q-pa-md column justify-center items-center">
    <q-card flat bordered class="result-info">
      <q-spinner v-if="calculating"
        color="primary"
        size="3em"
      />
      <q-card-section v-else>
        <div class="text-h6">{{nameList.length}}</div>
      </q-card-section>
    </q-card>
    <q-intersection
      v-for="n in nameList" :key="n.ID"
      transition="slide-left"
      class="newitem"
    >
      <namecard :name="n.name" :lastname="family.familyname.name" />
    </q-intersection>
  </div>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import { Family, BabyNameFilter } from 'src/babynames'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'

@Component({
  components: { Namecard }
})
export default class NamePicker extends Vue {
  @Prop({ required: true }) readonly family!: Family

  calculating = false
  filter = new BabyNameFilter()
  nameList = this.filter.currList

  debouncedUpdate = debounce(newQ => {
    this.calculating = true // show animation while calculating
    this.filter.queryChanged(newQ).then(filteredList => {
      console.log(`Final filtered list has ${filteredList.length} items`)
      this.calculating = false // stop animation
      this.nameList = filteredList // apply new list (will render automatically)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch(_reason => {
      console.error('An error occured while filtering')
      console.error(_reason)
      // an error occured
      this.calculating = false
    })
  }, 500)

  @Watch('family', { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onQueryChanged (newQ: Family, _oldQ: Family) {
    this.debouncedUpdate(newQ)
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
