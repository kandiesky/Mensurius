"use strict";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMoon,
  faSun,
  faEllipsisV,
  faEdit,
  faInfo,
  faCalendarCheck,
  faTrashAlt,
  faAngleDoubleLeft,
  faIdCardAlt,
  faTh,
  faCircleNotch,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faPlusCircle,
  faCaretLeft,
  faArrowAltCircleLeft,
  faHome,
  faPlusSquare,
  faSignOutAlt,
  faUserCheck,
  faQrcode,
  faRedo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faMoon,
  faSun,
  faHome,
  faSignOutAlt,
  faPlusSquare,
  faEllipsisV,
  faEdit,
  faInfo,
  faCalendarCheck,
  faTrashAlt,
  faAngleDoubleLeft,
  faUserCheck,
  faTh,
  faCircleNotch,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faPlusCircle,
  faCaretLeft,
  faArrowAltCircleLeft,
  faIdCardAlt,
  faQrcode,
  faRedo
);

Vue.component("icon", FontAwesomeIcon);

import axios from "axios";
import vueAxios from "vue-axios";

Vue.use(vueAxios, axios);

import Snotify, { SnotifyPosition } from "vue-snotify";

Vue.use(Snotify, {
  toast: {
    timeout: 5000,
    position: SnotifyPosition.rightTop
  }
});

//import vueQr from "vue-qr";
Vue.component("qr", () => import("vue-qr"));

//import colorpicker
//Vue.component("color-picker", () => import("@caohenghu/vue-colorpicker"))
//Vue clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

const mainEl = document.getElementById("app") as Element,
  qid = mainEl.getAttribute("data-qid")?.toString(),
  relacionado = mainEl.getAttribute("data-relacionado"); //Id do questionário, alfanumérico

Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.config.devtools = false;

new Vue({
  el: mainEl,
  router,
  template: "<App :estado='estado'/>",
  components: {
    App
  },
  data: {
    estado: {
      carregamento: true as boolean, //Se está carregnado. Importante pois define a visibilidade do preloader.
      sessao: {
        nome: "" as string, //Nome do usuário que está na sessão. Mais utilizado para visitantes
        id: 0 as number, //ID do usuário da sessão. É batido junto com a Chave para verificar se o login é legítimo
        chave: "" as string, //Chave do usuário da sessão. É gerado via php com alguns parâmetros
        relacionado:
          relacionado?.length && relacionado != "" ? relacionado : "3"
      }
    }
  },
  mounted() {
    if (qid && qid.length > 4) {
      this.$router.push({
        path: `/questionario`,
        query: { qid }
      });
    }
    this.estado.carregamento = false;
  }
});
