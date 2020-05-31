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
          <tr
            v-for="(voto, index) in questionario.votos"
            :key="index + voto.data"
          >
            <td>{{ voto.voto }}</td>
            <td>{{ voto.data }}</td>
          </tr>
        </table>
      </div>
      <chart
        :data="{
          labels: questionario.grafico.labels,
          datasets: [
            {
              label: 'Número de Votos Relacionados',
              data: questionario.grafico.dataset,
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
                'rgba(255, 159, 64, 0.9)'
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
                'rgba(255, 255, 255, 1)'
              ],
              borderWidth: 1
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
import size from "lodash/size";

export default Vue.extend({
  props: ["questionarios", "paginas"],
  methods: {
    tamanho(obj: {} | []) {
      return size(obj);
    },
    voltar() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      questionario: this.questionarios[this.$route.query.qid as string]
    };
  },
  components: {
    chart: () => import("@/components/painel/externos/Chart.vue")
  }
});
</script>
