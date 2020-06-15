<template>
  <div class="wrapper" v-if="carregado">
    <div class="card card-lg flex-center">
      <button type="button" class="arrow-menu" @click="voltar()">
        <icon icon="arrow-alt-circle-left" size="2x" />
      </button>
      <h3>
        {{ questionario.nome }}
        <br />
        Quantidade Total de Votos: {{ questionario.votosTotal }}
        <br />
        Prazo de Vencimento: {{ questionario.validade }}
        <br />
        Código: {{ questionario.codigo }}
        <br />
        Pergunta: {{ questionario.pergunta }}
        <br />
        Link: {{ questionario.link }}
        <br />
        Agradecimento: {{ questionario.agradecimento }}
      </h3>
      <div v-if="questionario.midia.length > 0" class="wrapper">
        <img :src="questionario.midia" class="midia" />
      </div>
      <div class="flex container container-questionario">
        <div
          class="flex flex-column flex-center votos-questionario"
          v-for="(resposta, index) in questionario.respostas"
          :key="index"
        >
          <span>
            {{ resposta.texto }}
            <br />
            {{
              resposta.contagem != 0
                ? ((resposta.contagem / questionario.votosTotal) * 100)
                    .toString()
                    .slice(0, 5)
                : "0"
            }}%
          </span>
          <div class="progresso">
            <div
              class="preenchimento-progresso"
              :style="{
                height:
                  ((resposta.contagem / questionario.votosTotal) * 100) / 2 +
                  'px'
              }"
            />
          </div>
          <span>{{ resposta.contagem }}</span>
        </div>
      </div>
      <chart
        :data="{
          labels: labels,
          datasets: [
            {
              label: 'Número de Votos Relacionados',
              data: dataset,
              backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(0, 51, 102, 0.9)',
                'rgba(0, 102, 102, 0.9)',
                'rgba(0, 0, 255, 0.9)',
                'rgba(102, 102, 153, 0.9)',
                'rgba(102, 0, 204, 0.9)',
                'rgba(153, 0, 255, 0.9)',
                'rgba(204, 0, 204, 0.9)',
                'rgba(255, 102, 0, 0.9)',
                'rgba(255, 159, 64, 0.9)',
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(0, 51, 102, 0.9)',
                'rgba(102, 102, 153, 0.9)',
                'rgba(102, 0, 204, 0.9)',
                'rgba(153, 0, 255, 0.9)',
                'rgba(204, 0, 204, 0.9)',
                'rgba(255, 102, 0, 0.9)'
              ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
              ],
              borderWidth: 2
            }
          ]
        }"
        :options="{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }"
      />
    </div>
  </div>
  <div class="carregamento" v-else>
    <icon icon="circle-notch" spin size="6x" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  props: ["questionarios", "paginas", "estado"],
  methods: {
    voltar() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      questionario: {},
      labels: [],
      dataset: [],
      carregado: false
    };
  },
  components: {
    chart: () => import("@/components/painel/externos/Chart.vue")
  },
  mounted() {
    if (!this.$route.query.qid || this.$route.query.qid.length == 0) {
      this.$router.push("/painel");
    }

    this.$http({
      method: "GET",
      url: "/mensurius/api/informacoes.questionario.php",
      params: {
        qid: this.$route.query.qid,
        id: this.estado.sessao.id,
        chave: this.estado.sessao.chave
      }
    }).then((response: AxiosResponse) => {
      if (response.data.resultado) {
        this.dataset = response.data.resposta.dataset;
        this.labels = response.data.resposta.labels;
        this.questionario = response.data.resposta.questionario;
        this.carregado = true;
      } else {
        this.$snotify.error(response.data.mensagem);
      }
    });
  }
});
</script>
