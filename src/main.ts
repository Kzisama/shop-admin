import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import router from "./router";
import { createPinia } from "pinia";
import "./router/permission.js";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
