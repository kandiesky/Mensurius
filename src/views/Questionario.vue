<template>
  <div class="wrapper">
    <form
      v-if="carregado"
      class="card card-lg card-form flex-center-fix"
      @submit.prevent="votar()"
    >
      <router-link v-show="this.votado" tag="button" class="arrow-menu" to="/">
        <icon icon="arrow-alt-circle-left" size="2x" />
      </router-link>
      <div v-if="questionario.midia.length > 0">
        <img :src="questionario.midia" class="midia" />
      </div>
      <h1 v-show="!this.votado">
        {{ questionario.pergunta }}
      </h1>
      <small>Validade: {{ questionario.validade }}</small>
      <h2 class="mt-2" v-if="!this.votado">
        {{
          this.selecionado == -1
            ? "Selecione uma resposta para continuar"
            : "Clique em salvar para finalizar!"
        }}
      </h2>
      <h2
        class="mt-2 destaque"
        v-if="this.votado && questionario.agradecimento.length > 0"
      >
        {{ questionario.agradecimento }}
      </h2>
      <div class="wrapper" v-if="this.votado">
        <a
          v-for="(link, index) in questionario.link"
          :key="index"
          :href="link.link"
          target="_top"
          class="btn btn-lg mb-2 mt-2"
          >{{ link.titulo }}</a
        >
      </div>
      <div v-show="!this.votado" class="wrapper" id="respostas">
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
      </div>
      <button
        v-if="!this.votado"
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
              "VOCÊ JÁ RESPONDEU ESTE QUESTIONÁRIO! VOLTE PARA A TELA INICIAL CASO QUEIRA RESPONDER OUTRO."
            );
            this.votado = true;
            //this.$router.push("/");
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
        this.$snotify.info("VOCÊ JÁ RESPONDEU ESTE QUESTIONÁRIO!");
        this.votado = true;
        //this.$router.push("/");
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
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
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
