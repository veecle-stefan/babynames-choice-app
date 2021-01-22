<template>
  <q-page class="q-pa-md">
    <div class="fit row wrap justify-around items-center content-stretch">
      <div class="col-12 col-sm-6">
      <img class=" applogo" src="graphics/easynames.png" />
      </div>
      <div class="col-12 col-sm-6 aboutblock">
        <div class="text-h5">{{ $t('about.title')}}</div>
        <div>{{ $t('about.description')}}</div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md  aboutblock">
        <div class="text-h6">{{ $t('about.imprint')}}</div>
        <div v-html="$t('about.legal')"></div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md  aboutblock">
        <div class="text-h6">{{ $t('about.software')}}</div>
        <div v-html="$t('about.swdesc')"></div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md  aboutblock">
        <div class="text-h6">{{ $t('about.attributions')}}</div>
        <div v-for="a in attribution" :key="a.title" v-html="a.html" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class About extends Vue {
  attribution = [
    { title: 'Vecteezy Images', html: '<a href="https://www.vecteezy.com/free-vector/flat-design">Flat Design Vectors by Vecteezy</a>' }
  ]
}
</script>

<style lang="scss">
.applogo {
  max-width: 20vw;
  height: auto;
}

.aboutblock {
  background: rgba( 255, 255, 255, 0.10 );
  box-shadow: 0 8px 50px 0 rgba(66, 63, 45, 0.57);
  backdrop-filter: blur( 10px );
  border-radius: 10px;
  padding: 10px;
}

</style>
