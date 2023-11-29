<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    layout: "",
  }),

  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title;
        this.layout = to.meta.layout;
      },
    },
  },
};
</script>
