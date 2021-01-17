<template>
    <div class="mainname">
      <span v-for="s in syllables.ToneSyllables" :key="s.ID" :class="`syllable syl-color-${s.tone}`">{{ s.chars }}</span>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Syllables } from '../babynames'

@Component
export default class SyllablesSplitter extends Vue {
  @Prop({ required: true }) readonly syllables!: Syllables
}
</script>

<style lang="scss">
.mainname {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20pt;
  display: block;
  color: #999999;
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
</style>
