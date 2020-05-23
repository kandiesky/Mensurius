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
    <button type="submit">Ir Para Respostas</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    checarCodigo() {
      if (!this.codigo) {
        this.$snotify.warning("Nenhum código foi digitado!");
        return false;
      }
      this.$http
        .post("api/questionario.php", {
          params: {
            id: this.$root.estado.sessao.id,
            codigo: this.codigo,
            nome: this.nome,
            operacao: "checar"
          }
        })
        .then(response => {
          if (response.data.resultado == true) {
            if (this.nome != "") this.$root.estado.sessao.nome = this.nome;
            this.$router.push(`/questionario?id=${this.codigo}`);
          }
        })
        .catch(reason => {
          this.$snotify.error(
            `Houve um problema ao se comunicar com servidor: ${reason}`
          );
        });
    }
  },
  data() {
    return {
      codigo: "" as string,
      nome: "" as string
    };
  }
});
</script>
