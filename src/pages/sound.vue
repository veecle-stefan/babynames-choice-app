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
          <q-input v-model="query.familyname" :label="$t('wizard.familyname.name')" :hint="$t('wizard.familyname.desc')" />
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
          <q-btn @click="step = 2" color="secondary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 1"  label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Ad template"
        icon="assignment"
        disable
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <div class="row items-start q-gutter-md">
      <div class="col-12">
        Familienname
      </div>
      <div class="col-12">
        Schwester | Bruder
      </div>
      <div class="col-12">
        Klang: Scrollrad mit Anfangsbuchstabe, dann 2-5 hoch/tief Silben, dann Endbuchstabe
      </div>
      <div class="col-12 col-md-5" v-for="name in testNames()" :key="name.spellings[0].syllables.formattedName">
        <namecard :name="name"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Namecard from '../components/namecard.vue'
import { BabyDatabase, BabyName, Family } from '../babynames'

@Component({
  components: { Namecard }
})
export default class Sound extends Vue {
  step = 1
  query = new Family()
  genderOptions = [
    { value: 'f', slot: 'genderf' },
    { value: 'u', slot: 'genderu' },
    { value: 'm', slot: 'genderm' }
  ]

  removeSibling (idx: number) {
    this.query.siblings.splice(idx, 1)
  }

  addSibling () {
    this.query.addSibling()
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
</style>
