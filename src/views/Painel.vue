<template>
  <transition-group tag="div" class="container" name="zoomRight">
    <router-view
      :questionarios="questionarios"
      :paginas="paginas"
      :key="this.$route.path"
    />
  </transition-group>
</template>
<script lang="ts">
import Vue from "vue";
import { AxiosError, AxiosResponse } from "axios";

export default Vue.extend({
  name: "Painel",
  props: ["estado"],
  data() {
    return {
      quantidade: 6,
      questionarios: {},
      paginas: {
        total: 1, // -1 faz o texto de adicionar questionário ser ativado
        atual: 1 //Começa no 1
      }
    };
  },
  methods: {
    carregarQuestionarios() {
      this.questionarios = {};
      this.$http
        .get("api/questionarios.php", {
          params: {
            id: this.estado.sessao.id,
            chave: this.estado.sessao.chave,
            offset: this.paginas.atual
          }
        })
        .then((response: AxiosResponse) => {
          if (!response.data.resultado) {
            this.$snotify.error(
              `Não foi possível carregar os questionários! Motivo: ${response.data.mensagem}`
            );
            return false;
          }
          this.questionarios = response.data.resposta;
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(
            `Não foi possível se conectar com o servidor: ${reason}`
          );
        });
    }
  },
  mounted() {
    this.$on("recarregar", () => {
      this.carregarQuestionarios();
    });
    if (this.estado.sessao.id == 0) {
      this.$router.push("/");
    }
    this.$nextTick(() => {
      this.questionarios = {
        "478as": {
          nome: "Questionário 0",
          codigo: "478as",
          pergunta: "Olá?",
          midia: "",
          respostas: [
            { texto: "Sim", contagem: 70 },
            { texto: "Não", contagem: 30 },
            { texto: "Talvez", contagem: 15 }
          ],
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
      //this.carregarQuestionarios();
    });
    this.$watch(
      "paginas",
      function() {
        this.$emit("recarregar");
      },
      { deep: true }
    );
  }
});
</script>
