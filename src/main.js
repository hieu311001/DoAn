import { createApp } from 'vue'
import router from './router/router'
import store from './store/store';
import App from './App.vue'
import clickOutside from './common/directive/clickOutside';
import tooltip from '@/common/directive/tooltip';

const app = createApp(App);

app.directive('clickOutside', clickOutside);
app.directive('tooltip', tooltip);

app.use(router);
app.use(store);

app.mount('#app');

