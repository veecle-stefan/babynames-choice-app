<template>
  <q-page>
     <q-list bordered class="bg-dark" dense>
       <setting-group tag="wizard.familyname" @reset="query.resetFamilyName()" icon="loyalty" :summary="[query.familyname.name]">
          <div class="row">
            <div class="col-12">
              {{$t('wizard.privacy')}}
            </div>
            <div class="col-12">
              <person-input v-model="query.familyname" labels="wizard.familyname" />
            </div>
          </div>
       </setting-group>
      <q-separator />
      <setting-group tag="wizard.parents" @reset="query.resetParents()" icon="person_pin" :summary="[query.mother.name, query.father.name]">
        <div class="row">
          <div class="col-12 col-sm-6">
            <person-input type="mother" v-model="query.mother" labels="wizard.mother" :suffix="query.familyname.name" />
          </div>
          <div class="col-12 col-sm-6">
            <person-input type="father" v-model="query.father" labels="wizard.father" :suffix="query.familyname.name" />
          </div>
        </div>
      </setting-group>
      <q-separator />
      <setting-group tag="wizard.sibling" @reset="query.resetSiblings()" icon="person_add" :summary="query.siblings.map(s => s.person.name)">
        <div class="row wrap items-center">
          <div class="col-12">
            {{$t('wizard.family', {mom: query.mother.name, dad: query.father.name, family: query.familyname.name})}}
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(s, idx) in query.siblings" :key="s.ID" >
            <person-input type="child" :editable="true" v-model="s.person" :suffix="query.familyname.name" labels="wizard.sibling" @remove="removeSibling(idx)" :error="checkDoubleName(query.siblings, s)" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-btn icon="person_add" v-show="query.allNamesFilled(query.siblings)" color="primary" :label="query.siblings.length > 0 ? $t('wizard.sibling.add') : $t('wizard.sibling.addfirst')" @click="query.addSibling()" />
          </div>
        </div>
      </setting-group>
      <q-separator />
      <setting-group tag="wizard.sound" @reset="query.resetSound()" icon="hearing" :summary="query.useSound ? [$t('wizard.sound.use')] : []" >
        <div class="column">
          <div>
            {{$t('wizard.sound.hint')}}
          </div>
          <q-checkbox v-model="query.useSound" :label="$t('wizard.sound.use')" />
          <div class="fit row no-wrap justify-start items-start content-start">
            <vowel-selector v-for="s in query.sound" :key="s.syllable" v-model="s.sound" @change="query.useSound = true" :disable="!query.useSound" />
            <div class="column justify-center q-pa-md">
              <q-btn :disable="!moreSoundsAvailable()" icon="add" color="primary" @click="query.addSyllable(), query.useSound = true" />
              <q-btn :disable="!lessSoundsPossible()" icon="remove" color="primary" @click="query.removeLastSyllable(), query.useSound = true" />
            </div>
            <div class="column justify-center q-pa-md" v-show="query.useSound">
              <div>
                {{$t('wizard.sound.example')}}:
              </div>
              <syllables-splitter :syllables="nameVowelExample(query.sound)" />
            </div>
          </div>
        </div>
      </setting-group>
      <q-separator />
      <setting-group tag="wizard.narrow" @reset="query.resetFilter()" icon="filter_alt">

      </setting-group>
      <q-separator />
      <setting-group tag="wizard.precautions" @reset="query.resetPrecautions()" icon="elderly" :summary="enabledPrecautionNames()">
        <div class="q-gutter-y-md column" style="max-width: 400px">
          <div>
            {{$t('wizard.precautions.hint')}}
          </div>
          <q-list>
          <label-checkbox v-model="query.precautions.grandma" :label="$t('wizard.precautions.grandma.title')" :hint="$t('wizard.precautions.grandma.hint')" />
          <label-checkbox v-model="query.precautions.grownup" :label="$t('wizard.precautions.grownup.title')" :hint="$t('wizard.precautions.grownup.hint')" />
          </q-list>
        </div>
      </setting-group>
     </q-list>
    <div class="q-pa-md">
      <name-picker :family="query" />
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]" duration="0">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'
import LabelCheckbox from '../components/label-checkbox.vue'
import PersonInput from '../components/person-input.vue'
import VowelSelector from '../components/vowel-selector.vue'
import SyllablesSplitter from '../components/syllables-splitter.vue'
import NamePicker from '../components/name-picker.vue'
import SettingGroup from '../components/setting-group.vue'
import { Family, PersonID, Syllables, SyllableSound } from '../babynames'

@Component({
  components: { Namecard, LabelCheckbox, PersonInput, VowelSelector, SyllablesSplitter, NamePicker, SettingGroup }
})
export default class Sound extends Vue {
  query = new Family()
  showFamily = false

  removeSibling (idx: number) {
    this.query.siblings.splice(idx, 1)
  }

  checkDoubleName (list: PersonID[], p: PersonID): boolean {
    for (const check of list) {
      if ((p.ID !== check.ID) && (p.person.name === check.person.name)) {
        // double entry
        return true
      }
    }
    // no double name found
    return false
  }

  moreSoundsAvailable (): boolean {
    return this.query.sound.length < 5
  }

  lessSoundsPossible (): boolean {
    return this.query.sound.length > 1
  }

  enabledPrecautionNames (): string[] {
    return Object.entries(this.query.precautions).reduce((list, [name, enabled]) => {
      if (enabled) {
        list.push(this.$t(`wizard.precautions.${name}.title`).toString())
      }
      return list
    }, [] as string[])
  }

  nameVowelExample (s: SyllableSound[]): Syllables {
    return s.reduce((acc, syl) => {
      let oneSyl = ''
      let oneTone = 0
      oneSyl += acc.c.length === 0 ? 'L' : 'l'
      switch (syl.sound) {
        case 0:
          oneSyl += 'o'
          oneTone = 1
          break
        case 1:
          oneSyl += 'a'
          oneTone = 4
          break
        case 2:
          oneTone = 5
          oneSyl += 'ai'
      }
      acc.c.push(oneSyl)
      acc.t.push(oneTone)
      return acc
    }, new Syllables())
  }
}
</script>

<style lang="scss">

</style>
