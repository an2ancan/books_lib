<template>
  <div>
    <AppHeader />
    <div>
      <router-view/>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { store } from './components/store.js'

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
      console.log("updateed store with token", store.token)
    } else {
      console.log("No cookie found")
    }
    
  },

  // mounted() {
  //   const payload = {
  //     foo : "bar",
  //   }

  //   // const headers = new Headers({
  //   //   'Content-Type': 'application/json',
  //   //   'Authorization': `Bearer ${store.token}`
  //   // })

  //   const requestOptions = {
  //     method: 'POST',
  //     // headers: headers,
  //     body: JSON.stringify(payload)
  //   }

  //   fetch("http://localhost:8081/admin/foo", requestOptions)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response)
  //     })
  // }
}
</script>

<style>

</style>