import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import VazioLayout from "../components/layouts/VazioLayout.vue";
import DefaultLayout from "../components/layouts/DefaultLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
    meta: { title: "Login", authRequired: "false", layout: VazioLayout },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: { title: "Home", authRequired: "true", layout: DefaultLayout },
  },
  {
    path: "/esqueci-minha-senha",
    name: "Esqueci Minha Senha",
    component: () => import("../views/EsqueciMinhaSenhaView.vue"),
    meta: { title: "Esqueci Minha Senha", authRequired: "false", layout: VazioLayout },
  },
  {
    path: "/alterar-senha-esquecida/:token",
    name: "Alterar Senha Esquecida",
    component: () => import("../views/AlterarSenhaEsquecidaView.vue"),
    meta: { title: "Alterar Senha Esquecida", authRequired: "false", layout: VazioLayout },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired === "true") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    return next();
  }
});

export default router;
