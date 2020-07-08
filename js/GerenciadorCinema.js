import Cliente from "./modelo/Cliente.js"
import Sala from "./modelo/Sala.js"
import Sessao from "./modelo/Sessao.js"
import Filme from "./modelo/Filme.js"
import Cadeira from "./modelo/Cadeira.js"
import Usuario from "./modelo/Usuario.js"

class GerenciadorCinema {

    constructor() {
        this.sessoes = [];
    }
}

let gerenciadorCinema = new GerenciadorCinema;