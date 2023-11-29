import { http } from "./config";

export default {
  login: (usuario) => {
    return http.post("login", usuario);
  },
  esqueciMinhaSenha: (usuario) => {
    return http.post("reset-senha", usuario);
  },
  alterarSenhaEsquecida: (usuario) => {
    return http.post("alterar-senha", usuario);
  },
};