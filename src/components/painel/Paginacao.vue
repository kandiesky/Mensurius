<template>
  <nav class="paginacao">
    <button
      type="button"
      :disabled="paginas.atual == 1"
      @click="trocar('voltar')"
    >
      <icon icon="caret-left" />
      <span>&nbsp;Anterior</span>
    </button>
    <button type="button" @click="trocar('pular')">{{ paginas.atual }}</button>
    <button
      type="button"
      :disabled="paginas.atual == paginas.total"
      @click="trocar('ir')"
    >
      <span>Próxima&nbsp;</span>
      <icon icon="caret-left" rotation="180" />
    </button>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { SnotifyToast } from "vue-snotify";

export default Vue.extend({
  props: ["paginas"],
  methods: {
    trocar(direcao: string) {
      if (direcao == "ir") {
        this.paginas.atual++;
      } else if (direcao == "voltar") {
        this.paginas.atual--;
      } else {
        if (this.paginas.total == 1) {
          return false;
        }
        this.$snotify.prompt(
          "Insira o número da página que deseja ir",
          "PULAR PÁGINA",
          {
            buttons: [
              {
                text: "Confirmar",
                action: (toast: SnotifyToast) => {
                  const numeroPagina = parseInt(toast.value);
                  if (numeroPagina > 0 && numeroPagina <= this.paginas.total) {
                    this.paginas.atual = numeroPagina;
                    this.$snotify.remove(toast.id as string);
                  } else {
                    this.$snotify.error("Página inválida!");
                  }
                },
                bold: true
              },
              {
                text: "Cancelar",
                action: (toast: SnotifyToast) => {
                  this.$snotify.remove(toast.id as string);
                }
              }
            ],
            placeholder: `Digite um valor entre 1 e ${this.paginas.total}`
          }
        );
      }
      this.$root.$emit("recarregar");
    }
  }
});
</script>
