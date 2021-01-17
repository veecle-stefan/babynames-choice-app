<template>
  <div class="text-h5">
  {{ name.syllables.formattedName }}
  <q-tooltip content-class="bg-white" anchor="center left" self="center left">
    <syllables-splitter :syllables="name.syllables" />
  </q-tooltip>
  {{ lastname }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RawSpelling } from '../babynames'
import SyllablesSplitter from './syllables-splitter.vue'

@Component({
  components: { SyllablesSplitter }
})
export default class NameSpelling extends Vue {
  @Prop({ required: true }) readonly name!: RawSpelling
  @Prop({ required: false, default: '' }) readonly lastname!: string
}
</script>

<style lang="scss">
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
</style>
