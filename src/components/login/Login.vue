<template>
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
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    mostrarSenha() {
      this.mostrandoSenha = this.mostrandoSenha ? false : true;
    },
    fazerLogin() {
      if (!this.login || !this.senha) {
        this.$snotify.warning("Usuário ou Senha inválidos!");
        return false;
      }
      this.$root.estado.sessao.id = 1;
      if (this.$root) return true;

      this.$http
        .post("api/login.php", {
          params: {
            login: this.login,
            senha: this.senha
          }
        })
        .then(response => {
          if (response.data.resultado) {
            this.$snotify.success(
              "Login realizado com sucesso! Redirecionando para a sua dashboard."
            );
            this.$root.estado.sessao = {
              nome: response.data.resposta.sessao.nome,
              id: response.data.resposta.sessao.id,
              chave: response.data.resposta.sessao.chave
            };
            this.$router.push("/painel");
          }
        })
        .catch(reason => {
          this.$snotify.error(
            `Houve um problema ao se conectar com o servidor: ${reason}`
          );
        });
    }
  },
  data() {
    return {
      login: "" as string,
      senha: "" as string,
      mostrandoSenha: false as boolean
    };
  }
});
</script>
