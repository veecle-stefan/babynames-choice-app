<template>
<q-btn outline no-caps size="md" align="between" color="white" @click="$emit('click')">
  <q-avatar v-if="firstflagonly">
    <img :src="`/icons/flags/${spelling.origins[0]}.png`" />
  </q-avatar>
  <q-avatar v-else v-for="flag in spelling.origins" :key="flag" size="24px">
    <img :src="`/icons/flags/${flag}.png`" />
  </q-avatar>
  <div class="buttonspelling">
    {{ spelling.syllables.formattedName }}
  </div>
</q-btn>
</template>

<script lang="ts">
import { RawSpelling } from 'src/babynames'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AltSpelling extends Vue {
  @Prop({ required: true }) readonly spelling!: RawSpelling
  @Prop({ required: false, default: false }) readonly firstflagonly!: boolean
}
</script>

<style lang="scss">
.buttonspelling {
  color: #ffffff;
  margin-left: 5px;
}
</style>
