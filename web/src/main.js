import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store';
import PaperDashboard from './plugins/paperDashboard';
import 'vue-notifyjs/themes/default.css';

Vue.use(PaperDashboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
