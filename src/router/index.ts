import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import login from "../views/Login.vue";
import painel from "../views/Painel.vue";
import questionario from "../views/Questionario.vue";
import informacoes from "../views/Informacoes.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: login
  },
  {
    path: "/questionario",
    name: "Questionário",
    component: questionario
  },
  {
    path: "/painel",
    name: "Dashboard",
    component: painel
  },
  {
    path: "/informacoes",
    name: "Informações",
    component: informacoes
  }
];

const router = new VueRouter({
  routes
});

export default router;
