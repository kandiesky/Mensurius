<template>
  <div id="container-login" class="container">
    <div class="wrapper flex flex-center flex-column">
      <router-view :estado="estado" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  props: ["estado"],
  mounted() {
    if (this.estado.sessao.id) {
      this.$router.push("/painel");
    }
  }
});
</script>
