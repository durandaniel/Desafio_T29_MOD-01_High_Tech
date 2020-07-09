// import Cliente from "./modelo/Cliente.js"
// import Sala from "./modelo/Sala.js"
// import Sessao from "./modelo/Sessao.js"
// import Filme from "./modelo/Filme.js"
// import Cadeira from "./modelo/Cadeira.js"
// import Usuario from "./modelo/Usuario.js"

class GerenciadorCinema {

    constructor() {
        // gerenciadorCinema
        this.sessoes = [];
        this.logged = false;
        // cadeira
        this.cadeiras = [];
        // cliente
        this.clientes = [];
        // filme
        this.filmes = [];
        // sala
        this.salas = [];
        // sessao

        // usuario
        this.usuarios = [];
        this.usersID = 0;
    }

    // gerenciadorCinema

    verifyLogin() {
        if (localStorage.logged === null || localStorage.logged === undefined || localStorage.logged === false || localStorage.logged === "") {
            window.location.href = 'login.html'
        }
    }

    getColection() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if (this.usuarios == null)
            this.usuarios = [];

        this.clientes = JSON.parse(localStorage.getItem('clientes'));
        if (this.clientes == null)
            this.clientes = [];

        this.filmes = JSON.parse(localStorage.getItem('filmes'));
        if (this.filmes == null)
            this.filmes = [];

        this.cadeiras = JSON.parse(localStorage.getItem('cadeiras'));
        if (this.cadeiras == null)
            this.cadeiras = [];

        this.salas = JSON.parse(localStorage.getItem('salas'));
        if (this.salas == null)
            this.salas = [];

        this.sessoes = JSON.parse(localStorage.getItem('sessoes'));
        if (this.sessoes == null)
            this.sessoes = [];

        this.usersID = JSON.parse(localStorage.getItem('usersID'));
        if (this.usersID == null)
            this.usersID = 0;
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

    // cadeira

    // cliente

    // filme

    // sala

    // sessao

    // usuario

    createUsuario() {
        let usuario = this.getUsuario();

        if (this.verifyUsuario(usuario)) { //Se o usuario tiver os campos validos ira entrar
            if (this.verifyUsuarioInLocalStorage(usuario)) { //Se o usuario não estiver no banco de dados ele ira entrar aqui para inserir
                this.setUsuarioInLocalStorage(usuario);
                this.cleanUserField();
                alert("O Cadastro foi realizado com Sucesso!");
                window.location.href = 'login.html'
            }
        }
        else {
            alert("Preencha Todos os campos corretamente!")
        }
    }

    getUsuario() {

        let usuario = {};

        usuario.nome = document.getElementById("nome_usuario").value;
        usuario.email = document.getElementById("email_usuario").value;
        usuario.username = document.getElementById("username").value;
        usuario.senha = document.getElementById("senha").value;



        return usuario;
    }

    verifyUsuario(usuario) {

        if (usuario.nome != "" &&
            usuario.email != "" &&
            usuario.username != "" &&
            usuario.senha != "") {
            return true
        } else false
    }

    verifyUsuarioInLocalStorage(usuario) { //retorna true se não estiver no banco local storage

        if (this.usuarios != null && this.usuarios != undefined && this.usuarios != false && this.usuarios != "") { //se não existir banco de dados quer dizer que o usuario pode ser criado e já retorna true; se existir usuarios já cadastrados ele entra no if e vamos verificar se ele já foi cadastrado

            for (let i = 0; i < this.usuarios.length; i++) { //fazendo busca do nome do usuario n localStorage
                if (this.usuarios[i].username == usuario.username) {
                    alert("Este Username Já existe, escolha outro!")
                    return false; //retorna que ja existe usuario com esse username
                }
            }
        }

        return true
    }

    setUsuarioInLocalStorage(usuario) {
        usuario.id = this.usersID;
        this.usersID++;
        localStorage.setItem('usersID', JSON.stringify(this.usersID));
        this.usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        this.getColection();
    }

    cleanUserField() {

        document.getElementById("nome_usuario").value = "";
        document.getElementById("email_usuario").value = "";
        document.getElementById("username").value = "";
        document.getElementById("senha").value = "";

    }

    createUsersTable() {

        let tabela = document.getElementById("users_tbody");
        tabela.innerHTML = "";

        if (this.usuarios != null && this.usuarios != undefined && this.usuarios != false && this.usuarios != "") {//se existir usuario pra inserir na tabela entra aqui



            for (let i = 0; i < this.usuarios.length; i++) {

                let linha = tabela.insertRow();
                linha.id = "linha-" + this.usuarios[i].id;

                let colunaNome = linha.insertCell();
                let colunaEmail = linha.insertCell();
                let colunaUsername = linha.insertCell();
                let colunaSenha = linha.insertCell();
                let colunaEditar = linha.insertCell();
                let colunaExcluir = linha.insertCell();

                colunaNome.innerText = this.usuarios[i].nome;
                colunaEmail.innerText = this.usuarios[i].email;
                colunaUsername.innerText = this.usuarios[i].username;
                colunaSenha.innerText = "*SECRET*";



                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.png";
                imgEditar.classList.add("img-table");
                imgEditar.setAttribute(
                    "onclick", `gerenciadorCinema.userEdit(${this.usuarios[i].id})`
                );

                colunaEditar.appendChild(imgEditar);



                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.png";
                imgExcluir.classList.add("img-table");
                imgExcluir.setAttribute(
                    "onclick", `gerenciadorCinema.userRemove(${this.usuarios[i].id})`
                );

                colunaExcluir.appendChild(imgExcluir);


            }

        }
    }

    userEdit(id) {

        document.getElementById("nome_usuario").value = this.usuarios[id].nome;
        document.getElementById("email_usuario").value = this.usuarios[id].email;
        document.getElementById("username").value = this.usuarios[id].username;
        document.getElementById("senha").value = this.usuarios[id].senha;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveUserEdit(${id})`);

    }

    saveUserEdit(id) {

        this.usuarios[id].nome = document.getElementById("nome_usuario").innerText;
        this.usuarios[id].email = document.getElementById("email_usuario").value;
        this.usuarios[id].username = document.getElementById("username").value;
        this.usuarios[id].senha = document.getElementById("senha").value;

        document.getElementById("btn-save").innerText = "Salvar";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.userEdit(${id})`);

        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        this.getColection();

        this.cleanUserField();

        this.createUsersTable();
    }

    userRemove(id) {

        this.getColection();

        for (let i = 0; i < this.usuarios.length; i++) { //fazendo busca do nome do usuario n localStorage
            if (this.usuarios[i].id == id) {
                this.usuarios.splice(i, 1); //removemos o usuario do array
                localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
                this.getColection();
            }
        }

        this.createUsersTable();

    }




}



var gerenciadorCinema = new GerenciadorCinema();