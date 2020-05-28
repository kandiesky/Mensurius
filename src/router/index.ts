import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import login from "../views/Login.vue";
import loginForm from "../components/login/Login.vue";
import codigoForm from "../components/login/Codigo.vue";
import registrarForm from "../components/login/Registrar.vue";
import painel from "../views/Painel.vue";
import questionario from "../views/Questionario.vue";
import informacoes from "../components/painel/Informacoes.vue";
import criar from "../components/painel/Criar.vue";
import questionariosPainel from "../components/painel/Questionarios.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: login,
    children: [
      {
        name: "Login",
        path: "login",
        component: loginForm
      },
      {
        name: "Código",
        path: "",
        component: codigoForm
      },
      {
        name: "Registrar",
        path: "registrar",
        component: registrarForm
      }
    ]
  },
  {
    path: "/questionario",
    name: "Questionário",
    component: questionario
  },
  {
    path: "/painel",
    name: "Dashboard",
    component: painel,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: questionariosPainel
      },
      {
        path: "informacoes",
        name: "Informações",
        component: informacoes
      },
      {
        path: "criar",
        name: "Criar",
        component: criar
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
