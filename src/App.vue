<template>
  <main
    id="app"
    :class="[tema === 0 ? 'tema-claro' : 'tema-escuro']"
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
        <icon v-if="tema == 0" icon="sun" />
        <icon v-else icon="moon" />
        <span>&nbsp; Modo {{ tema == 0 ? "Claro" : "Noturno" }}</span>
      </a>
      <router-link to="/" v-if="!estado.sessao.id">
        <icon icon="home" />
        <span>&nbsp;Início</span>
      </router-link>
      <router-link to="/" class="sub" v-if="!estado.sessao.id">
        <icon icon="qrcode" />
        <span>&nbsp;‏‏‎ ‎Código</span>
      </router-link>
      <router-link to="login" class="sub" v-if="!estado.sessao.id">
        <icon icon="user-check" />
        <span>&nbsp;Login</span>
      </router-link>
      <!-- <router-link to="registrar" class="sub" v-if="!estado.sessao.id">
        <icon icon="id-card-alt" />
        <span>&nbsp;Cadastro</span>
      </router-link>-->
      <router-link v-if="estado.sessao.id" to="/painel">
        <icon icon="th" />
        <span>&nbsp;Dashboard</span>
      </router-link>
      <router-link v-if="estado.sessao.id" to="/painel/criar" class="sub">
        <icon icon="plus-square" />
        <span>&nbsp;Criar Questionário</span>
      </router-link>
      <a v-if="estado.sessao.id" @click="sair()">
        <icon icon="sign-out-alt" />
        <span>&nbsp;Sair</span>
      </a>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :estado="estado" />
    </transition>
    <vue-snotify />
    <footer>
      Utilitário Mensurius
      <br />© MULTIKOMBRASIL / Scripta 2020
    </footer>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse, AxiosError } from "axios";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      navbarRetraida: parseInt(
        localStorage.getItem("navbar") as string
      ) as number,
      tema: parseInt(localStorage.getItem("tema") as string) as number
    };
  },
  methods: {
    mudarTema() {
      this.tema = this.tema == 1 ? 0 : 1; //Switch ternário
      localStorage.setItem("tema", `${this.tema}`);
    },
    retrairNavbar() {
      this.navbarRetraida = this.navbarRetraida ? 0 : 1;
      localStorage.setItem("navbar", `${this.navbarRetraida}`);
    },
    sair() {
      this.$http
        .get("/mensurius/api/logout.php")
        .then((response: AxiosResponse) => {
          if (response.data.resultado) {
            this.estado.sessao = {
              nome: "",
              id: "",
              chave: "",
              relacionado: 3
            };
            this.$router.push("/");
          }
          this.$snotify.success(response.data.mensagem);
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error("HOUVE UMA FALHA AO SE CONECTAR COM O SERVIDOR!");
        });
    }
  },
  mounted() {
    if (localStorage.getItem("navbar") === null) {
      localStorage.setItem("navbar", "0");
    }
    if (localStorage.getItem("tema") === null) {
      localStorage.setItem("tema", "0");
    }
  }
});
</script>

<style lang="scss">
@import "@/App.scss";
</style>
