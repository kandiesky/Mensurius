<template>
  <main
    id="app"
    :class="[estado.tema === 0 ? 'tema-claro' : 'tema-escuro']"
    class="wh-100"
  >
    <div class="carregamento" v-show="estado.carregamento">
      <img src="../assets/loading.svg" alt="Carregando..." />
    </div>
    <div
      :class="['navbar', 'vertical-navbar', navbarRetraida ? 'retraida' : '']"
    >
      <a @click="retrairNavbar()">
        <icon
          icon="angle-double-left"
          :transform="{ rotate: navbarRetraida ? 180 : 0 }"
        />
      </a>
      <a @click="mudarTema()">
        <icon v-if="estado.tema == 0" icon="sun" />
        <icon v-else icon="moon" />
        <span>&nbsp; Modo {{ estado.tema == 0 ? "Claro" : "Noturno" }}</span>
      </a>
      <router-link to="/">
        <icon icon="user" />
        <span>&nbsp;Login</span>
      </router-link>
      <router-link v-if="estado.sessao.id" to="/painel">
        <icon icon="th" />
        <span>&nbsp;Dashboard</span>
      </router-link>
      <router-link v-if="estado.sessao.id" to="/questionario?id=47a">
        <icon icon="th" />
        <span>&nbsp;Questionário 47a</span>
      </router-link>
      <router-link v-if="estado.sessao.id" to="/informacoes?id=47a">
        <icon icon="info-circle" />
        <span>&nbsp;Informações Questionario</span>
      </router-link>
      <a v-if="true /*$route.name == 'Dashboard'*/">
        <icon icon="edit" />
        <span>&nbsp;Estou em: {{ $route.name }}</span>
      </a>
    </div>
    <router-view :estado="estado" />
    <vue-snotify />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      navbarRetraida: localStorage.getItem("navbar")
    };
  },
  methods: {
    mudarTema() {
      this.estado.tema = this.estado.tema == 1 ? 0 : 1; //Switch ternário
      localStorage.setItem("tema", this.estado.tema.toString());
    },
    retrairNavbar() {
      this.navbarRetraida = this.navbarRetraida ? false : true;
      localStorage.setItem("navbar", this.navbarRetraida.toString());
    }
  }
});
</script>

<style lang="scss">
@import "@/App.scss";
</style>
