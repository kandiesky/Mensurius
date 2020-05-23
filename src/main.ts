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
  faUser,
  faTh,
  faCircleNotch,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faMoon,
  faSun,
  faEllipsisV,
  faEdit,
  faInfo,
  faCalendarCheck,
  faTrashAlt,
  faAngleDoubleLeft,
  faUser,
  faTh,
  faCircleNotch,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faPlusCircle
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

import vueQr from "vue-qr";
Vue.component("qr", vueQr);

const mainEl = document.getElementById("app") as Element,
  qid = mainEl.getAttribute("data-qid")?.toString() as string, //Id do questionário, alfanumérico
  tema =
    (parseInt(localStorage.getItem("tema") as string) as number) ||
    (0 as number); //Aqui não tem problema o localStorage ser 0 ou null, porque defaulta pra 0.

Vue.config.productionTip = false;

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
      tema: tema as number, //Int 0 ou 1, de acordo com o tema. 0 é pro tema claro e 1 para tema escuro. Padrão é 0
      sessao: {
        nome: "" as string, //Nome do usuário que está na sessão. Mais utilizado para visitantes
        id: 0 as number, //ID do usuário da sessão. É batido junto com a Chave para verificar se o login é legítimo
        chave: "" as string //Chave do usuário da sessão. É gerado via php com alguns parâmetros
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (qid && qid.length > 4) {
        this.$router.push(`/questionario?id=${qid}`);
      }
      this.estado.carregamento = false;
    });
  }
});
