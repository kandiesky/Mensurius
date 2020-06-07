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

export default Vue.extend({
  name: "Login",
  props: ["estado"]
});
</script>
