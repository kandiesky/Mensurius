<template>
  <div class="wrapper" v-if="tamanho(questionarios) > 0">
    <paginacao :paginas="paginas" v-if="paginas.total > 1" />
    <div
      class="card flex-center"
      v-for="(questionario, index) in questionarios"
      :key="index"
    >
      <h2>{{ questionario.nome }}</h2>
      <small>Votos: {{ questionario.quantidadeRespostas }}</small>
      <br />
      <small>Prazo de Vencimento: {{ questionario.validade }}</small>
      <div :id="`menu-${questionario.codigo}`">
        <button class="dropdown-menu">
          <icon icon="ellipsis-v" />
        </button>
        <ul class="dropdown">
          <router-link
            tag="li"
            :to="{
              path: 'painel/informacoes',
              query: { qid: questionario.codigo }
            }"
          >
            <icon icon="info-circle" />
            <span>Informações</span>
          </router-link>
          <!-- <li>
            <icon icon="calendar-check" />
            <span>Fechar Prazo</span>
          </li>-->
          <li @click="deletar(questionario.codigo)">
            <icon icon="trash-alt" />
            <span>Deletar</span>
          </li>
        </ul>
      </div>
      <qr
        :text="questionario.codigo"
        :size="150"
        class="qr"
        @click="baixarQr(index)"
        :ref="index"
      />
      <div class="wrapper">
        <button @click="copiarLink(index)" :ref="`cl-${index}`">
          Copiar Link
        </button>
        <button @click="baixarQr(index)">Baixar QR</button>
      </div>
      <div v-if="questionario.midia.length > 0" class="wrapper">
        <img :src="questionario.midia.length" class="midia" />
      </div>
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
  <span v-else-if="paginas.total == -1">
    Você ainda não tem um questionário. Que tal
    <button type="button">criar um?</button>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { SnotifyToast } from "vue-snotify";
import size from "lodash/size";
import Paginacao from "@/components/painel/Paginacao.vue";

export default Vue.extend({
  props: ["questionarios", "paginas"],
  data() {
    return {
      dataQr: []
    };
  },
  methods: {
    tamanho(objeto = {} || []) {
      return size(objeto);
    },
    baixarQr(index: string) {
      const el = (this.$refs[index] as any)[0].$el as HTMLImageElement;
      const data = el.src as string;
      const download = document.createElement("a");
      el.appendChild(download);
      download.style.display = "none";
      download.href = data;
      download.download = `QR_${index}`;
      download.click();
      download.remove();
    },
    copiarLink(index: string) {
      const container = (this.$refs[`cl-${index}`] as any)[0] as HTMLElement;
      if (this.$copyText(`www.okituke.com.br/mensurius/${index}`, container)) {
        this.$snotify.success("COPIADO COM SUCESSO!");
      } else {
        this.$snotify.error(
          "O NAVEGADOR BLOQUEOU A TENTATIVA DE COPIAR. TENTE POR QR."
        );
      }
    },
    deletar(index: string) {
      this.$snotify.prompt(
        "DELETAR QUESTIONÁRIO",
        'VOCÊ TEM CERTEZA QUE DESEJA DELETAR ESTE QUESTIONÁRIO? ESTE PROCESSO NÃO TEM VOLTA. DIGITE "SIM" NA CAIXA ABAIXO E CLIQUE EM CONFIRMAR CASO DESEJE.',
        {
          buttons: [
            {
              text: "CONFIRMAR",
              action: (toast: SnotifyToast) => {
                const resposta = toast.value;
                if (resposta.toLowerCase() === "sim") {
                  this.$delete(this.questionarios, index);
                  this.$snotify.remove(toast.id as string);
                  this.$snotify.success("DELETADO COM SUCESSO!");
                  this.$root.$emit("recarregar");
                } else {
                  this.$snotify.error(
                    `A AÇÃO FOI CANCELADA. A RESPOSTA "${resposta}" ESTAVA INCORRETA`
                  );
                  this.$snotify.remove(toast.id as string);
                }
              },
              bold: true
            },
            {
              text: "CANCELAR",
              action: (toast: SnotifyToast) => {
                this.$snotify.remove(toast.id as string);
              }
            }
          ],
          placeholder: 'DIGITE "SIM" E CONFIRME PARA PROSSEGUIR'
        }
      );
    }
  },
  components: {
    paginacao: Paginacao
  }
});
</script>
