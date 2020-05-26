<template>
  <div class="container">
    <paginacao :paginas="paginas" v-if="paginas.total > 1" />
    <questionarios
      :questionarios="questionarios"
      :estadoModais="estadoModais"
      :paginas="paginas"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Questionarios from "@/components/painel/Questionarios.vue";
import Paginacao from "@/components/painel/Paginacao.vue";

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
      },
      paginas: {
        total: 3, // -1 faz o texto de adicionar questionário ser ativado
        atual: 1 //Começa no 1
      }
    };
  },
  components: {
    questionarios: Questionarios,
    paginacao: Paginacao
  },
  methods: {
    mudarPagina() {
      this.questionarios = {};
      /* this.$http
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
        }); */
    }
  },
  mounted() {
    /* if(this.$root.estado.sessao.id == 0){
      this.$router.push("/");
    } */
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
            offset: 1
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
