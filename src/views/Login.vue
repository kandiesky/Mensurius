<template>
  <div id="container-login" class="container">
    <div class="wrapper flex flex-center flex-column">
      <transition name="zoomRight">
        <router-view :estado="estado" :key="this.$route.name" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  name: "Login",
  props: ["estado"],
  mounted() {
    this.$http
      .get("/mensurius/api/estado.sessao.php")
      .then((response: AxiosResponse) => {
        if (response.data.resultado && this.$route.path != "/questionario") {
          this.estado.sessao = response.data.resposta.sessao;
          this.$snotify.info(
            "VOCÊ JÁ ESTÁ LOGADO E FOI REDIRECIONADO PARA O PAINEL"
          );
          this.$router.push("/painel");
        }
      });
  }
});
</script>
