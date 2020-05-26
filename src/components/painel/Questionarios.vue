<template>
  <div class="wrapper" v-if="tamanho(questionarios) > 0">
    <div
      class="card flex-center"
      v-for="(questionario, index) in questionarios"
      :key="index"
    >
      <h2>{{ questionario.nome }}</h2>
      <small>Votos: {{ questionario.quantidadeRespostas }}</small>
      <small>Prazo de Vencimento: {{ questionario.validade }}</small>
      <div :id="`menu-${questionario.codigo}`">
        <button class="dropdown-menu">
          <icon icon="ellipsis-v" />
        </button>
        <ul class="dropdown">
          <li>
            <icon icon="info-circle" />
            <span>Informações</span>
          </li>
          <li>
            <icon icon="calendar-check" />
            <span>Fechar Prazo</span>
          </li>
          <li @click="deletar(questionario.codigo)">
            <icon icon="trash-alt" />
            <span>Deletar</span>
          </li>
        </ul>
      </div>
      <qr :text="questionario.codigo" :size="150" />
      <h3>{{ questionario.pergunta }}</h3>
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
    </div>
  </div>
  <div class="carregamento" v-else-if="paginas.total >= 0">
    <icon icon="circle-notch" spin size="6x" />
  </div>
  <span v-else-if="paginas.total == -1"
    >Você ainda não tem um questionário. Que tal
    <button type="button">criar um?</button></span
  >
</template>

<script lang="ts">
import Vue from "vue";
import size from "lodash/size";

export default Vue.extend({
  props: ["questionarios", "estadoModais", "paginas"],
  methods: {
    tamanho(objeto = {} || []) {
      return size(objeto);
    },
    deletar(index: string) {
      this.$delete(this.questionarios, index);
    }
  }
});
</script>
