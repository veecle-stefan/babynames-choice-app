<template>
<q-btn outline no-caps size="md" align="between" color="white" @click="$emit('click')">
  <q-badge v-if="firstflagonly" floating color="transparent"><img class="badgeflag" :src="`/icons/flags/${spelling.origins[0]}.png`" /></q-badge>
  <q-badge v-else floating color="transparent" v-for="flag in spelling.origins" :key="flag"><img class="badgeflag" :src="`/icons/flags/${flag}.png`" /></q-badge>
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

.badgeflag {
  width: 16px;
  height: 16px;
}
</style>
