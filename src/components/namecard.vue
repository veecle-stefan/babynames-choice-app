<template>
  <div>
   <q-card bordered class="my-card">
      <q-card-section>
        <q-expansion-item
        v-if="alternativeSpellings.length > 0"
        expand-icon-toggle
        >
        <template v-slot:header>
          <name-flag :origincode="defaultDisplayName.origins[0]" />
          <name-spelling :name="defaultDisplayName" />
        </template>
          <q-card class="spellcard">
            <q-card-section>
              <alt-spellings :spellings="alternativeSpellings" />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-item v-else>
          <name-flag :origincode="defaultDisplayName.origins[0]" />
          <name-spelling :name="defaultDisplayName" />
        </q-item>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section v-if="name.keywords.length > 0">
        <div class="row no-wrap q-pa-md">
          <div class="column justify-center">
            <div class="text-h6 q-mb-md">{{ $t('names.keywords') }}</div>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
          <ul>
            <li v-for="k in name.keywords" :key="k">{{k}}</li>
          </ul>
          </div>
        </div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section v-if="dictionaryWords.length > 0">
       <div class="row no-wrap q-pa-md">
          <div class="column justify-center">
            <div class="text-h6 q-mb-md">{{ $t('names.dictionarywords') }}</div>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
          <ul>
            <li v-for="d in dictionaryWords" :key="d">{{d}}</li>
          </ul>
          </div>
        </div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section v-if="name.relatedNameClusters.length > 0">
        <div class="text-h5">{{ $t('names.related') }}</div>
        <related-names :clusters="name.relatedNameClusters" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BabyName, RawSpelling } from '../babynames'
import NameSpelling from '../components/name-spelling.vue'
import NameFlag from '../components/name-flag.vue'
import AltSpellings from '../components/alt-spellings.vue'
import RelatedNames from '../components/related-names.vue'

@Component({
  components: { NameFlag, NameSpelling, AltSpellings, RelatedNames }
})
export default class Namecard extends Vue {
  @Prop({ required: false, default: 100 }) readonly width!: number
  @Prop({ required: false, default: 300 }) readonly height!: number
  @Prop({ required: true }) readonly name!: BabyName

  alternativeSpellings: RawSpelling[]
  defaultDisplayName: RawSpelling
  allSpellings: string[]
  dictionaryWords: string[]

  constructor () {
    super()
    this.defaultDisplayName = this.name.getDefaultSpelling()
    this.alternativeSpellings = this.name.getOtherSpellings(this.defaultDisplayName)

    // fill all spellings array
    this.allSpellings = [this.defaultDisplayName.syllables.formattedName]
    this.alternativeSpellings.forEach(s => this.allSpellings.push(s.syllables.formattedName))

    // fill dictionary words
    this.dictionaryWords = Object.keys(this.name.indic).filter(d => !this.allSpellings.includes(d))
  }
}
</script>

<style lang="scss">

.my-card {
  background: rgba( 255, 255, 255, 0.10 );
  box-shadow: 0 8px 50px 0 rgba(66, 63, 45, 0.57);
  backdrop-filter: blur( 10px ) grayscale(.5);
  border-radius: 10px;
  border: 2px solid rgba( 255, 255, 255, 0.1 );
}

.spellcard {
  color: red;
  background-color: transparent;
}

.mainname {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20pt;
  display: block;
  color: #444444;
}

.syllable {
  display: inline-block;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  border-radius: 5px;
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  height: 48px;
}

.mainname span + span:before {
  font-size: 12pt;
  opacity: .2;
  content: '•';
  overflow: hidden;
  width: 5px;
  max-width: 5px;
  height: 30px;
}

.syl-color-4 {
  //background-color: rgba(255, 0, 0, 0.2);
  background-image: url('/icons/tones/high1.png');
}
.syl-color-8 {
  background-image: url('/icons/tones/high2.png');
}
.syl-color-12 {
  background-image: url('/icons/tones/high3.png');
}
.syl-color-1 {
  //background-color: rgba(0, 0, 255, 0.2);
  background-image: url('/icons/tones/low1.png');
}
.syl-color-2 {
  background-image: url('/icons/tones/low2.png');
}

.syl-color-5 {
  background-image: url('/icons/tones/hl1.png');
}

.altspelling {
  font-size: 10pt;
  display: inline;
  margin-right: 15px;
}

.flagspace {
  display: inline-block;
  width: 30px;
}

.flag {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
