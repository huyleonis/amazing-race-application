import Vue from 'vue'
import router from '@router'
import store from '@state/store'

// Globally register all `_base`-prefixed components
import '@components/_globals'

// Third-party components
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/dist/vue-awesome'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// Third party style
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import 'verte/dist/verte.css'

// Third party scripts
import './utils/icons'
import * as veeValidateRules from 'vee-validate/dist/rules'
import App from './app.vue'
import '@utils/vee-validate-rules'

// [Start] Third party init section
Vue.use(BootstrapVue)
Vue.component('v-icon', Icon)

// vee-validate
for (const rule in veeValidateRules) {
  // add the rule
  extend(rule, veeValidateRules[rule])
}

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// [End] third party init section

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
