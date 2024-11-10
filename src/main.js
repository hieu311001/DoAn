import { createApp } from 'vue'
import router from './router/router'
import store from './store/store';
import App from './App.vue'
import clickOutside from './common/directive/clickOutside';
import tooltip from '@/common/directive/tooltip';
import '@fortawesome/fontawesome-free/css/all.css'; // Import CSS của Font Awesome
import { getCookie } from './common/commonFn';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faUserSecret, faFilter, faEllipsis, faPenToSquare)

// Components
import BaseInput from './components/base/input/BaseInput.vue';
import BaseInputTag from './components/base/input/BaseInputTag.vue';
import BaseButton from './components/base/button/BaseButton.vue';
import BaseCombobox from './components/base/combobox/BaseCombobox.vue';
import BaseToast from './components/base/toast/BaseToast.vue';
import BaseCounter from '@/components/base/BaseCounter.vue';
// Popup
import CartPage from './components/view/Sells/CartPage.vue';

// Vuetify imports
import 'vuetify/styles'; // Import CSS của Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Tạo Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});


const app = createApp(App);

// Gắn hàm dùng chung vào `globalProperties`
app.config.globalProperties.getCookie = getCookie;

app.component("CartPage", CartPage);
app.component("BaseInput", BaseInput);
app.component("BaseCombobox", BaseCombobox);
app.component("BaseButton", BaseButton);
app.component("BaseCounter", BaseCounter);
app.component("font-awesome-icon", FontAwesomeIcon)

app.directive('clickOutside', clickOutside);
app.directive('tooltip', tooltip);

app.use(router);
app.use(store);
app.use(vuetify); // Sử dụng Vuetify trong Vue app

app.mount('#app');

