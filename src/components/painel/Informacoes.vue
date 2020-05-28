<template>
  <div class="wrapper" v-if="tamanho(questionario) > 0">
    <div class="card card-lg flex-center">
      <button type="button" class="arrow-menu" @click="voltar()">
        <icon icon="arrow-alt-circle-left" size="2x" />
      </button>
      <h3>
        {{ questionario.nome }}
        <br />
        Quantidade Total de Votos: {{ questionario.quantidadeRespostas }}
        <br />
        Prazo de Vencimento: {{ questionario.validade }}
        <br />
        Código: {{ questionario.codigo }}
        <br />
        Pergunta: {{ questionario.pergunta }}
      </h3>
      <div v-if="questionario.midia.length > 0" class="wrapper">
        <img :src="questionario.midia.length" class="midia" />
      </div>
      <div class="flex container container-questionario">
        <div
          class="flex flex-column flex-center votos-questionario"
          v-for="(resposta, index) in questionario.respostas"
          :key="index"
        >
          <span>
            {{ resposta.resposta }}
            <br />
            {{
              ((resposta.contagem / questionario.quantidadeRespostas) * 100)
                .toString()
                .slice(0, 5)
            }}%
          </span>
          <div class="progresso">
            <div
              class="preenchimento-progresso"
              :style="{
                height:
                  ((resposta.contagem / questionario.quantidadeRespostas) *
                    100) /
                    2 +
                  'px'
              }"
            />
          </div>
          <span>{{ resposta.contagem }}</span>
        </div>
      </div>
      <div class="flex flex-column">
        <h3>VOTOS RECENTES</h3>
        <table>
          <tr>
            <th>VOTO</th>
            <th>DATA</th>
          </tr>
          <tr v-for="(voto, index) in votos" :key="index + voto.data">
            <td>{{ voto.voto }}</td>
            <td>{{ voto.data }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="carregamento" v-else>
    <icon icon="circle-notch" spin size="6x" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import size from "lodash/size";

export default Vue.extend({
  props: ["questionarios", "paginas"],
  mounted() {
    console.log(this.$route.query.qid);
  },
  methods: {
    tamanho(obj: {} | []) {
      return size(obj);
    },
    voltar() {
      this.$router.go(-1);
    }
  },
  computed: {
    questionario: function() {
      return this.questionarios[this.$route.query.qid as string];
    },
    votos: function() {
      return [
        { voto: "1", data: "21/02/2020" },
        { voto: "2", data: "22/02/2020" },
        { voto: "1", data: "25/02/2020" }
      ];
    }
  }
});
</script>
