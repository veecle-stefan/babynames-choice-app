<template>
<div class="q-gutter-sm">
  <alt-spelling v-for="spelling in spellings" :key="spelling.syllables.formattedName" :spelling="spelling" />
</div>
</template>

<script lang="ts">
import { RawSpelling } from 'src/babynames'
import { Vue, Component, Prop } from 'vue-property-decorator'
import AltSpelling from './alt-spelling.vue'

@Component({
  components: { AltSpelling }
})
export default class AltSpellings extends Vue {
  @Prop({ required: true }) readonly spellings!: RawSpelling[]
}
</script>
