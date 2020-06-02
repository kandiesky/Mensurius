<template>
  <div class="wrapper">
    <button @click="mudarGrafico('pie')">
      Gráfico de Torta {{ this.type == "pie" ? "(Ativo)" : "" }}
    </button>
    <button @click="mudarGrafico('line')">
      Gráfico Linear {{ this.type == "line" ? "(Ativo)" : "" }}
    </button>
    <button @click="mudarGrafico('bar')">
      Gráfico de Barra {{ this.type == "bar" ? "(Ativo)" : "" }}
    </button>
    <button @click="mudarGrafico('doughnut')">
      Gráfico de Doughnut {{ this.type == "doughnut" ? "(Ativo)" : "" }}
    </button>
    <button @click="mudarGrafico('polarArea')">
      Gráfico Polar {{ this.type == "polarArea" ? "(Ativo)" : "" }}
    </button>
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import chart from "chart.js";

export default Vue.extend({
  props: ["data", "options"],
  data() {
    return {
      objChart: {
        destroy() {
          console.log(chart);
        } //Só pro typescript parar de encher o saco
      },
      type: "bar",
      iniciada: false
    };
  },
  methods: {
    iniciarGrafico() {
      if (this.iniciada) {
        this.objChart.destroy();
      }
      this.objChart = new chart(this.$refs.canvas as HTMLCanvasElement, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    },
    mudarGrafico(novoTipo: string) {
      this.type = novoTipo;
      this.iniciarGrafico();
    }
  },
  mounted() {
    this.iniciarGrafico();
    this.iniciada = true;
  },
  beforeDestroy() {
    this.objChart.destroy();
  }
});
</script>
