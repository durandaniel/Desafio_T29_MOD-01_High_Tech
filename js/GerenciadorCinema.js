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

    inserirLinha() {
        let tabela = document.getElementById("tabela");

        let linha = tabela.insertRow();
        linha.id = "linha-" + this.contador;

        let colunaNome = linha.insertCell();
        let colunaIdade = linha.insertCell();
        let colunaEmail = linha.insertCell();
        let colunaExcluir = linha.insertCell();
        let colunaEditar = linha.insertCell();

        colunaNome.innerText = convidado.nome;
        colunaIdade.innerText = convidado.idade;
        colunaEmail.innerText = convidado.email;

        let imgExcluir = document.createElement("img");
        imgExcluir.src = "img/deletar.svg";
        imgExcluir.setAttribute(
            "onclick", `gerenciadorCinema.remover(${this.contador})`
        );

        colunaExcluir.appendChild(imgExcluir);

        let imgEditar = document.createElement("img");
        imgEditar.src = "img/editar.svg";
        imgEditar.setAttribute(
            "onclick", `gerenciadorCinema.editar(${this.contador})`
        );

        colunaEditar.appendChild(imgEditar);
    }








}

let gerenciadorCinema = new GerenciadorCinema;