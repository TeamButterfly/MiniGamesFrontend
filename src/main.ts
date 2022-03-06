import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia, PiniaVuePlugin } from 'pinia';
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleXmark,
  faInfo,
  faInfoCircle,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTriangleExclamation);
library.add(faInfoCircle);
library.add(faCircleXmark);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(PiniaVuePlugin);
Vue.use(VModal);

const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
