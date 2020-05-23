<template>
  <div class="wrapper modal">
    <div class="modal-body">
      <form @submit.prevent class="card-form">
        <div class="card-form-group">
          <input type="text" v-model="nome" id="nome" />
          <label for="nome" :class="[nome.length > 0 ? 'preenchido' : '']"
            >NOME DO QUESTIONÁRIO</label
          >
        </div>
        <div class="card-form-group">
          <input type="file" name="midia" id="midia" v-show="false" />
          <label for="midia" class="btn">Selecionar Mídia</label>
        </div>
        <div
          class="card-form-group"
          v-for="(resposta, index) in respostas"
          :key="index"
        >
          <textarea
            v-model="respostas[index].resposta"
            :id="`resposta-${index}`"
          ></textarea>
          <label
            :for="`resposta-${index}`"
            :class="[resposta.texto.length > 0 ? 'preenchido' : '']"
            >RESPOSTA {{ index }}</label
          >
        </div>
        <div
          class="wrapper"
          v-if="tamanho(respostas) > 1 && tamanho(respostas) < 6"
        >
          <button @click="adicionarResposta()">
            <icon icon="plus-circle" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import size from "lodash/size";
import assignIn from "lodash/assignIn";

export default Vue.extend({
  props: ["questionario", "estadoModais"],
  methods: {
    tamanho(object = {} || []) {
      return size(object);
    },
    adicionarResposta() {
      const ultimaChave = size(this.respostas) - 1;
      console.log(ultimaChave);
      this.respostas = assignIn(this.respostas, {
        ultimaChave: { texto: "", contagem: 0 }
      });
    },
    removerResposta(index) {
      console.log(index);
    }
  },
  data() {
    return {
      nome: "",
      midiaPergunta: "",
      respostas: {},
      votosOcultos: false,
      validade: ""
    };
  },
  mounted() {
    this.nome = this.questionario.nome;
    this.midiaPergunta = this.questionario.midiaPergunta;
    this.respostas = this.questionario.respostas;
    this.votosOcultos = this.questionario.votosOcultos;
    this.validade = this.questionario.validade;
  }
});
</script>
