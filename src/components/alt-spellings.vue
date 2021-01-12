<template>
<div class="q-gutter-sm">
  <alt-spelling v-for="spelling in leftSpellings()" :key="spelling.syllables.formattedName" :spelling="spelling" @click="SpellingChosen(spelling)"/>
</div>
</template>

<script lang="ts">
import { RawSpelling } from 'src/babynames'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import AltSpelling from './alt-spelling.vue'

@Component({
  components: { AltSpelling }
})
export default class AltSpellings extends Vue {
  @Prop({ required: true }) readonly spellings!: RawSpelling[]
  @Prop({ required: false, default: [] }) readonly without!: RawSpelling[]

  leftSpellings (): RawSpelling[] {
    return this.spellings.filter(s => !this.without.includes(s))
  }

  @Emit()
  SpellingChosen (s: RawSpelling) {
    return s
  }
}
</script>
