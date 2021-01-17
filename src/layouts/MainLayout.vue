<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

       <q-toolbar-title>
          {{ $t($route.meta.name) }}
        </q-toolbar-title>
        <q-avatar>
        <img src="icons/favicon-96x96.png">
      </q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer
    v-model="left"
    side="left"
    elevated
    :width="200"
    bordered
    content-class="dark"
      >
        <q-scroll-area class="fit">
          <q-list padding v-for="m in menuItems" :key="m.link">
            <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            exact
            :to="m.link"
            >
              <q-item-section avatar>
                <q-avatar square>
                  <img :src="`icons/${m.img}.png`" />
                </q-avatar>
              </q-item-section>

              <q-item-section>{{ $t(m.title) }}</q-item-section>
            </q-item>
            <q-separator v-if="m.seperator === true" />
          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      left: false,
      miniState: true,
      menuItems: [
        { title: 'menu.overview', img: 'babyname', link: '/', seperator: true },
        { title: 'menu.sound', img: 'phonetics', link: 'sound' },
        { title: 'menu.family', img: 'family', link: 'family' },
        { title: 'menu.database', img: 'database', link: 'database', seperator: true },
        { title: 'menu.settings', img: 'settings', link: 'settings' },
        { title: 'menu.about', img: 'about', link: 'about' }
      ]
    }
  }
})
</script>

<style lang="scss">
body.body--dark {
  //background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(5,36,56,1) 35%, rgba(66,0,85,1) 100%);
  //background-image: url('/graphics/backgradient.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.my-menu-link {
  color: #ffffff;
  background: $primary
}

</style>
