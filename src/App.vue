<template>
  <v-app>
    <AppBar />
    <NavigationDrawer />
    <Main />
  </v-app>
</template>

<script>
import Main from "@/views/Main.vue";
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

export default {
  components: { NavigationDrawer, AppBar, Main },
  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>
