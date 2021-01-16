<template>
  <q-page class="q-pa-md">
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
        <div class="q-pa-md row wrap items-center">
          <div class="col-12">
            {{$t('wizard.family', {mom: query.mother.name, dad: query.father.name, family: query.familyname.name})}}
          </div>
          <div class="col-6 col-sm-4" v-for="(s, idx) in query.siblings" :key="s.ID" >
            <person-input type="child" :editable="true" v-model="s.person" :suffix="query.familyname.name" labels="wizard.sibling" @remove="removeSibling(idx)" />
          </div>
          <div class="col-6 col-sm-4">
            <q-btn icon="person_add" v-show="query.allNamesFilled(query.siblings)" color="primary" :label="query.siblings.length > 0 ? $t('wizard.sibling.add') : $t('wizard.sibling.addfirst')" @click="addSibling" />
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
      <div class="row wrap">
        <div class="col-12">
          {{$t('wizard.sound.hint')}}
        </div>
        <div class="column justify-start items-start content-start" v-for="s in query.sound" :key="s.syllable">
        <q-slider
          v-model="s.sound"
          vertical
          :min="0"
          :max="2"
          :step="1"
          snap
          reverse
          label-always
          :label-value="s.sound == 0 ? $t('wizard.sound.low') : s.sound == 1 ? $t('wizard.sound.high') : $t('wizard.sound.tremolo')"
          color="purple"
        />
        <img :src="`/icons/tones/${vowelForm[s.sound]}.png`" />
        </div>
        <div class="column justify-start items-start content-start">
          <q-btn icon="add" @click="query.addSyllable()" :disable="!moreSoundsAvailable()" />
          <q-btn icon="remove" @click="query.removeLastSyllable()" :disable="!lessSoundsPossible()" />
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
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'
import LabelCheckbox from '../components/label-checkbox.vue'
import PersonInput from '../components/person-input.vue'
import { BabyDatabase, BabyName, Family } from '../babynames'

@Component({
  components: { Namecard, LabelCheckbox, PersonInput }
})
export default class Sound extends Vue {
  step = 1
  query = new Family()

  vowelForm = ['low1', 'high1', 'hl1']

  removeSibling (idx: number) {
    this.query.siblings.splice(idx, 1)
  }

  addSibling () {
    this.query.addSibling()
  }

  moreSoundsAvailable (): boolean {
    return this.query.sound.length < 5
  }

  lessSoundsPossible (): boolean {
    return this.query.sound.length > 1
  }

  testNames (): BabyName[] {
    return [BabyDatabase.allNames[0]]
  }
}
</script>

<style lang="scss">
.genderpicker {
  width: 24px;
  height: 24px;
}

.soundadjust {
  height: 100px;
  max-height: 100px;
}
</style>
