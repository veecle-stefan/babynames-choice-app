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
      <slot>
        <div class="row justify-start items-start content-start" v-if="settings != null">
          <div class="col-12 col-md-6 col-sm-4" v-for="(setting, name) in settings" :key="name">
            <div v-if="setting.bitMap._map">
              <q-item-label header>
                {{$t(`${tag}.${name}.label`)}}
              </q-item-label>
              <q-checkbox v-for="(val, key) in setting.bitMap._map" :key="key" :label="val" v-model="expandedSettings[name][key]" />
            </div>
            <label-checkbox v-else :label="$t(`${tag}.${name}.label`)" :hint="$t(`${tag}.${name}.hint`)" v-model="setting.onOff" />
          </div>
        </div>
      </slot>
    </q-card-section>
  </q-card>
</q-expansion-item>
</template>

<script lang="ts">
import { BinarySettings, BinarySettingsGroup } from 'src/babynames/bitstuff'
import LabelCheckbox from './label-checkbox.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

interface SubSettingBits {
  [key: string]: boolean
}

interface SubSettingRef {
  [settingname: string]: SubSettingBits
}

@Component({
  components: { LabelCheckbox }
})
export default class SettingGroup extends Vue {
  @Prop({ required: true }) readonly tag!: string
  @Prop({ required: true }) readonly icon!: string
  @Prop({ required: false, default: function () { return [] as string[] } }) readonly summary!: string[]
  @Prop({ required: false, default: null }) readonly settings!: BinarySettingsGroup | null

  isOpen = false
  expandedSettings: SubSettingRef = {}

  constructor () {
    super()
    if (this.settings) {
      for (const settingname in this.settings) {
        const setting = this.settings[settingname]
        if (setting.bitMap._map) {
          this.expandedSettings[settingname] = {}
          for (const key in setting.bitMap._map) {
            this.expandedSettings[settingname][key] = false
          }
        }
      }
    }
  }

  readVal (name: string, key: string): boolean {
    console.log(`Read setting ${name} index ${key}`)
    return false
  }

  onTest () {
    console.log('Something changed')
  }

  @Watch('expandedSettings', { deep: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubSettingsChanged (newV: SubSettingRef, _oldV: SubSettingRef) {
    if (this.settings) {
      for (const setname in newV) {
        const bm = this.settings[setname].bitMap
        bm.bits = 0
        for (const key in newV[setname]) {
          const val = newV[setname][key]
          if (val) {
            const num = parseInt(key)
            bm.bits |= num
          }
        }
      }
    }
  }

  resetSettings () {
    this.isOpen = false
    if (this.settings) {
      BinarySettings.resetSettingsGroup(this.settings)
    }
    this.$emit('reset')
  }

  summaryList (): string {
    if (this.settings) {
      return this.enabledSettingNames().join(', ')
    } else {
      return this.summary.filter(s => s !== '').join(', ')
    }
  }

  showSummary (): boolean {
    if (this.settings) {
      return true
    }

    if ((this.summary === null) || (this.summary.length === 0)) {
      return false
    }

    for (const item of this.summary) {
      if (item !== '') return true
    }
    return false
  }

  enabledSettingNames (): string[] {
    if (this.settings) {
      return Object.entries(this.settings).reduce((list, [name, setting]) => {
        if (setting.onOff) {
          list.push(this.$t(`${this.tag}.${name}.label`).toString())
        }
        return list
      }, [] as string[])
    } else {
      return ['']
    }
  }
}
</script>

<style lang="scss">
.changed-state {
  color: $primary;
  display: inline;
}
</style>
