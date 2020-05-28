<template>
  <div class="wrapper flex flex-center">
    <form class="card card-lg card-form" @submit.prevent="votar()">
      <h1>{{ questionario.pergunta }}</h1>
      <small>Validade: {{ questionario.validade }}</small>
      <div v-if="questionario.midia.length > 0" class="wrapper">
        <img :src="questionario.midia.length" class="midia" />
      </div>
      <h2 class="mt-2">
        {{
          this.selecionado == -1
            ? "Selecione uma resposta para continuar"
            : "Clique em salvar para finalizar!"
        }}
      </h2>
      <div
        class="card-respostas flex"
        v-for="(resposta, index) in questionario.respostas"
        :key="index"
      >
        <input
          type="radio"
          v-model="selecionado"
          :value="index"
          name="resposta"
          :id="`resposta-${index}`"
        />
        <label :for="`resposta-${index}`">{{ resposta.texto }}</label>
      </div>
      <button
        :disabled="this.selecionado == -1"
        type="submit"
        class="btn-lg mt-2"
      >
        SALVAR RESPOSTA
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      selecionado: -1
    };
  },
  computed: {
    questionario: function() {
      return {
        nome: "0000000",
        codigo: "478as",
        pergunta: "Olá, tudo bem?",
        midia: "",
        respostas: [{ texto: "Sim" }, { texto: "Não" }, { texto: "Talvez" }],
        votosOcultos: false,
        quantidadeRespostas: 115,
        validade: "22/05/2020",
        criacao: "19/05/2020 09:35"
      };
    }
  },
  methods: {
    votar: function() {
      if (this.selecionado < 0 && this.selecionado > 5) {
        this.$snotify.warning("Nenhum valor foi selecionado!", "AVISO");
        return false;
      }
    }
  }
});
</script>
