<template>
  <transition-group tag="div" class="container" name="zoomRight">
    <router-view
      :questionarios="questionarios"
      :paginas="paginas"
      :estado="estado"
      :key="this.$route.path"
    />
  </transition-group>
</template>
<script lang="ts">
let timeout = setTimeout(function() {
  return;
}, 1000);
import Vue from "vue";
import { AxiosError, AxiosResponse } from "axios";

export default Vue.extend({
  name: "Painel",
  props: ["estado"],
  data() {
    return {
      carregado: false,
      questionarios: {},
      paginas: {
        total: 1, // -1 faz o texto de adicionar questionário ser ativado
        atual: 1 //Começa no 1
      }
    };
  },
  methods: {
    autoUpdate() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (this.estado.sessao.id) {
          this.carregarQuestionarios();
          this.autoUpdate();
        }
      }, 120000);
    },
    carregarQuestionarios() {
      this.questionarios = {};
      this.$http({
        method: "GET",
        url: "/mensurius/api/carregar.questionarios.php",
        params: {
          id: this.estado.sessao.id,
          chave: this.estado.sessao.chave,
          offset: this.paginas.atual
        }
      })
        .then((response: AxiosResponse) => {
          if (!response.data.resultado) {
            this.$snotify.error(response.data.mensagem);
            return;
          }

          console.log(
            "%cUPDATE.",
            "padding: 5px;background:orange;color:white;"
          );

          this.questionarios = response.data.resposta.questionarios;
          this.paginas = response.data.resposta.paginas;
          this.carregado = true;
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(
            `NÃO FOI POSSÍVEL SE CONECTAR AO SERVIDOR: ${reason}`
          );
        });
    }
  },
  mounted() {
    if (this.estado.sessao.id == 0) {
      this.$router.push("/login");
    }
    this.carregarQuestionarios();
    this.$root.$on("recarregar", () => {
      this.carregarQuestionarios();
    });
    this.autoUpdate();
  },
  beforeDestroy() {
    clearTimeout(timeout);
  }
});
</script>
