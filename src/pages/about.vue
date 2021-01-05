<template>
  <q-page class="q-pa-md backimg">
    <div class="fit row wrap justify-around items-center content-stretch">
      <div class="col-12 col-sm-6">
      <img class=" applogo" src="graphics/easynames.png" />
      </div>
      <div class="col-12 col-sm-6">
        <div class="text-h5">{{ $t('about.title')}}</div>
        <div>{{ $t('about.description')}}</div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md">
        <div class="text-h6">{{ $t('about.imprint')}}</div>
        <div v-html="$t('about.legal')"></div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md">
        <div class="text-h6">{{ $t('about.software')}}</div>
        <div v-html="$t('about.swdesc')"></div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'About'
})
</script>

<style lang="scss">
.applogo {
  max-width: 20vw;
  height: auto;
}

.backimg {
  display: block;
  position: relative;
}

.backimg:after {
  content: "";
  position: absolute;
  background-image: url('/graphics/baby-logo.png');
  background-size: cover;
  opacity: .1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}
</style>
