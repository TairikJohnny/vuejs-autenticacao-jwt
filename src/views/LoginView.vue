<template>
  <div id="app">
    <v-card class="mx-auto grow" elevation="12" color="white" max-height="450">
      <v-card-text class="black--text">
        <div class="pt-6 pb-5 pl-10 pr-10">
          <div class="text-center">
            <h1>Login</h1>
          </div>
          <div class="text-center pt-10">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="usuario.username" :rules="regra_email" label="Email" placeholder="Email" outlined
                class="fonte-texto" />
              <v-text-field v-model="usuario.password" :rules="regra_senha" label="Senha" placeholder="Senha" outlined
                class="fonte-texto" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1" />
              <v-btn color="primary" class="white--text fonte-botao" large :disabled="!valid" @click="login(usuario)">
                Entrar
                <v-icon right>
                  mdi-login
                </v-icon>
              </v-btn>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="mt-10">
      <v-btn color="red" class="white--text fonte-botao" to="/esqueci-minha-senha">
        <v-icon left>
          mdi-alert-circle
        </v-icon>
        Esqueci a minha senha
      </v-btn>
    </div>
  </div>
</template>

<script>
import Autenticacao from "../services/autenticacao";
import Swal from "sweetalert2";
export default {
  name: "LoginView",
  data: () => ({
    usuario: {
      username: "",
      password: "",
    },
    // Criando a variavel pro icone de mostrar a senha
    show1: false,
    valid: true,
    regra_email: [
      (v) => !!v || "O e-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    regra_senha: [(v) => !!v || "A senha é obrigatória"],
  }),
  methods: {
    login() {
      Autenticacao.login(this.usuario).then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("roles", response.data.roles);
        this.$router.push("/home");
      }).catch((e) => {
        Swal.fire(
          "Erro",
          "Usuário ou senha incorretos",
          "error",
        );
        console.log(e.response.data);
      });
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
