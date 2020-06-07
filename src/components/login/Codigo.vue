<template>
  <keep-alive>
    <form @submit.prevent="checarCodigo()" class="card card-form">
      <div class="card-form-group">
        <input type="text" v-model="codigo" id="codigo" />
        <label for="codigo" :class="[codigo.length > 0 ? 'preenchido' : '']"
          >CÓDIGO DO QUESTIONÁRIO</label
        >
      </div>
      <button type="submit">RESPONDER</button>
      <router-link tag="button" :to="{ path: 'login' }" class="mt-2"
        >ACESSAR CONTA</router-link
      >
    </form>
  </keep-alive>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  props: ["estado"],
  methods: {
    checarCodigo() {
      if (!this.codigo) {
        this.$snotify.warning("NENHUM CÓDIGO FOI DIGITADO!");
        return;
      }
      if (localStorage.getItem(this.codigo) == "true") {
        this.$snotify.error("VOCÊ JÁ VOTOU NESTE QUESTIONÁRIO!");
        return;
      }

      this.$http({
        method: "GET",
        url: "/mensurius/api/checar.questionario.php",
        params: {
          qid: this.codigo
        }
      })
        .then((response: AxiosResponse) => {
          if (response.data.resultado != true) {
            this.$snotify.warning(
              `O CÓDIGO ${this.codigo} É INVÁLIDO. VERIFIQUE SE DIGITOU CORRETAMENTE.`
            );
            return;
          }

          this.$router.push({
            path: "/questionario",
            query: { qid: this.codigo }
          });
        })
        .catch(() => {
          this.$snotify.error(
            "NÃO FOI POSSÍVEL SE CONECTAR COM O SERVIDOR. TENTE NOVAMENTE MAIS TARDE."
          );
        });
    }
  },
  data() {
    return {
      codigo: ""
    };
  }
});
</script>
