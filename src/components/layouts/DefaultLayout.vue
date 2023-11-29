<template>
  <v-app>
    <v-navigation-drawer expand-on-hover absolute>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ this.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ this.username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main style="height:100%">
      <router-view />
    </main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: localStorage.getItem("username"),
  }),
  methods: {
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      localStorage.setItem("roles", "");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>