<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" v-for="m in submenus" flat bordered>
      <q-card-section horizontal>
        <q-card-section>
        <div class="text-h6">{{m.title}}</div>
         {{ m.desc }}
        </q-card-section>
        <q-img class="col-5" :src="`icons/${m.img}.png`" />
      </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Overview extends Vue {
  
  submenus = [
    { img: 'phonetics', title: this.$t('methods.sound.title'), sub: this.$t('methods.sound.sub'), desc: this.$t('methods.sound.desc') },
    { img: 'family', title: this.$t('methods.family.title'), sub: this.$t('methods.family.sub'), desc: this.$t('methods.family.desc') },
  ]

}
</script>

<style lang="scss">

</style>
