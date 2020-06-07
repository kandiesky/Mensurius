<template>
  <keep-alive>
    <form @submit.prevent="fazerLogin()" class="card card-form">
      <div class="card-form-group">
        <input type="text" id="login" v-model="login" />
        <label for="login" :class="[login.length > 0 ? 'preenchido' : '']"
          >USUÁRIO OU EMAIL</label
        >
      </div>
      <div class="card-form-group">
        <input
          :type="mostrandoSenha ? 'text' : 'password'"
          id="senha"
          v-model="senha"
        />
        <label for="senha" :class="[senha.length > 0 ? 'preenchido' : '']"
          >SENHA</label
        >
        <button type="button" @click="mostrarSenha()">
          <icon :icon="mostrandoSenha ? 'eye-slash' : 'eye'" />
        </button>
      </div>
      <button type="submit">ENTRAR</button>
      <br />
      <router-link tag="button" :to="{ path: '/' }" class="mt-2"
        >QUERO DIGITAR UM CÓDIGO</router-link
      >
    </form>
  </keep-alive>
</template>
<script lang="ts">
import Vue from "vue";
import { AxiosResponse, AxiosError } from "axios";

export default Vue.extend({
  props: ["estado"],
  methods: {
    mostrarSenha() {
      this.mostrandoSenha = this.mostrandoSenha ? false : true;
    },
    fazerLogin() {
      if (!this.login || !this.senha) {
        this.$snotify.warning("Usuário ou Senha inválidos!");
        return false;
      }

      const data = new FormData();
      data.append("login", this.login);
      data.append("senha", this.senha);

      this.$http
        .post("/mensurius/api/login.php", data)
        .then((response: AxiosResponse) => {
          if (response.data.resultado) {
            this.$snotify.success(
              "Login realizado com sucesso! Redirecionando para a sua dashboard."
            );
            this.estado.sessao = response.data.resposta.sessao;
            this.$router.push("/painel");
          } else {
            this.$snotify.error(response.data.mensagem);
          }
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(
            `Houve um problema ao se conectar com o servidor: ${reason}`
          );
        });
    }
  },
  data() {
    return {
      login: "",
      senha: "",
      mostrandoSenha: false
    };
  },
  mounted() {
    this.$http
      .get("/mensurius/api/estado.sessao.php")
      .then((response: AxiosResponse) => {
        if (response.data.resultado && this.$route.path != "/questionario") {
          this.estado.sessao = response.data.resposta.sessao;
          this.$snotify.info(
            "VOCÊ JÁ ESTÁ LOGADO E FOI REDIRECIONADO PARA O PAINEL"
          );
          this.$router.push("/painel");
        }
      });
  }
});
</script>
