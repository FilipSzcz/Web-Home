<template>
  <div id="app">
    <!-- <app-main /> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    if (localStorage.isUserLoggedIn) {
      this.$store.state.isUserLoggedIn = true;
      this.$store.state.userId = localStorage.userId;
    }
  }
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
