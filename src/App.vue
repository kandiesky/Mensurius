<template>
  <main id="app" :class="[estado.tema === 0 ? 'tema-claro' : 'tema-escuro']">
    <div id="carregamento" v-show="estado.carregamento">
      <img src="../assets/loading.svg" alt="Carregando..." />
    </div>
    <div id="nav">
      <router-link to="/">Login</router-link>
      <router-link to="/painel">Dashboard</router-link>
      <router-link to="/questionario?id=47a">Questionário 47a</router-link>
      <router-link to="/editar?id=47a">Editar Questionario</router-link>
    </div>
    <router-view :estado="estado" />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["estado"]
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap");
:root {
  --base: #fca311;
  --azul: #14213d;
}
.tema-claro {
  --background: #e7e7e7;
  --texto: #313131;
}
.tema-escuro {
  --background: #313131;
  --texto: #e7e7e7;
}
html,
body {
  margin: 0;
  padding: 0;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
  }
}
#carregamento {
  background: var(--background);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80px;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Roboto", sans-serif;
}
</style>
