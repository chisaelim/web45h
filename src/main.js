import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    profile: null
  },
  getters: {

  },
  mutations: {
    refreshProfile(state, newProfile) {
      state.profile = newProfile;
    }
  },
  actions: {

  }
});

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')



