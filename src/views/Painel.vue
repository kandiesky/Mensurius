<template>
  <div class="container">
    <questionarios
      :questionarios="questionarios"
      :estadoModais="estadoModais"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Questionarios from "@/components/painel/Questionarios.vue";

export default Vue.extend({
  name: "Painel",
  props: ["estado"],
  data() {
    return {
      quantidade: 5,
      questionarios: {},
      estadoModais: {
        editar: { aberto: false, editando: 0 },
        informacoes: { aberto: false, exibindo: 0 }
      }
    };
  },
  components: {
    questionarios: Questionarios
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      this.questionarios = {
        "478as": {
          nome: "Questionário 0",
          codigo: "478as",
          pergunta: "Olá?",
          midiaPergunta: "",
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
          midiaPergunta: "",
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
          midiaPergunta: "",
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
      /* this.$http
        .get("api/questionarios.php", {
          params: {
            id: this.$root.estado.sessao.id,
            chave: this.$root.estado.sessao.chave,
            quantidade: this.quantidade
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
        }); */
    });
  }
});
</script>
