<template>
  <div id="app">
    <v-card class="mx-auto grow" elevation="12" color="white" max-height="330px">
      <v-card-text class="black--text">
        <div class="pt-5 pb-5 pl-10 pr-10">
          <div>
            <h1>Esqueci Minha Senha</h1>
            <p class="pt-5">Informar o email cadastrado no sistema <br> para a recuperação da senha</p>
          </div>
          <div class="text-center pt-5">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="usuario.username" :rules="regra_email" label="Email" placeholder="Email" outlined
                class="fonte-texto" />
              <v-row>
                <v-col> <v-btn color="red" class="fonte-botao" large text to="/">
                    Cancelar
                  </v-btn></v-col>
                <v-col><v-btn color="primary" class="white--text fonte-botao" large :loading="loading" :disabled="!valid"
                    @click="resetSenha(usuario)">
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
  name: "EsqueciMinhaSenhaView",
  data: () => ({
    usuario: {
      username: "",
    },
    regra_email: [
      (v) => !!v || "O e-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    valid: true,
    loading: false,
  }),
  methods: {
    resetSenha() {
      this.loading = true;
      Autenticacao.esqueciMinhaSenha(this.usuario).then((response) => {
        Swal.fire(
          "Sucesso",
          "E-mail enviado para <strong>" +
          response.data.emailPara +
          "</strong> com sucesso!!!",
          "success",
        );
        this.loading = false;
      }).catch((e) => {
        Swal.fire(
          "Erro",
          "Erro ao enviar o email",
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
