<template>
  <div class="q-pa-md column justify-center items-center">
    <q-card flat bordered class="result-info">
      <q-spinner v-if="calculating"
        color="primary"
        size="3em"
      />
      <q-card-section v-else>
        <div class="text-h6" v-if="nameList.length < totalCount">{{$t('wizard.found', { num: nameList.length })}} {{$t('wizard.eliminated', { num: totalCount - nameList.length })}}</div>
        <div class="text-h6" v-else>{{$t('wizard.all', { num: nameList.length })}}</div>
      </q-card-section>
    </q-card>
    <q-intersection
      v-for="n in nameList" :key="n.ID"
      class="newitem"
    >
      <namecard :name="n.name" :lastname="family.familyname.name" />
    </q-intersection>
  </div>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import { Family, BabyNameFilter, BabyDatabase, BabyID } from 'src/babynames'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'

@Component({
  components: { Namecard }
})
export default class NamePicker extends Vue {
  @Prop({ required: true }) readonly family!: Family

  calculating = false
  filter = new BabyNameFilter()
  nameList: BabyID[] = this.filter.currList
  totalCount = BabyDatabase.allNames.length

  created () {
    this.afterQueryChanged = debounce(this.afterQueryChanged.bind(this), 500)
  }

  afterQueryChanged (newQ: Family) {
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
  }

  @Watch('family', { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onQueryChanged (newQ: Family, _oldQ: Family) {
    this.calculating = true
    this.afterQueryChanged(newQ)
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
