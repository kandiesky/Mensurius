<template>
  <div class="wrapper">
    <form @submit.prevent="criar()" class="card card-lg card-form">
      <h3>INFORMAÇÕES</h3>
      <small>*: obrigatório</small>
      <hr />
      <div class="card-form-group">
        <input type="text" id="nome" required v-model="nome" />
        <label for="nome" :class="[nome.length > 0 ? 'preenchido' : '']"
          >NOME DO QUESTIONÁRIO*</label
        >
      </div>
      <div class="card-form-group">
        <input type="text" id="codigo" v-model="codigo" />
        <label for="codigo" :class="[codigo.length > 0 ? 'preenchido' : '']"
          >CÓDIGO DO QUESTIONÁRIO</label
        >
      </div>
      <div class="card-form-group">
        <input type="text" id="pergunta" required v-model="pergunta" />
        <label for="pergunta" :class="[pergunta.length > 0 ? 'preenchido' : '']"
          >PERGUNTA*</label
        >
      </div>
      <div class="card-form-group">
        <input type="text" id="agradecimento" v-model="agradecimento" />
        <label
          for="agradecimento"
          :class="[agradecimento.length > 0 ? 'preenchido' : '']"
          >TEXTO AGRADECIMENTO</label
        >
      </div>
      <div class="card-form-group" v-for="(link, index) in links" :key="index">
        <div class="card-form-group-dual">
          <div class="metade">
            <input
              type="text"
              v-model="link.titulo"
              :id="`link-titulo-${index}`"
            />
            <label
              :for="`link-titulo-${index}`"
              :class="[link.titulo.length > 0 ? 'preenchido' : '']"
              >Titulo {{ index + 1 }}</label
            >
          </div>
          <div class="metade">
            <input
              type="url"
              v-model="link.link"
              :id="`link-conteudo-${index}`"
            />
            <label
              :for="`link-conteudo-${index}`"
              :class="[link.link.length > 0 ? 'preenchido' : '']"
              >Link {{ index + 1 }}</label
            >
          </div>
        </div>
        <button
          title="Clique aqui para apagar este link"
          type="button"
          @click="removerLink(index)"
        >
          <icon icon="trash-alt" />
        </button>
      </div>
      <button
        type="button"
        class="btn-lg"
        @click="adicionarLink()"
        v-if="tamanho(links) < 5"
      >
        ADICIONAR LINK ({{ tamanho(links) }}/5)
      </button>
      <div class="card-form-group mt-2">
        <small
          >SELECIONE NO CALENDÁRIO OU DIGITE A DATA NO FORMATO DD/MM/AAAA. Ex:
          31/12/2020</small
        >
        <input type="date" id="vencimento" v-model="vencimento" />
        <label for="vencimento" class="preenchido">DATA DE VENCIMENTO*</label>
      </div>
      <h3>MÍDIA*</h3>
      <div class="card-form-group">
        <input
          accept=".jpg, .jpeg, .png, .webp"
          type="file"
          id="midia"
          required
          ref="midia"
          @change="preverMidia()"
        />
        <button
          title="Clique aqui para apagar a mídia"
          v-if="midia"
          type="button"
          @click="removerMidia()"
        >
          <icon icon="trash-alt" />
        </button>
      </div>
      <div v-if="midia.length > 0" class="wrapper">
        <img :src="midia" alt="Previsualização de Mídia" class="midia" />
      </div>
      <h3>RESPOSTAS*</h3>
      <div
        class="card-form-group"
        v-for="(resposta, index) in respostas"
        :key="index"
      >
        <input type="text" v-model="resposta.texto" :id="`resposta-${index}`" />
        <label
          :for="`resposta-${index}`"
          :class="[resposta.texto.length > 0 ? 'preenchido' : '']"
          >RESPOSTA {{ index + 1 }}</label
        >
        <button
          title="Clique aqui para apagar esta resposta"
          v-if="tamanho(respostas) > 2"
          type="button"
          @click="removerResposta(index)"
        >
          <icon icon="trash-alt" />
        </button>
      </div>
      <button
        type="button"
        class="btn-lg"
        @click="adicionarResposta()"
        v-if="tamanho(respostas) < 10"
      >
        ADICIONAR RESPOSTA ({{ tamanho(respostas) }}/10)
      </button>
      <div class="card-form-group"></div>
      <h3>FINALIZAR</h3>
      <button class="btn-lg" type="submit">CONFIRMAR CRIAÇÃO</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import size from "lodash/size";
import { AxiosResponse, AxiosError } from "axios";

export default Vue.extend({
  props: ["questionarios", "paginas", "estado"],
  data() {
    return {
      nome: "",
      pergunta: "",
      links: [] as any,
      agradecimento: "",
      vencimento: "" as string | string[],
      respostas: [{ texto: "" }, { texto: "" }],
      midia: "",
      codigo: ""
    };
  },
  methods: {
    tamanho(obj = {} || []) {
      return size(obj);
    },
    preverMidia() {
      if (this.midia.length == 0) {
        this.$snotify.info(
          "Dê preferência por imagens no modo paisagem (deitadas) quando está fazendo questionários para computadores e celulares!",
          "DICA",
          { timeout: 8000 }
        );
      }
      const midia = new FileReader();
      const input = this.$refs.midia as HTMLInputElement;

      //Eu odeio typescript
      if (!input.files) input.files = new FileList();

      midia.readAsDataURL(input.files[0]);
      midia.onload = () => {
        if (
          midia.result &&
          midia.result.toString().indexOf("data:image") === -1
        ) {
          this.$snotify.error("O arquivo não é uma imagem!", "ERRO", {
            timeout: 8000
          });
          return;
        }
        this.midia = midia.result as string;
      };
    },
    adicionarResposta() {
      this.respostas.push({ texto: "" });
    },
    adicionarLink() {
      this.links.push({ link: "", titulo: "" });
    },
    removerResposta(index: number) {
      this.$delete(this.respostas, index);
    },
    removerLink(index: number) {
      this.$delete(this.links, index);
    },
    removerMidia() {
      (this.$refs.midia as HTMLInputElement).value = "";
      this.midia = "";
    },
    criar() {
      if (
        this.nome == "" ||
        this.pergunta == "" ||
        (this.respostas as Array<any>).length == 0
      ) {
        this.$snotify.warning("PREENCHA TODOS OS CAMPOS CORRETAMENTE!");
        return;
      }

      if (this.vencimento.indexOf("/") !== -1 && this.vencimento !== "") {
        this.vencimento = (this.vencimento as string).split("/");
        this.vencimento = `${this.vencimento[2]}-${this.vencimento[1]}-${this.vencimento[0]}`;
      }

      const formData = new FormData();
      const inputMidia = this.$refs.midia as HTMLInputElement;

      formData.append("nome", this.nome);
      formData.append("codigo", this.codigo);
      formData.append("pergunta", this.pergunta);
      formData.append("vencimento", this.vencimento as string);
      formData.append("respostas", JSON.stringify(this.respostas));
      formData.append("links", JSON.stringify(this.links));
      formData.append("agradecimento", this.agradecimento);
      formData.append("midia", (inputMidia as any).files[0] as Blob, "midia"); //Eu odeio typescript

      this.$http({
        method: "POST",
        url: "/mensurius/api/criar.questionario.php",
        data: formData
      })
        .then((response: AxiosResponse) => {
          if (response.data.resultado) {
            this.$snotify.success(response.data.mensagem);
            this.paginas.atual = 1;
            this.$root.$emit("recarregar");
            this.$router.push("/painel");
          } else {
            this.$snotify.error(response.data.mensagem);
          }
        })
        .catch((reason: AxiosError) => {
          this.$snotify.error(`HOUVE UM ERRO AO CRIAR QUESTIONÁRIO: ${reason}`);
        });
    }
  }
});
</script>
