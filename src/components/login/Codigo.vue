<template>
  <form @submit.prevent="checarCodigo()" class="card card-form">
    <div class="card-form-group">
      <input type="text" v-model="codigo" id="codigo" />
      <label for="codigo" :class="[codigo.length > 0 ? 'preenchido' : '']"
        >CÓDIGO DO QUESTIONÁRIO</label
      >
    </div>
    <div class="card-form-group">
      <input type="text" v-model="nome" id="nome" />
      <label for="nome" :class="[nome.length > 0 ? 'preenchido' : '']"
        >OPCIONAL: SEU NOME</label
      >
    </div>
    <button type="submit">RESPONDER</button>
    <router-link tag="button" :to="{ path: 'login' }" class="mt-2"
      >QUERO ACESSAR MINHA CONTA</router-link
    >
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse, AxiosError } from "axios";

export default Vue.extend({
  props: ["estado"],
  methods: {
    checarCodigo() {
      if (!this.codigo) {
        this.$snotify.warning("Nenhum código foi digitado!");
        return false;
      }
      this.$http
        .post("api/questionario.php", {
          params: {
            id: this.estado.sessao.id,
            codigo: this.codigo,
            nome: this.nome,
            operacao: "checar"
          }
        })
        .then((response: AxiosResponse) => {
          if (response.data.resultado != true) {
            this.$snotify.warning(
              `O código ${this.codigo} é inválido. Verifique se digitou corretamente`
            );
            return;
          }
          if (this.nome != "") {
            this.estado.sessao.nome = this.nome;
          }

          this.$router.push({
            path: "/questionario",
            query: { qid: this.codigo }
          });
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(
            `Houve um problema ao se comunicar com servidor: ${reason}`
          );
        });
    }
  },
  data() {
    return {
      codigo: "",
      nome: ""
    };
  }
});
</script>
