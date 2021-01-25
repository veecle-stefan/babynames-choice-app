<template>
<q-expansion-item
  v-model="isOpen"
  dense
  group="settings"
>
  <template v-slot:header>
    <q-item-section avatar><q-avatar :icon="icon" /></q-item-section>
    <q-item-section>
      <div>
      {{$t(`${tag}.title`)}}
      <span class="changed-state" v-show="showSummary()">
        {{summaryList()}}
      </span>
      </div>
      <span class="reduced-effect" v-show="isOpen && (eliminated > 0)">
        {{$t('wizard.eliminated', {num: eliminated})}}
      </span>
    </q-item-section>
    <q-item-section side>
      <q-btn dense flat icon="settings_backup_restore" @click.stop="resetSettings()" />
      </q-item-section>
  </template>
  <q-card class="settings-back">
    <q-card-section>
      <slot>
        <div class="row q-col-gutter-none justify-start items-start content-start" v-if="settings != null">
          <div v-for="setting in settingList()" :key="setting.name" :class="`col-12 ${setting.filter.hasMap() ? '' : 'col-md-4 col-sm-6'}`" >
            <filter-toggle v-model="setting.filter" :name="setting.name" :tag="tag" :subtag="subtag" />
          </div>
        </div>
      </slot>
    </q-card-section>
  </q-card>
</q-expansion-item>
</template>

<script lang="ts">
import { BinarySettings, BinarySettingsGroup, FilterSetting } from 'src/babynames/bitstuff'
import LabelledToggle from './labelled-toggle.vue'
import BitmaskToggle from './bitmask-toggle.vue'
import FilterToggle from './filter-toggle.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

interface FilterArray {
  filter: FilterSetting
  name: string
}

@Component({
  components: { LabelledToggle, BitmaskToggle, FilterToggle }
})
export default class SettingGroup extends Vue {
  @Prop({ required: true }) readonly tag!: string
  @Prop({ required: false, default: '' }) readonly subtag!: string
  @Prop({ required: true }) readonly icon!: string
  @Prop({ required: false, default: 0 }) readonly eliminated!: number
  @Prop({ required: false, default: function () { return [] as string[] } }) readonly summary!: string[]
  @Prop({ required: false, default: null }) readonly settings!: BinarySettingsGroup | null

  isOpen = false

  resetSettings () {
    this.isOpen = false
    if (this.settings) {
      BinarySettings.resetSettingsGroup(this.settings)
    }
    this.$emit('reset')
  }

  settingList (): FilterArray[] {
    const list = [] as FilterArray[]
    if (this.settings) {
      for (const setname in this.settings) {
        list.push({ filter: this.settings[setname], name: setname })
      }
    }
    return list
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
          let title = this.$t(`${this.tag}.${name}.label`).toString()
          // add sub-selected if possible
          if (setting.bitMap._map) {
            const sublist: Array<string> = []
            for (const key in setting.bitMap._map) {
              const val = setting.bitMap._map[key]
              const num = parseInt(key)
              if (setting.bitMap.isDifferent(num)) {
                sublist.push(val)
              }
            }
            if (sublist.length > 0) {
              title += ` (${sublist.join(',')})`
            }
          }
          list.push(title)
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
  margin-left: 20px;
}

.reduced-effect {
  color: $secondary;
  display: inline;
  float: right;
}

.settings-back {
  background: rgba(0, 0, 0, 0.1);
}
</style>
