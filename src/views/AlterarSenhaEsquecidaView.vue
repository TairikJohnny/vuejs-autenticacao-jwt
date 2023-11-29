<template>
  <div id="app">
    <v-card class="mx-auto grow" elevation="12" color="white" max-height="390px">
      <v-card-text class="black--text">
        <div class="pt-5 pb-5 pl-10 pr-10">
          <div>
            <h1>Alterar a Senha</h1>
            <p class="pt-5">Informar email cadastrado no sistema e a nova senha</p>
          </div>
          <div class="text-center pt-5">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="username" :rules="regra_email" label="Email" placeholder="Email" outlined
                class="fonte-texto" />
              <v-text-field v-model="password" :rules="regra_senha" label="Nova Senha" placeholder="Nova Senha" outlined
                class="fonte-texto" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1" />
              <v-row>
                <v-col> <v-btn color="red" class="fonte-botao" large text to="/">
                    Cancelar
                  </v-btn></v-col>
                <v-col><v-btn color="primary" class="white--text fonte-botao" large :loading="loading" :disabled="!valid"
                    @click="alterarSenha()">
                    Enviar
                  </v-btn></v-col>
              </v-row>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Autenticacao from "../services/autenticacao";
import Swal from "sweetalert2";
export default {
  name: "AlterarSenhaEsquecidaView",
  data: () => ({
    username: "",
    password: "",
    regra_email: [
      (v) => !!v || "O e-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    regra_senha: [(v) => !!v || "A senha é obrigatória"],
    valid: true,
    loading: false,
    // Criando a variavel pro icone de mostrar a senha
    show1: false,
  }),
  methods: {
    alterarSenha() {
      this.loading = true;
      Autenticacao.alterarSenhaEsquecida({
        username: this.username,
        password: this.password,
        token: this.$route.params.token,
      }).then((response) => {
        Swal.fire({
          title: "Senha alterada com sucesso!",
          confirmButtonText: "OK",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/");
          }
        });
        response;
        this.loading = false;
      }).catch((e) => {
        Swal.fire(
          "Erro",
          "Erro ao atualizar a senha",
          "error",
        );
        console.log(e.response.data);
        this.loading = false;
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
