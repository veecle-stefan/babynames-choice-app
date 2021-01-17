<template>
  <q-page>
      <q-stepper
      v-model="step"
      animated
      vertical
    >
      <q-step
        :name="1"
        :title="$t('wizard.familyname.title')"
        icon="settings"
        :done="step > 1"
      >
      <div class="row">
        <div class="col-12">
          {{$t('wizard.privacy')}}
        </div>
        <div class="col-12">
          <person-input v-model="query.familyname" labels="wizard.familyname" />
        </div>
        <div class="col-12 col-sm-6">
          <person-input type="mother" v-model="query.mother" labels="wizard.mother" :suffix="query.familyname.name" />
        </div>
        <div class="col-12 col-sm-6">
          <person-input type="father" v-model="query.father" labels="wizard.father" :suffix="query.familyname.name" />
        </div>
      </div>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="secondary" :label="$t('wizard.continue.withsiblings')" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        :title="$t('wizard.sibling.add')"
        caption="The existing sistor or brother of the newborn"
        icon="person_add"
        :done="step > 2"
      >
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
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" :label="query.siblings.length > 0 ? $t('wizard.continue.multiplesiblings') : $t('wizard.continue.nosiblings')" />
          <q-btn flat @click="step = 1"  :label="$t('wizard.back')" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="3"
        :title="$t('wizard.sound.choose')"
        icon="hearing"
        :done="step > 3"
      >
      <div class="column">
        <div>
          {{$t('wizard.sound.hint')}}
        </div>
        <div class="fit row no-wrap justify-start items-start content-start">
          <vowel-selector v-for="s in query.sound" :key="s.syllable" v-model="s.sound" />
          <div class="column justify-center q-pa-md">
            <q-btn icon="add" color="primary" @click="query.addSyllable()" :disable="!moreSoundsAvailable()" />
            <q-btn icon="remove" color="primary" @click="query.removeLastSyllable()" :disable="!lessSoundsPossible()" />
          </div>
          <div class="column justify-center q-pa-md">
            <div>
              {{$t('wizard.sound.example')}}:
            </div>
            <syllables-splitter :syllables="nameVowelExample(query.sound)" />
          </div>
        </div>
      </div>
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" :label="$t('wizard.continue.sound')" />
          <q-btn flat @click="step = 2"  :label="$t('wizard.back')" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="4"
        :title="$t('wizard.precautions.title')"
        icon="elderly"
        :done="step > 4"
      >
        <div class="q-gutter-y-md column" style="max-width: 400px">
          <div>
            {{$t('wizard.precautions.hint')}}
          </div>
          <q-list>
          <label-checkbox v-model="query.precautions.grandma" :label="$t('wizard.precautions.grandma.title')" :hint="$t('wizard.precautions.grandma.hint')" />
          <label-checkbox v-model="query.precautions.grownup" :label="$t('wizard.precautions.grownup.title')" :hint="$t('wizard.precautions.grownup.hint')" />
          </q-list>
        </div>
        <q-stepper-navigation>
          <q-btn @click="step = 5" color="primary" label="Finish" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <div class="q-pa-md" v-if="step === 5">
      <name-picker :family="query" />
    </div>
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
import { Family, PersonID, Syllables, SyllableSound } from '../babynames'

@Component({
  components: { Namecard, LabelCheckbox, PersonInput, VowelSelector, SyllablesSplitter, NamePicker }
})
export default class Sound extends Vue {
  step = 1
  query = new Family()

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
