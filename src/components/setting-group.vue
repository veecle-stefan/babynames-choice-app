<template>
<q-expansion-item
  v-model="isOpen"
  dense
  group="settings"
>
  <template v-slot:header>
    <q-item-section avatar><q-avatar :icon="icon" /></q-item-section>
    <q-item-section>
      {{$t(`${tag}.title`)}}
      <span class="changed-state" v-show="showSummary()">
        {{summaryList()}}
      </span>
    </q-item-section>
    <q-item-section side>
      <q-btn dense flat icon="settings_backup_restore" @click.stop="resetSettings()" />
      </q-item-section>
  </template>
  <q-card>
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</q-expansion-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SettingGroup extends Vue {
  @Prop({ required: true }) readonly tag!: string
  @Prop({ required: true }) readonly icon!: string
  @Prop({ required: false, default: function () { return [] as string[] }} ) readonly summary!: string[]

  isOpen = false

  resetSettings () {
    this.isOpen = false
    this.$emit('reset')
  }

  summaryList (): string {
    return this.summary.filter(s => s !== '').join(', ')
  }

  showSummary (): boolean {
    if ((this.summary === null) || (this.summary.length === 0)) {
      return false
    }

    for (const item of this.summary) {
      if (item !== '') return true
    }
    return false
  }
}
</script>

<style lang="scss">
.changed-state {
  color: $primary;
  display: inline;
}
</style>
