<template>
  <div>
   <q-card dark bordered class="my-card">
      <q-card-section>
        <div class="mainname">
          <span v-for="s in defaultDisplayName.syllables.ToneSyllables" :key="s.chars" :class="`syllable syl-color-${s.tone}`">{{ s.chars }}</span>
          <div class="flagspace"></div>
          <div v-for="flag in defaultDisplayName.origins" :key="flag" class="flag" :style="{ 'background-image': `url('/icons/flags/${flag}.png`}"></div>
        </div>
        <div class="text-subtitle2">
          <div class="altspelling" v-for="spelling in alternativeSpellings" :key="spelling.id">
            {{ spelling.name }}
            <q-tooltip>
            <div v-for="flag in spelling.origins" :key="flag" class="flag" :style="{ 'background-image': `url('/icons/flags/${flag}.png`}"></div>
            </q-tooltip>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <ul>
          <li v-for="k in name.keywords" :key="k">{{k}}</li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BabyName, RawSpelling } from '../babynames'

class AltSpelling {
  id: number
  name: string
  origins: string[]
  gender: string

  constructor (id: number, name: string, origins: string[], gender: string) {
    this.id = id
    this.name = name
    this.origins = origins
    this.gender = gender
  }
}

@Component
export default class Namecard extends Vue {
  @Prop({ required: false, default: 100 }) readonly width!: number
  @Prop({ required: false, default: 300 }) readonly height!: number
  @Prop({ required: true }) readonly name!: BabyName

  alternativeSpellings: AltSpelling[]
  defaultDisplayName: RawSpelling

  constructor () {
    super()
    this.defaultDisplayName = this.getShortestName()
    this.alternativeSpellings = this.getAlternatives(this.defaultDisplayName)
  }

  getAlternatives (notThis: RawSpelling): AltSpelling[] {
    return this.name.spellings.filter(s => s !== notThis).map((m, i) => {
      return new AltSpelling(i, m.syllables.formattedName, m.origins, m.gender)
    })
  }

  getShortestName (): RawSpelling {
    // take the shortest name
    const shortest = this.name.spellings.reduce((shortest: RawSpelling | null, s) => {
      if ((shortest === null) || (s.syllables.length < shortest.syllables.length)) {
        shortest = s
      }
      return shortest
    }, null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return shortest!
  }
}
</script>

<style lang="scss">

.my-card {
  background: rgba( 255, 255, 255, 0.30 );
  box-shadow: 0 8px 50px 0 rgba( 31, 38, 135, 0.57 );
  backdrop-filter: blur( 10px ) grayscale(.5);
  border-radius: 10px;
  border: 2px solid rgba( 255, 255, 255, 0.1 );
}

.mainname {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20pt;
  display: block;
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
  height: 64px;
}

.mainname span + span:before {
  font-size: 12pt;
  opacity: .2;
  content: '';
  border-right: dotted 1px black;
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
