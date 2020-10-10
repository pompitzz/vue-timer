<template>
  <v-navigation-drawer app
                       dark
  >
    <v-col class="text-center">
      <h2 class="white--text my-3">
        TIMER
      </h2>
    </v-col>
    <hr class="ma-3 white my-hr" />
    <v-list>
      <div v-for="item in items"
           :key="item.name"
      >
        <v-list-item @click="$router.push(item.path)"
                     :class="isActive(item.path)"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">
            {{ item.name }}
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      items: [
        { name: '스톱워치', icon: 'mdi-timer', path: '/stop-watch' },
        { name: 'SOME', icon: 'mdi-timer', path: '/some' },
      ]
    }
  },
  methods: {
    isActive(path) {
      if (this.$route.path === path) {
        return "active";
      }
      return "";
    },
  }
}
</script>

<style scoped>
.active {
  background-color: #616161;
}
</style>
