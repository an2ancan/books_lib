<template>
  <div>
    <AppHeader />
    <div>
      <router-view @success="success" @error="error" @warning="warning" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { store } from './components/store.js'
import notie from 'notie'

const getCookie = (name) => {
  return document.cookie.split(';').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0].trim() === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      store
    }
  },
  beforeMount() {
    //check for the cookie
    let data = getCookie('_site_data')
    if (data) {
      let cookieData = JSON.parse(data)

      //update store
      store.token = cookieData.token.token
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }

  },

  methods: {
    success(msg) {
      notie.alert({
        type: 'success',
        text: msg,
      })
    },
    error(msg) {
      notie.alert({
        type: 'error',
        text: msg,
      })
    },
    warning(msg) {
      notie.alert({
        type: 'warning',
        text: msg,
      })
    }
  }

}
</script>

<style></style>