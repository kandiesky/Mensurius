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
        <span id="avisoRetracao">&nbsp; Encolher Menu</span>
      </a>
      <a @click="mudarTema()" id="tema">
        <icon v-if="tema == 0" icon="sun" />
        <icon v-else icon="moon" />
        <span>&nbsp; Modo {{ tema == 0 ? "Claro" : "Noturno" }}</span>
      </a>
      <a
        @click="mudarTimingAtualizacao()"
        id="timing"
        v-if="this.estado.sessao.id"
      >
        <icon icon="clock" />
        <span>
          &nbsp;
          {{
            this.estado.timing == 999999999
              ? "Desativado"
              : `Atualizar a cada: ${this.estado.timing / 1000} segundos`
          }}
        </span>
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
      <a v-if="estado.sessao.id" id="sair" @click="sair()">
        <icon icon="sign-out-alt" />
        <span>&nbsp;Sair</span>
      </a>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :estado="estado" class="main" />
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
import { AxiosResponse } from "axios";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      navbarRetraida: 1,
      tema: 0
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
    mudarTimingAtualizacao() {
      if (this.estado.timing >= 150000 && this.estado.timing != 999999999) {
        this.estado.timing = 999999999;
      } else if (this.estado.timing == 999999999) {
        this.$snotify.info(
          "AS ATUALIZAÇÕES FORAM REATIVADAS MAS SÓ TERÃO EFEITO APÓS RECARREGAR A PÁGINA..."
        );
        this.estado.timing = 30000;
      } else {
        this.estado.timing += 15000;
      }
      localStorage.setItem("timing", `${this.estado.timing}`);
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
        .catch(() => {
          this.$snotify.error("HOUVE UMA FALHA AO SE CONECTAR COM O SERVIDOR!");
        });
    }
  },
  mounted() {
    if (localStorage.getItem("navbar") === null) {
      localStorage.setItem("navbar", "1"); //Padrão retraída
    } else {
      this.navbarRetraida = parseInt(
        localStorage.getItem("navbar") as string
      ) as number;
    }

    if (localStorage.getItem("timing") === null) {
      localStorage.setItem("timing", "30000"); //Padrão 30s
    } else {
      this.estado.timing = parseInt(
        localStorage.getItem("timing") as string
      ) as number;
    }

    if (localStorage.getItem("tema") === null) {
      localStorage.setItem("tema", "0");
    } else {
      this.tema = parseInt(localStorage.getItem("tema") as string) as number;
    }
  }
});
</script>

<style lang="scss">
@import "@/App.scss";
</style>
