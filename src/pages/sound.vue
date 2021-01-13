<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        :done="step > 1"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
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
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
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
import { BabyDatabase, BabyName } from '../babynames'

@Component({
  components: { Namecard }
})
export default class Sound extends Vue {
  step = 1

  testNames (): BabyName[] {
    const result: BabyName[] = []
    do {
      const num = Math.floor(Math.random() * BabyDatabase.allNames.length)
      const newName = BabyDatabase.allNames[num]
      if (Object.keys(newName.indic).length === 0) {
        continue
      }
      if (!result.includes(newName)) {
        result.push(newName)
      }
    } while (result.length < 10)
    return result
  }
}
</script>

<style lang="scss">

</style>
