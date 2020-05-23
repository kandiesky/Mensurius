<template>
  <div id="container-login" class="container">
    <div class="wrapper flex flex-center flex-column">
      <login v-if="form == 'login'" />
      <codigo v-else />
      <button class="btn" @click="mudar()">
        Mudar para: {{ form == "login" ? "Código" : "Login" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import loginForm from "@/components/login/Login.vue";
import codigoForm from "@/components/login/Codigo.vue";

export default Vue.extend({
  name: "Login",
  props: ["estado"],
  components: {
    login: loginForm,
    codigo: codigoForm
  },
  data() {
    return {
      form: "login" as string
    };
  },
  methods: {
    mudar() {
      this.form = this.form == "login" ? "codigo" : "login";
    }
  }
});
</script>
