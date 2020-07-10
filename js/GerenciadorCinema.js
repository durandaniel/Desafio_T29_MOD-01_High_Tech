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

    getColection() {

        if (localStorage.getItem('usuarios') == null) //ou seja, se estiver sem nada no local storage cria um array vazio
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')); //se ja tiver criado no localStorage, faz a busca

        if (localStorage.getItem('clientes') == null)
            localStorage.setItem('clientes', JSON.stringify(this.clientes));
        this.clientes = JSON.parse(localStorage.getItem('clientes'));

        if (localStorage.getItem('filmes') == null)
            localStorage.setItem('filmes', JSON.stringify(this.filmes));
        this.filmes = JSON.parse(localStorage.getItem('filmes'));

        if (localStorage.getItem('cadeiras') == null)
            localStorage.setItem('cadeiras', JSON.stringify(this.cadeiras));
        this.cadeiras = JSON.parse(localStorage.getItem('cadeiras'));

        if (localStorage.getItem('salas') == null)
            localStorage.setItem('salas', JSON.stringify(this.salas));
        this.salas = JSON.parse(localStorage.getItem('salas'));

        if (localStorage.getItem('sessoes') == null)
            localStorage.setItem('sessoes', JSON.stringify(this.sessoes));
        this.sessoes = JSON.parse(localStorage.getItem('sessoes'));

        if (localStorage.getItem('usersID') == null)
            localStorage.setItem('usersID', JSON.stringify(this.usersID));
        this.usersID = JSON.parse(localStorage.getItem('usersID'));
    }

    verifyLogin() {
        if (localStorage.logged === undefined) {
            localStorage.setItem('logged', false);
        }
        if (localStorage.logged == "false") {
            window.location.href = 'login.html'
        }
    }

    //Login

    checkLogin() {

        let userLogin = {};

        userLogin.username = document.getElementById("username").value;
        userLogin.password = document.getElementById("password").value;

        let indexOnArray = this.indexOnArray(this.usuarios, "username", userLogin.username);

        if (indexOnArray != -1) { //ou seja, se achou o login entra aqui
            if (userLogin.password == this.usuarios[indexOnArray].senha) { //se foi compatível com a senha deixa ele logar
                localStorage.setItem('logged', true);
                window.location.href = 'index.html';
            }
        }

    }

    //logout
    logout() {
        localStorage.setItem('logged', false);
        window.location.href = 'index.html';
    }

    indexOnArray(array, atributo, valorBuscado) {
        let index = -1;
        for (let i = 0; i < array.length; i++) { //fazendo busca do nome do usuario n localStorage
            if (array[i][atributo] == valorBuscado) {
                index = i;
                return index;
            }
        }
        return index;
    }

    // cadeira

    // cliente

    // filme

    // sala

    // sessao

    // usuario

    createUsuario() {
        let usuario = {};

        this.getUsuario(usuario);

        if (this.verifyUsuario(usuario)) { //Se o usuario tiver os campos validos ira entrar
            if (this.verifyUsuarioInLocalStorage(usuario)) { //Se o usuario não estiver no banco de dados ele ira entrar aqui para inserir
                this.setUsuarioInLocalStorage(usuario);
                this.cleanUserField();
                alert("O Cadastro foi realizado com Sucesso!");
                window.location.href = 'login.html'
            }
        }
    }

    getUsuario(usuario) {

        usuario.nome = document.getElementById("nome_usuario").value;
        usuario.email = document.getElementById("email_usuario").value;
        usuario.username = document.getElementById("username").value;
        usuario.senha = document.getElementById("senha").value;

    }

    verifyUsuario(usuario) {

        if (usuario.nome != "" &&
            usuario.email != "" &&
            usuario.username != "" &&
            usuario.senha != "") {
            return true
        } else {
            alert("Preencha Todos os campos corretamente!")
            return false
        }
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

        let indexOnArray = "";
        for (let i = 0; i < this.usuarios.length; i++) { //fazendo busca do nome do usuario n localStorage
            if (this.usuarios[i].id == id) {
                indexOnArray = i;
            }
        }

        document.getElementById("nome_usuario").value = this.usuarios[indexOnArray].nome;
        document.getElementById("email_usuario").value = this.usuarios[indexOnArray].email;
        document.getElementById("username").value = this.usuarios[indexOnArray].username;
        document.getElementById("senha").value = this.usuarios[indexOnArray].senha;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveUserEdit(${id})`);

    }

    saveUserEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.usuarios.length; i++) { //fazendo busca do nome do usuario n localStorage
            if (this.usuarios[i].id == id) {
                indexOnArray = i;
            }
        }

        let usuarioNovo = {};
        this.getUsuario(usuarioNovo);

        if (this.verifyUsuario(usuarioNovo)) {

            this.usuarios[indexOnArray].nome = document.getElementById("nome_usuario").value;
            this.usuarios[indexOnArray].email = document.getElementById("email_usuario").value;
            this.usuarios[indexOnArray].username = document.getElementById("username").value;
            this.usuarios[indexOnArray].senha = document.getElementById("senha").value;

            document.getElementById("btn-save").innerText = "Salvar";
            document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.createUsuario()`);

            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
            this.getColection();

            this.cleanUserField();

            this.createUsersTable();
        }
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