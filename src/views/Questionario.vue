<template>
  <div class="wrapper">
    <form
      v-if="carregado"
      class="card card-lg card-form flex-center-fix"
      @submit.prevent="votar()"
    >
      <div v-if="questionario.midia.length > 0">
        <img :src="questionario.midia" class="midia" />
      </div>
      <h1>{{ questionario.pergunta }}</h1>
      <small>Validade: {{ questionario.validade }}</small>

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
      <a
        v-if="this.votado && questionario.link.length > 0"
        :href="questionario.link"
        target="_top"
        class="btn btn-lg mt-2"
        >ACESSE MAIS</a
      >
      <button
        v-else
        :disabled="this.selecionado == -1"
        type="submit"
        class="btn-lg mt-2"
      >
        SALVAR RESPOSTA
      </button>
    </form>
    <div class="carregamento" v-else>
      <icon icon="circle-notch" spin size="6x" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse, AxiosError } from "axios";
export default Vue.extend({
  props: ["estado"],
  data() {
    return {
      selecionado: -1,
      votado: false,
      carregado: false,
      questionario: {} as any
    };
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/mensurius/api/carregar.questionario.php",
      params: {
        qid: this.$route.query.qid
      }
    })
      .then((response: AxiosResponse) => {
        if (response.data.resultado) {
          this.questionario = response.data.resposta;
          if (localStorage.getItem(this.questionario.codigo) == "true") {
            this.$snotify.info(
              "VOCÊ JÁ VOTOU NESTE QUESTIONÁRIO! VOLTE PARA A TELA INICIAL CASO QUEIRA VOTAR EM OUTRO."
            );
            //this.$router.push("/");
            return;
          }
          this.carregado = true;
          this.$snotify.success("QUESTIONÁRIO CARREGADO COM SUCESSO!");
        } else {
          this.$snotify.error(response.data.mensagem);
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.$snotify.error("NÃO FOI POSSÍVEL SE CONECTAR AO SERVIDOR.");
        this.$router.push("/");
      });
  },
  methods: {
    votar: function() {
      if (this.selecionado < 0 && this.selecionado > 10) {
        this.$snotify.warning("NENHUM VALOR FOI SELECIONADO!", "AVISO");
        return;
      }

      if (localStorage.getItem(this.questionario.codigo) == "true") {
        this.$snotify.info("VOCÊ JÁ VOTOU NESTE QUESTIONÁRIO!");
        this.$router.push("/");
        return;
      }

      const formData = new FormData();
      formData.append("voto", `${this.selecionado}`);
      formData.append("qid", this.questionario.codigo);
      formData.append("relacionado", this.estado.sessao.relacionado);
      formData.append("votante", this.estado.sessao.nome);

      this.$http({
        method: "POST",
        url: "/mensurius/api/votar.php",
        data: formData
      })
        .then((response: AxiosResponse) => {
          if (response.data.resultado) {
            this.$snotify.success(response.data.mensagem);
            localStorage.setItem(this.questionario.codigo as string, "true");
            this.votado = true;
            if (this.questionario.link.length == 0) {
              setTimeout(() => {
                this.$router.push("/");
              }, 1200);
            }
          } else {
            this.$snotify.error(response.data.mensagem);
          }
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(`HOUVE UM ERRO ${reason}...`);
        });
    }
  }
});
</script>
