<template>
  <div class="wrapper" v-if="tamanho(questionarios) > 0">
    <div
      class="card flex-center"
      v-for="(questionario, index) in questionarios"
      :key="index"
      @click="switchMenu(questionario.codigo, false)"
    >
      <h2>{{ questionario.nome }}</h2>
      <small>Votos: {{ questionario.quantidadeRespostas }}</small>
      <small>Prazo de Vencimento: {{ questionario.validade }}</small>
      <div :id="`menu-${questionario.codigo}`">
        <icon
          icon="ellipsis-v"
          class="dropdown-menu"
          @click.stop="switchMenu(questionario.codigo, true)"
        />
        <ul
          :class="[
            'dropdown',
            { 'dropdown-aberto': menuAberto[questionario.codigo] }
          ]"
          :ref="`dropdown`"
          :key="menuAberto[questionario.codigo]"
        >
          <li @click="editar(questionario.codigo)">
            <icon icon="edit" />
            <span>Editar</span>
          </li>
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
  <div class="carregamento" v-else>
    <icon icon="circle-notch" spin size="6x" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import size from "lodash/size";

export default Vue.extend({
  props: ["questionarios", "estadoModais"],
  methods: {
    switchMenu(index: string) {
      this.menuAberto[index] = this.menuAberto[index] ? false : true;
    },
    tamanho(objeto = {} || []) {
      return size(objeto);
    },
    editar(index: string) {
      console.log(index);
    },
    deletar(index: string) {
      this.$delete(this.questionarios, index);
    }
  },
  data() {
    return {
      menuAberto: {} //Será preenchido conforme a entrada de novos itens
    };
  }
});
</script>
