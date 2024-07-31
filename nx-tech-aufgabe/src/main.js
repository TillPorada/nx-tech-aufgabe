import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const vuetify = createVuetify({
    components,
    directives,
})

const options = {
    
};

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(Toast, options);

app.mount('#app')
