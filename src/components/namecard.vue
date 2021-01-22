<template>
   <q-card bordered class="my-card">
      <q-card-section>
        <q-carousel
        v-model="selectedSpelling"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="white"
        padding
        arrows
        height="100px"
        class="bg-transparent text-white"
      >
        <q-carousel-slide v-for="(s, index) in orderedSpellings()" :key="s.syllables.formattedName" :name="`s${index}`" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            <q-badge v-if="currentName.spellings.length > 1" floating color="transparent">{{index+1}}/{{currentName.spellings.length}}</q-badge>
            <name-spelling :name="s" :lastname="lastname" />
            <q-avatar v-for="flag in s.flagList" :key="flag" size="16px"><img :src="`/icons/flags/${flag}.png`" /></q-avatar>
          </div>
        </q-carousel-slide>
      </q-carousel>
      </q-card-section>
      <q-separator dark inset v-if="currentName.keywords.length > 0"/>
      <q-card-section v-if="currentName.keywords.length > 0">
        <word-list :list="currentName.keywords" :title="$t('names.keywords')" />
      </q-card-section>
      <q-separator dark inset v-if="dictionaryWords().length > 0"/>
      <q-card-section v-if="dictionaryWords().length > 0">
       <word-list :list="dictionaryWords()" :title="$t('names.dictionarywords')" />
      </q-card-section>
      <q-separator dark inset v-if="currentName.relatedNameClusters.length > 0"/>
      <q-expansion-item
        v-if="currentName.relatedNameClusters.length > 0"
        expand-separator
      >
        <template v-slot:header>
          <q-item dense>
            <q-item-section>
            <q-item-label class="text-uppercase">{{ $t('names.related') }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-card class="card-transparent">
          <q-card-section>
            <related-names :clusters="currentName.relatedNameClusters" @related-clicked="relatedNameClicked"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>
   </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BabyName, RawSpelling } from '../babynames'
import NameSpelling from '../components/name-spelling.vue'
import NameFlag from '../components/name-flag.vue'
import RelatedNames from '../components/related-names.vue'
import WordList from '../components/word-list.vue'

@Component({
  components: { NameFlag, NameSpelling, RelatedNames, WordList }
})
export default class Namecard extends Vue {
  @Prop({ required: false, default: 100 }) readonly width!: number
  @Prop({ required: false, default: 300 }) readonly height!: number
  @Prop({ required: false, default: '' }) readonly lastname!: string
  @Prop({ required: true }) readonly name!: BabyName

  currentName: BabyName
  defaultDisplayName: RawSpelling
  selectedSpelling = 's0'

  constructor () {
    super()
    this.currentName = this.name
    this.defaultDisplayName = this.currentName.getDefaultSpelling()
  }

  orderedSpellings (): RawSpelling[] {
    const reordered = [this.defaultDisplayName]
    return reordered.concat(this.currentName.spellings.filter(s => s !== this.defaultDisplayName))
  }

  dictionaryWords ():string[] {
    // fill all spellings array
    const allSpellings = this.currentName.spellings.map(s => s.syllables.formattedName)
    // fill dictionary words
    return Object.keys(this.currentName.indic).filter(d => !allSpellings.includes(d))
  }

  /**
   * User has clicked on an alternative spelling. Set this one
   * as the current default spelling in the top and remove
   * it from the list of alternative spellings
   */
  spellingChosen (s: RawSpelling) {
    this.defaultDisplayName = s
  }

  relatedNameClicked (n: BabyName) {
    this.selectedSpelling = 's0'
    this.currentName = n
    this.defaultDisplayName = this.currentName.getDefaultSpelling()
  }
}
</script>

<style lang="scss">

.my-card {
  background: rgba( 255, 255, 255, 0.10 );
  box-shadow: 0 8px 50px 0 rgba(66, 63, 45, 0.57);
  backdrop-filter: blur( 15px ) grayscale(.6);
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.2 );
}

.card-transparent {
  background-color: transparent;
}

</style>
