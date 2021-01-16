<template>
  <q-page class="q-pa-md">
      <q-stepper
      v-model="step"
      vertical
      animated
    >
      <q-step
        :name="1"
        :title="$t('wizard.familyname.title')"
        color="secondary"
        icon="settings"
        :done="step > 1"
      >
      <div class="q-gutter-y-md column" style="max-width: 400px">
        <div>
          {{$t('wizard.privacy')}}
        </div>
        <q-input v-model="query.familyname" :label="$t('wizard.familyname.name')" :hint="$t('wizard.familyname.desc')" />
        <q-input v-model="query.mother" :label="$t('wizard.mother.name')" :hint="$t('wizard.mother.desc')" :suffix="query.familyname" />
        <q-input v-model="query.father" :label="$t('wizard.father.name')" :hint="$t('wizard.father.desc')" :suffix="query.familyname" />
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
        color="secondary"
      >
        <div class="q-gutter-y-md column" style="max-width: 400px">
          <div>
            {{$t('wizard.family', {mom: query.mother, dad: query.father, family: query.familyname})}}
          </div>
        <q-input v-for="(s, index) in query.siblings" :key="s.ID" v-model="s.firstname" :suffix="query.familyname" :label="$t('wizard.sibling.name')" :hint="$t('wizard.sibling.desc')">
            <template v-slot:append>
              <q-btn dense icon="person_remove" @click="removeSibling(index)" />
            <q-btn-toggle
            push
            dense
            v-model="s.gender"
            rounded
            :options="genderOptions"
            >
              <template v-for="o in genderOptions" v-slot:[o.slot]>
                <q-img :key="o.slot" class="genderpicker" :src="`/icons/${o.slot}.png`" @click="s.gender = o.value" />
              </template>
            </q-btn-toggle>
            </template>
          </q-input>
          <q-btn icon="person_add" color="primary" :label="$t('wizard.sibling.add')" @click="addSibling" />
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
      <div class="row">
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
            {{$t('wizard.precautions.desc')}}
          </div>
          <q-list>
          <label-checkbox v-model="query.precautions.grandma" :label="$t('wizard.precautions.grandma.title')" :hint="$t('wizard.precautions.grandma.desc')" />
          <label-checkbox v-model="query.precautions.grownup" :label="$t('wizard.precautions.grownup.title')" :hint="$t('wizard.precautions.grownup.desc')" />
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
import { BabyDatabase, BabyName, Family } from '../babynames'

@Component({
  components: { Namecard, LabelCheckbox }
})
export default class Sound extends Vue {
  step = 1
  query = new Family()
  genderOptions = [
    { value: 'f', slot: 'genderf' },
    { value: 'u', slot: 'genderu' },
    { value: 'm', slot: 'genderm' }
  ]

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
