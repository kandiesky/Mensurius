<template>
  <div class="wrapper">
    <form @submit.prevent="cadastrar()" class="card card-form">
      <h3>CADASTRO MENSURIS</h3>
      <div class="card-form-group">
        <input type="text" id="login" v-model="login" />
        <label for="login" :class="[login.length > 0 ? 'preenchido' : '']"
          >NOME DE USUÁRIO</label
        >
      </div>
      <div class="card-form-group">
        <input type="password" id="senha" v-model="senha" />
        <label for="senha" :class="[senha.length > 0 ? 'preenchido' : '']"
          >SENHA</label
        >
      </div>
      <div class="card-form-group">
        <input
          type="password"
          id="confirmacaoSenha"
          v-model="confirmacaoSenha"
        />
        <label
          for="confirmacaoSenha"
          :class="[confirmacaoSenha.length > 0 ? 'preenchido' : '']"
        >
          CONFIRME SUA SENHA
        </label>
      </div>
      <div class="card-form-group">
        <input type="email" id="login" v-model="email" />
        <label for="email" :class="[email.length > 0 ? 'preenchido' : '']"
          >EMAIL</label
        >
      </div>
      <div class="card-form-group">
        <input type="text" id="codigo" v-model="codigo" />
        <label for="codigo" :class="[codigo.length > 0 ? 'preenchido' : '']"
          >SEU CÓDIGO PARA CADASTRO</label
        >
      </div>
      <button type="submit">CADASTRAR</button>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      login: "",
      senha: "",
      confirmacaoSenha: "",
      email: "",
      codigo: ""
    };
  },
  methods: {
    cadastrar() {
      if (this.senha !== this.confirmacaoSenha) {
        this.$snotify.warning("As senhas não conferem!");
        return;
      }
      if (this.email == "" || this.login == "" || this.codigo == "") {
        this.$snotify.warning(
          "Muitos campos foram deixados vazios! Preencha-os."
        );
        return;
      }

      this.$http
        .post("api/registro.php", {
          params: {
            login: this.login,
            senha: this.senha,
            email: this.email,
            codigo: this.codigo
          }
        })
        .then(response => {
          if (!response.resultado) {
            this.$snotify.warning(response.data.mensagem);
            return;
          }

          this.$snotify.success(response.data.mensagem);
          this.estado.sessao = response.data.data;
        })
        .catch(reason => {
          this.$snotify.error(
            `Houve um problema ao se conectar com o servidor: ${reason}`
          );
        });
    }
  }
});
</script>
