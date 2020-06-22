<template>
  <div class="wrapper" v-if="tamanho(questionarios) > 0">
    <paginacao :paginas="paginas" v-if="paginas.total > 1" />
    <div
      class="card flex-center"
      v-for="(questionario, index) in questionarios"
      :key="index"
    >
      <h2>{{ questionario.nome }}</h2>
      <small>Votos: {{ questionario.votosTotal }}</small>
      <br />
      <small>Código: {{ questionario.codigo }}</small>
      <br />
      <div class="wrapper" v-if="questionario.validade !== '31/12/1969'">
        <small>Prazo de Vencimento: {{ questionario.validade }}</small>
      </div>
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
          <li @click="alterarPrazo(questionario.codigo)">
            <icon icon="calendar-plus" />
            <span>Alterar Prazo</span>
          </li>
          <li @click="fecharPrazo(questionario.codigo)">
            <icon icon="calendar-times" />
            <span>Fechar Prazo</span>
          </li>
          <li @click="deletar(index, questionario.codigo)">
            <icon icon="trash-alt" />
            <span>Deletar</span>
          </li>
        </ul>
      </div>
      <qr
        :text="`www.okituke.com.br/mensurius/${questionario.codigo}`"
        :size="150"
        class="qr"
        @click="baixarQr(index, questionario.nome)"
        :ref="index"
      />
      <div class="wrapper mb-2 mt-2">
        <button
          @click="copiarLink(index, questionario.codigo)"
          :ref="`cl-${index}`"
        >
          Copiar Link
        </button>
        <button @click="baixarQr(index, questionario.nome)">Baixar QR</button>
      </div>
      <div v-if="questionario.midia.length > 0" class="wrapper">
        <img :src="questionario.midia" class="midia" />
      </div>
      <h3>{{ questionario.pergunta }}</h3>
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
    </div>
  </div>
  <div class="carregamento" v-else-if="paginas.total >= 0">
    <icon icon="circle-notch" spin size="6x" />
  </div>
  <span v-else-if="paginas.total == -1">
    Você ainda não tem um questionário. Que tal
    <router-link tag="button" to="/painel/criar">criar um?</router-link>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { SnotifyToast } from "vue-snotify";
import size from "lodash/size";
import Paginacao from "@/components/painel/Paginacao.vue";
import { AxiosResponse, AxiosError } from "axios";

export default Vue.extend({
  props: ["questionarios", "paginas", "estado"],
  data() {
    return {
      dataQr: []
    };
  },
  methods: {
    tamanho(objeto = {} || []) {
      return size(objeto);
    },
    baixarQr(index: string, nome: string) {
      const el = (this.$refs[index] as any)[0].$el as HTMLImageElement;
      const data = el.src as string;
      const download = document.createElement("a");
      el.appendChild(download);
      download.style.display = "none";
      download.href = data;
      download.download = `QR_${nome}`;
      download.click();
      download.remove();
    },
    copiarLink(index: string, codigo: string) {
      const container = (this.$refs[`cl-${index}`] as any)[0] as HTMLElement;
      if (this.$copyText(`www.okituke.com.br/mensurius/${codigo}`, container)) {
        this.$snotify.success("COPIADO COM SUCESSO!");
      } else {
        this.$snotify.error(
          "O NAVEGADOR BLOQUEOU A TENTATIVA DE COPIAR. TENTE POR QR."
        );
      }
    },
    deletar(index: string, codigo: string) {
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
                  const formData = new FormData();
                  formData.append("id", this.estado.sessao.id);
                  formData.append("chave", this.estado.sessao.chave);
                  formData.append("codigo", codigo);

                  this.$http({
                    method: "POST",
                    url: "/mensurius/api/deletar.questionario.php",
                    data: formData
                  })
                    .then((response: AxiosResponse) => {
                      if (response.data.resultado) {
                        this.$delete(this.questionarios, index);
                        this.$snotify.remove(toast.id as string);
                        this.$snotify.success("DELETADO COM SUCESSO!");
                        this.$root.$emit("recarregar");
                      } else {
                        this.$snotify.error(response.data.mensagem);
                      }
                    })
                    .catch((reason: AxiosError) => {
                      this.$snotify.error(
                        `HOUVE UM ERRO AO DELETAR: ${reason}`
                      );
                    });
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
    },
    fecharPrazo(codigo: string) {
      this.$snotify.prompt(
        "FECHAR PRAZO",
        'VOCÊ TEM CERTEZA QUE DESEJA FECHAR O PRAZO? NINGUÉM MAIS SERÁ CAPAZ DE VOTAR NESTE QUESTIONÁRIO. DIGITE "SIM" NA CAIXA ABAIXO E CLIQUE EM CONFIRMAR CASO DESEJE.',
        {
          buttons: [
            {
              text: "CONFIRMAR",
              action: (toast: SnotifyToast) => {
                const resposta = toast.value;
                if (resposta.toLowerCase() === "sim") {
                  const formData = new FormData();
                  formData.append("id", this.estado.sessao.id);
                  formData.append("chave", this.estado.sessao.chave);
                  formData.append("codigo", codigo);

                  this.$http({
                    method: "POST",
                    url: "/mensurius/api/fechar_prazo.questionario.php",
                    data: formData
                  })
                    .then((response: AxiosResponse) => {
                      if (response.data.resultado) {
                        this.$snotify.remove(toast.id as string);
                        this.$snotify.success("FECHADO COM SUCESSO!");
                        this.$root.$emit("recarregar");
                      } else {
                        this.$snotify.error(response.data.mensagem);
                      }
                    })
                    .catch((reason: AxiosError) => {
                      this.$snotify.error(`HOUVE UM ERRO: ${reason}`);
                    });
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
    },
    alterarPrazo(codigo: string) {
      (this.$snotify.prompt(
        "DIGITE A DATA NOVA QUE DESEJA NO CALENDÁRIO OU NO FORMATO: DD/MM/AAAA. EX: 31/12/2020",
        "ALTERAR PRAZO",
        {
          buttons: [
            {
              text: "CONFIRMAR",
              action: (toast: SnotifyToast) => {
                let resposta: string | string[] = toast.value;

                if (resposta.indexOf("/") !== -1 && resposta !== "") {
                  resposta = resposta.split("/");
                  resposta = `${resposta[2]}-${resposta[1]}-${resposta[0]}`;
                }

                if (resposta !== "") {
                  const formData = new FormData();
                  formData.append("id", this.estado.sessao.id);
                  formData.append("chave", this.estado.sessao.chave);
                  formData.append("codigo", codigo);
                  formData.append("data", resposta as string);

                  this.$http({
                    method: "POST",
                    url: "/mensurius/api/alterar_prazo.questionario.php",
                    data: formData
                  })
                    .then((response: AxiosResponse) => {
                      if (response.data.resultado) {
                        this.$snotify.remove(toast.id as string);
                        this.$snotify.success("ALTERADO COM SUCESSO!");
                        this.$root.$emit("recarregar");
                      } else {
                        this.$snotify.error(response.data.mensagem);
                      }
                    })
                    .catch((reason: AxiosError) => {
                      this.$snotify.error(`HOUVE UM ERRO: ${reason}`);
                    });
                } else {
                  this.$snotify.error(
                    `A AÇÃO FOI CANCELADA. A DATA "${resposta}" ESTAVA INCORRETA`
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
          placeholder: ""
        }
      ) as any).on("mounted", (toast: SnotifyToast) => {
        (document.getElementById(
          toast.id.toString()
        ) as HTMLInputElement).type = "date";
      });
    }
  },
  components: {
    paginacao: Paginacao
  }
});
</script>
