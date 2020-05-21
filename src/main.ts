"use strict";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const mainEl = document.getElementById("app") as Element,
  qid = mainEl.getAttribute("data-qid")?.toString() as string, //Id do questionário, alfanumérico
  tema =
    (parseInt(localStorage.getItem("tema") as string) as number) ||
    (0 as number); //Aqui não tem problema o localStorage ser 0 ou null, porque defaulta pra 0.

console.log(mainEl);
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
      tema: tema as number //Int 0 ou 1, de acordo com o tema. 0 é pro tema claro e 1 para tema escuro. Padrão é 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(qid);
      if (qid && qid.length > 4) {
        this.$router.push(`/questionario?id=${qid}`);
      }
      this.estado.carregamento = false;
    });
  }
});
