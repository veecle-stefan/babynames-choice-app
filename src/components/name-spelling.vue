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

</style>
