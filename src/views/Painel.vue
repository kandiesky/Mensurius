<template>
  <div class="container">
    <keep-alive>
      <router-view :questionarios="questionarios" :paginas="paginas" />
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Painel",
  props: ["estado"],
  data() {
    return {
      quantidade: 5,
      questionarios: {},
      paginas: {
        total: 1, // -1 faz o texto de adicionar questionário ser ativado
        atual: 1 //Começa no 1
      }
    };
  },
  methods: {
    mudarPagina() {
      this.carregarQuestionarios();
    },
    carregarQuestionarios() {
      console.log(this);
      if (this) return true;
      this.questionarios = {};
      this.$http
        .get("api/questionarios.php", {
          params: {
            id: this.$root.estado.sessao.id,
            chave: this.$root.estado.sessao.chave,
            offset: this.paginas.atual
          }
        })
        .then(response => {
          if (!response.data.resultado) {
            this.$snotify.error(
              `Não foi possível carregar os questionários! Motivo: ${response.data.mensagem}`
            );
            return false;
          }
          this.questionarios = response.data.resposta;
        })
        .catch(reason => {
          this.$snotify.error(
            `Não foi possível se conectar com o servidor: ${reason}`
          );
        });
    }
  },
  mounted() {
    if (this.$root.estado.sessao.id == 0) {
      this.$router.push("/");
    }
    this.$nextTick(() => {
      this.questionarios = {
        "478as": {
          nome: "Questionário 0",
          codigo: "478as",
          pergunta: "Olá?",
          midia: "",
          respostas: {
            1: { texto: "Sim", contagem: 70 },
            2: { texto: "Não", contagem: 30 },
            3: { texto: "Talvez", contagem: 15 }
          },
          votosOcultos: false,
          quantidadeRespostas: 115,
          validade: "22/05/2020",
          criacao: "19/05/2020 09:35"
        },
        as58244: {
          nome: "Questionário 1",
          codigo: "as58244",
          pergunta: "Olá?",
          midia: "",
          respostas: {
            1: { texto: "Sim", contagem: 70 },
            2: { texto: "Não", contagem: 30 },
            3: { texto: "Talvez", contagem: 15 }
          },
          votosOcultos: false,
          quantidadeRespostas: 115,
          validade: "22/05/2020",
          criacao: "19/05/2020 09:35"
        },
        sgsd4f87: {
          nome: "Questionário 2",
          codigo: "sgsd4f87",
          pergunta: "Olá?",
          midia: "",
          respostas: {
            1: { texto: "Sim", contagem: 70 },
            2: { texto: "Não", contagem: 30 },
            3: { texto: "Talvez", contagem: 15 }
          },
          votosOcultos: false,
          quantidadeRespostas: 115,
          validade: "22/05/2020",
          criacao: "19/05/2020 09:35"
        }
      };
      this.carregarQuestionarios();
    });
    this.$watch(
      "paginas",
      function() {
        this.mudarPagina();
      },
      { deep: true }
    );
  }
});
</script>
