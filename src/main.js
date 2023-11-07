import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { auth, firestore } from "@/services/firebase.service.js"; // Asegúrate de que la ruta sea correcta

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .mixin({
    data() {
      return {
        // Agrega los servicios de Firebase a la instancia de Vue para que estén disponibles en toda la aplicación
        $auth: auth,
        $firestore: firestore,
      };
    },
  });

router.isReady().then(() => {
  app.mount("#app");
});
