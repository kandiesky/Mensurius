<template>
  <div class="wrapper">
    <form @submit.prevent="criar()" class="card card-lg card-form">
      <h3>INFORMAÇÕES</h3>
      <div class="card-form-group">
        <input type="text" id="nome" v-model="nome" />
        <label for="nome" :class="[nome.length > 0 ? 'preenchido' : '']"
          >NOME DO QUESTIONÁRIO</label
        >
      </div>
      <div class="card-form-group">
        <input type="text" id="pergunta" v-model="pergunta" />
        <label for="pergunta" :class="[pergunta.length > 0 ? 'preenchido' : '']"
          >PERGUNTA</label
        >
      </div>
      <div class="card-form-group">
        <input type="date" id="vencimento" v-model="vencimento" />
        <label for="vencimento" class="preenchido">DATA DE VENCIMENTO</label>
      </div>
      <h3>MÍDIA</h3>
      <div class="card-form-group">
        <input type="file" id="midia" ref="midia" @change="preverMidia()" />
        <button
          title="Clique aqui para apagar a mídia"
          v-if="midia"
          type="button"
          @click="removerMidia()"
        >
          <icon icon="trash-alt" />
        </button>
      </div>
      <div v-if="midia.length > 0" class="wrapper">
        <img :src="midia" alt="Previsualização de Mídia" class="midia" />
      </div>
      <h3>RESPOSTAS</h3>
      <div
        class="card-form-group"
        v-for="(resposta, index) in respostas"
        :key="index"
      >
        <input type="text" v-model="resposta.texto" :id="`resposta-${index}`" />
        <label
          :for="`resposta-${index}`"
          :class="[resposta.texto.length > 0 ? 'preenchido' : '']"
          >RESPOSTA {{ index + 1 }}</label
        >
        <button
          title="Clique aqui para apagar esta resposta"
          v-if="tamanho(respostas) > 2"
          type="button"
          @click="removerResposta(index)"
        >
          <icon icon="trash-alt" />
        </button>
      </div>
      <button @click="adicionarResposta()" v-if="tamanho(respostas) < 5">
        ADICIONAR RESPOSTA ({{ tamanho(respostas) }}/5)
      </button>
      <div class="card-form-group"></div>
      <h3>FINALIZAR</h3>
      <button type="submit">CONFIRMAR CRIAÇÃO</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import size from "lodash/size";

export default Vue.extend({
  props: ["questionarios", "paginas"],
  data() {
    return {
      nome: "",
      pergunta: "",
      vencimento: "",
      respostas: [{ texto: "" }, { texto: "" }],
      midia: ""
    };
  },
  methods: {
    tamanho(obj = {} || []) {
      return size(obj);
    },
    preverMidia() {
      if (this.midia.length == 0) {
        this.$snotify.info(
          "Dê preferência por imagens no modo paisagem (deitadas) quando está fazendo questionários para computadores e celulares!",
          "DICA",
          { timeout: 8000 }
        );
      }
      const midia = new FileReader();
      const input = this.$refs.midia as HTMLInputElement;

      //Eu odeio typescript
      if (!input.files) input.files = new FileList();

      midia.readAsDataURL(input.files[0]);
      midia.onload = () => {
        if (
          midia.result &&
          midia.result.toString().search(/data:image/i) === -1
        ) {
          this.$snotify.error("O arquivo não é uma imagem!", "ERRO", {
            timeout: 8000
          });
          return;
        }
        this.midia = midia.result as string;
      };
    },
    adicionarResposta() {
      this.respostas.push({ texto: "" });
    },
    removerResposta(index: number) {
      this.$delete(this.respostas, index);
    },
    removerMidia() {
      (this.$refs.midia as HTMLInputElement).value = "";
      this.midia = "";
    },
    criar() {
      const formData = new FormData();
      formData.append("nome", this.nome);
      formData.append("pergunta", this.pergunta);
      formData.append("vencimento", this.vencimento);
      formData.append("respostas", this.respostas);
      formData.append("midia", this.midia);

      this.$http({
        method: "POST",
        url: "/mensurius/api/criar.questionario.php",
        data: formData
      });
    }
  }
});
</script>
