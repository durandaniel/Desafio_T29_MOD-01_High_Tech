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

        // IDs
        this.usersID = 0;
        this.clientesID = 0;
        this.salasID = 0;
        this.sessoesID = 0;
        this.filmesID = 0;
    }

    // ---------- GERENCIADOR CINEMA ----------

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

        if (localStorage.getItem('clientesID') == null)
            localStorage.setItem('clientesID', JSON.stringify(this.clientesID));
        this.clientesID = JSON.parse(localStorage.getItem('clientesID'));

        if (localStorage.getItem('salasID') == null)
            localStorage.setItem('salasID', JSON.stringify(this.salasID));
        this.salasID = JSON.parse(localStorage.getItem('salasID'));

        if (localStorage.getItem('sessoesID') == null)
            localStorage.setItem('sessoesID', JSON.stringify(this.sessoesID));
        this.sessoesID = JSON.parse(localStorage.getItem('sessoesID'));

        if (localStorage.getItem('filmesID') == null)
            localStorage.setItem('filmesID', JSON.stringify(this.filmesID));
        this.filmesID = JSON.parse(localStorage.getItem('filmesID'));

    }

    verifyLogin() {
        if (localStorage.logged === undefined) {
            localStorage.setItem('logged', false);
        }
        if (localStorage.logged == "false") {
            window.location.href = 'login.html'
        }
    }

    // ---------- LOGIN 

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

    // ---------- LOGOUT 

    logout() {
        localStorage.setItem('logged', false);
        window.location.href = 'index.html';
    }

    indexOnArray(array, atributo, valorBuscado) { //ex: (this.usuarios, "nome", joao)
        let index = -1;
        for (let i = 0; i < array.length; i++) { //fazendo busca do nome do usuario n localStorage
            if (array[i][atributo] == valorBuscado) {
                index = i;
                return index;
            }
        }
        return index;
    }

    // ------------------------------------------------------------------ JS MODULE ------------------------------------------------------------------

    // ---------- CLIENTE ----------

    createCliente() {
        let cliente = {};

        this.getCliente(cliente);

        if (this.verifyCliente(cliente)) { //Se o cliente tiver os campos validos ira entrar
            if (this.verifyClienteInLocalStorage(cliente)) { //Se o cliente não estiver no banco de dados ele ira entrar aqui para inserir
                this.setClienteInLocalStorage(cliente);
                this.cleanClienteField();
                alert("O Cadastro foi realizado com Sucesso!");
                this.createClienteTable();
            }
        }
    }

    getCliente(cliente) {

        cliente.nome = document.getElementById("nome_cliente").value;
        cliente.idade = document.getElementById("idade_cliente").value;
        cliente.email = document.getElementById("email_cliente").value;

    }

    verifyCliente(cliente) {

        if (cliente.nome != "" &&
            cliente.idade != "" &&
            cliente.email != "") {
            return true
        } else {
            alert("Preencha Todos os campos corretamente!")
            return false
        }

    }

    verifyClienteInLocalStorage(cliente) {

        if (this.clientes != null && this.clientes != undefined && this.clientes != false && this.clientes != "") { //se não existir banco de dados quer dizer que o cliente pode ser criado e já retorna true; se existir clientes já cadastrados ele entra no if e vamos verificar se ele já foi cadastrado

            for (let i = 0; i < this.clientes.length; i++) { //fazendo busca do nome do cliente no localStorage
                if (this.clientes[i].email == cliente.email) {
                    alert("Este Email Já existe, escolha outro! Verifique se o Usuário ja existe!")
                    return false; //retorna que ja existe cliente com esse email
                }
            }
        }

        return true
    }

    setClienteInLocalStorage(cliente) {
        cliente.id = this.clientesID;
        this.clientesID++;
        localStorage.setItem('clientesID', JSON.stringify(this.clientesID));
        this.clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
        this.getColection();
    }

    cleanClienteField() {
        document.getElementById("nome_cliente").value = "";
        document.getElementById("idade_cliente").value = "";
        document.getElementById("email_cliente").value = "";
    }

    createClienteTable() {

        let tabela = document.getElementById("cliente_tbody");

        tabela.innerHTML = "";

        if (this.clientes != null && this.clientes != undefined && this.clientes != false && this.clientes != "") {//se existir cliente pra inserir na tabela entra aqui



            for (let i = 0; i < this.clientes.length; i++) {

                let linha = tabela.insertRow();
                linha.id = "linha-" + this.clientes[i].id;

                let colunaNome = linha.insertCell();
                let colunaIdade = linha.insertCell();
                let colunaEmail = linha.insertCell();
                let colunaEditar = linha.insertCell();
                let colunaExcluir = linha.insertCell();

                colunaNome.innerText = this.clientes[i].nome;
                colunaIdade.innerText = this.clientes[i].idade;
                colunaEmail.innerText = this.clientes[i].email;


                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.png";
                imgEditar.classList.add("img-table");
                imgEditar.setAttribute(
                    "onclick", `gerenciadorCinema.clienteEdit(${this.clientes[i].id})`
                );

                colunaEditar.appendChild(imgEditar);



                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.png";
                imgExcluir.classList.add("img-table");
                imgExcluir.setAttribute(
                    "onclick", `gerenciadorCinema.clienteRemove(${this.clientes[i].id})`
                );

                colunaExcluir.appendChild(imgExcluir);


            }

        }
    }

    clienteEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.clientes.length; i++) { //fazendo busca do nome do cliente n localStorage
            if (this.clientes[i].id == id) {
                indexOnArray = i;
            }
        }

        document.getElementById("nome_cliente").value = this.clientes[indexOnArray].nome;
        document.getElementById("idade_cliente").value = this.clientes[indexOnArray].idade;
        document.getElementById("email_cliente").value = this.clientes[indexOnArray].email;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveClienteEdit(${id})`);

    }

    saveClienteEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.clientes.length; i++) { //fazendo busca do nome do cliente n localStorage
            if (this.clientes[i].id == id) {
                indexOnArray = i;
            }
        }

        let clienteNovo = {};
        this.getCliente(clienteNovo);

        if (this.verifyCliente(clienteNovo)) {

            this.clientes[indexOnArray].nome = document.getElementById("nome_cliente").value;
            this.clientes[indexOnArray].idade = document.getElementById("idade_cliente").value;
            this.clientes[indexOnArray].email = document.getElementById("email_cliente").value;

            document.getElementById("btn-save").innerText = "Salvar";
            document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.createCliente()`);

            localStorage.setItem('clientes', JSON.stringify(this.clientes));
            this.getColection();

            this.cleanClienteField();

            this.createClienteTable();
        }

    }

    clienteRemove(id) {

        this.getColection();

        for (let i = 0; i < this.clientes.length; i++) { //fazendo busca do nome do cliente n localStorage
            if (this.clientes[i].id == id) {
                this.clientes.splice(i, 1); //removemos o cliente do array
                localStorage.setItem('clientes', JSON.stringify(this.clientes));
                this.getColection();
            }
        }

        this.createClienteTable();


    }

    // ---------- FILMES ----------

    createFilme() {
        let filme = {};

        this.getFilme(filme);

        if (this.verifyFilme(filme)) { //Se o cliente tiver os campos validos ira entrar
            if (this.verifyFilmeInLocalStorage(filme)) { //Se o cliente não estiver no banco de dados ele ira entrar aqui para inserir
                this.setFilmeInLocalStorage(filme);
                this.cleanFilmeField();
                alert("O Cadastro foi realizado com Sucesso!");
                this.createFilmeTable();
            }
        }
    }

    getFilme(filme) {

        filme.nome = document.getElementById("nome_filme").value;
        filme.duracao = document.getElementById("duracao_filme").value;
        filme.faixa_etaria = document.getElementById("faixa_etaria").value;
        filme.genero = document.getElementById("genero_filme").value;
        filme.sinopse = document.getElementById("sinopse_filme").value;

    }

    verifyFilme(filme) {

        if (filme.nome != "" &&
            filme.duracao != "" &&
            filme.faixa_etaria != "" &&
            filme.genero != "" &&
            filme.sinopse != "") {
            return true
        } else {
            alert("Preencha Todos os campos corretamente!")
            return false
        }

    }

    verifyFilmeInLocalStorage(filme) {

        if (this.filmes != null && this.filmes != undefined && this.filmes != false && this.filmes != "") { //se não existir banco de dados quer dizer que o filme pode ser criado e já retorna true; se existir clientes já cadastrados ele entra no if e vamos verificar se ele já foi cadastrado

            for (let i = 0; i < this.filmes.length; i++) { //fazendo busca do nome do filme no localStorage
                if (this.filmes[i].nome == filme.nome) {
                    alert("Este Nome Já existe, escolha outro!")
                    return false; //retorna que ja existe filme com esse email
                }
            }
        }

        return true
    }

    setFilmeInLocalStorage(filme) {
        filme.id = this.filmesID;
        this.filmesID++;
        localStorage.setItem('filmesID', JSON.stringify(this.filmesID));
        this.filmes.push(filme);
        localStorage.setItem('filmes', JSON.stringify(this.filmes));
        this.getColection();
    }

    cleanFilmeField() {
        document.getElementById("nome_filme").value = "";
        document.getElementById("duracao_filme").value = "";
        document.getElementById("faixa_etaria").value = "";
        document.getElementById("genero_filme").value = "";
        document.getElementById("sinopse_filme").value = "";
    }

    createFilmeTable() {

        let tabela = document.getElementById("filme_tbody");

        tabela.innerHTML = "";

        if (this.filmes != null && this.filmes != undefined && this.filmes != false && this.filmes != "") {//se existir filme pra inserir na tabela entra aqui



            for (let i = 0; i < this.filmes.length; i++) {

                let linha = tabela.insertRow();
                linha.id = "linha-" + this.filmes[i].id;

                let colunaNome = linha.insertCell();
                let colunaDuracao = linha.insertCell();
                let colunaFaixa_etaria = linha.insertCell();
                let colunaGenero = linha.insertCell();
                let colunaSinopse = linha.insertCell();
                let colunaEditar = linha.insertCell();
                let colunaExcluir = linha.insertCell();

                colunaNome.innerText = this.filmes[i].nome;
                colunaDuracao.innerText = this.filmes[i].duracao;
                colunaFaixa_etaria.innerText = this.filmes[i].faixa_etaria;
                colunaGenero.innerText = this.filmes[i].genero;
                colunaSinopse.innerText = this.filmes[i].sinopse;


                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.png";
                imgEditar.classList.add("img-table");
                imgEditar.setAttribute(
                    "onclick", `gerenciadorCinema.filmeEdit(${this.filmes[i].id})`
                );

                colunaEditar.appendChild(imgEditar);



                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.png";
                imgExcluir.classList.add("img-table");
                imgExcluir.setAttribute(
                    "onclick", `gerenciadorCinema.filmeRemove(${this.filmes[i].id})`
                );

                colunaExcluir.appendChild(imgExcluir);


            }

        }
    }

    filmeEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.filmes.length; i++) { //fazendo busca do nome do filme no localStorage
            if (this.filmes[i].id == id) {
                indexOnArray = i;
            }
        }

        document.getElementById("nome_filme").value = this.filmes[indexOnArray].nome;
        document.getElementById("duracao_filme").value = this.filmes[indexOnArray].duracao;
        document.getElementById("faixa_etaria").value = this.filmes[indexOnArray].faixa_etaria;
        document.getElementById("genero_filme").value = this.filmes[indexOnArray].genero;
        document.getElementById("sinopse_filme").value = this.filmes[indexOnArray].sinopse;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveFilmeEdit(${id})`);

    }

    saveFilmeEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.filmes.length; i++) { //fazendo busca do nome do cliente n localStorage
            if (this.filmes[i].id == id) {
                indexOnArray = i;
            }
        }

        let filmeNovo = {};
        this.getFilme(filmeNovo);

        if (this.verifyFilme(filmeNovo)) {

            this.filmes[indexOnArray].nome = document.getElementById("nome_filme").value;
            this.filmes[indexOnArray].duracao = document.getElementById("duracao_filme").value;
            this.filmes[indexOnArray].faixa_etaria = document.getElementById("faixa_etaria").value;
            this.filmes[indexOnArray].genero = document.getElementById("genero_filme").value;
            this.filmes[indexOnArray].sinopse = document.getElementById("sinopse_filme").value;

            document.getElementById("btn-save").innerText = "Salvar";
            document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.createFilme()`);

            localStorage.setItem('filmes', JSON.stringify(this.filmes));
            this.getColection();

            this.cleanFilmeField();

            this.createFilmeTable();
        }

    }

    filmeRemove(id) {

        this.getColection();

        for (let i = 0; i < this.filmes.length; i++) { //fazendo busca do nome do filme n localStorage
            if (this.filmes[i].id == id) {
                this.filmes.splice(i, 1); //removemos o filme do array
                localStorage.setItem('filmes', JSON.stringify(this.filmes));
                this.getColection();
            }
        }

        this.createFilmeTable();


    }

    // ---------- SALAS ----------

    createSala() {

        let sala = {};

        this.getSala(sala);

        if (this.verifySala(sala)) { //Se o cliente tiver os campos validos ira entrar
            if (this.verifySalaInLocalStorage(sala)) { //Se o cliente não estiver no banco de dados ele ira entrar aqui para inserir
                this.setSalaInLocalStorage(sala);
                this.cleanSalaField();
                alert("O Cadastro foi realizado com Sucesso!");
                this.createSalaTable();
            }
        }
    }

    getSala(sala) {

        sala.nome = document.getElementById("nome_sala").value;
        sala.fileiras = 6;
        sala.cadeiras = 10;
        // sala.fileiras = document.getElementById("fileiras").value;
        // sala.cadeiras = document.getElementById("cadeira_por_fileira").value;

    }

    verifySala(sala) {

        if (sala.nome != "" &&
            sala.fileiras != "" &&
            sala.cadeiras != "") {
            return true
        } else {
            alert("Preencha Todos os campos corretamente!")
            return false
        }

    }

    verifySalaInLocalStorage(sala) {

        if (this.salas != null && this.salas != undefined && this.salas != false && this.salas != "") { //se não existir banco de dados quer dizer que o sala pode ser criado e já retorna true; se existir clientes já cadastrados ele entra no if e vamos verificar se ele já foi cadastrado

            for (let i = 0; i < this.salas.length; i++) { //fazendo busca do nome do sala no localStorage
                if (this.salas[i].nome == sala.nome) {
                    alert("Este Nome Já existe, escolha outro!")
                    return false; //retorna que ja existe filme com esse email
                }
            }
        }

        return true
    }

    setSalaInLocalStorage(sala) {
        sala.id = this.salasID;
        this.salasID++;
        localStorage.setItem('salasID', JSON.stringify(this.salasID));
        this.salas.push(sala);
        localStorage.setItem('salas', JSON.stringify(this.salas));
        this.getColection();
    }

    cleanSalaField() {
        document.getElementById("nome_sala").value = "";
        // document.getElementById("fileiras").value = "";
        // document.getElementById("cadeira_por_fileira").value = "";
    }

    createSalaTable() {

        let tabela = document.getElementById("sala_tbody");

        tabela.innerHTML = "";

        if (this.salas != null && this.salas != undefined && this.salas != false && this.salas != "") {//se existir sala pra inserir na tabela entra aqui



            for (let i = 0; i < this.salas.length; i++) {

                let linha = tabela.insertRow();
                linha.id = "linha-" + this.salas[i].id;

                let colunaNome = linha.insertCell();
                let colunaFileiras = linha.insertCell();
                let colunaCadeiras = linha.insertCell();
                let colunaEditar = linha.insertCell();
                let colunaExcluir = linha.insertCell();

                colunaNome.innerText = this.salas[i].nome;
                colunaFileiras.innerText = this.salas[i].fileiras;
                colunaCadeiras.innerText = this.salas[i].cadeiras;


                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.png";
                imgEditar.classList.add("img-table");
                imgEditar.setAttribute(
                    "onclick", `gerenciadorCinema.salaEdit(${this.salas[i].id})`
                );

                colunaEditar.appendChild(imgEditar);



                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.png";
                imgExcluir.classList.add("img-table");
                imgExcluir.setAttribute(
                    "onclick", `gerenciadorCinema.salaRemove(${this.salas[i].id})`
                );

                colunaExcluir.appendChild(imgExcluir);


            }

        }
    }

    salaEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.salas.length; i++) { //fazendo busca do nome do sala no localStorage
            if (this.salas[i].id == id) {
                indexOnArray = i;
            }
        }

        document.getElementById("nome_sala").value = this.salas[indexOnArray].nome;
        document.getElementById("fileiras").value = this.salas[indexOnArray].fileiras;
        document.getElementById("cadeira_por_fileira").value = this.salas[indexOnArray].cadeiras;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveSalaEdit(${id})`);

    }

    saveSalaEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.salas.length; i++) { //fazendo busca do nome da sala no localStorage
            if (this.salas[i].id == id) {
                indexOnArray = i;
            }
        }

        let salaNova = {};
        this.getSala(salaNova);

        if (this.verifySala(salaNova)) {

            this.salas[indexOnArray].nome = document.getElementById("nome_sala").value
            this.salas[indexOnArray].fileiras = document.getElementById("fileiras").value
            this.salas[indexOnArray].cadeiras = document.getElementById("cadeira_por_fileira").value

            document.getElementById("btn-save").innerText = "Salvar";
            document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.createSala()`);

            localStorage.setItem('salas', JSON.stringify(this.salas));
            this.getColection();

            this.cleanSalaField();

            this.createSalaTable();
        }

    }

    salaRemove(id) {

        this.getColection();

        for (let i = 0; i < this.salas.length; i++) { //fazendo busca do nome da sala no localStorage
            if (this.salas[i].id == id) {
                this.salas.splice(i, 1); //removemos a sala do array
                localStorage.setItem('salas', JSON.stringify(this.salas));
                this.getColection();
            }
        }

        this.createSalaTable();


    }

    // ---------- CADEIRAS ----------

    // ---------- SESSÃO ----------

    fillSessaoFields() {


        let filmesSessao = document.getElementById("filme_sessao");
        for (let i = 0; i < this.filmes.length; i++) {
            let optionFilme = document.createElement("option");
            optionFilme.text = this.filmes[i].nome
            optionFilme.value = this.filmes[i].id
            filmesSessao.add(optionFilme);
        }

        let salasSessao = document.getElementById("sala_sessao");
        for (let i = 0; i < this.salas.length; i++) {
            let optionSalas = document.createElement("option");
            optionSalas.text = this.salas[i].nome
            optionSalas.value = this.salas[i].id
            salasSessao.add(optionSalas);
        }

    }

    createSessao() {

        let sessao = {};

        this.getSessao(sessao);

        if (this.verifySessao(sessao)) { //Se a sessao tiver os campos validos ira entrar
            if (this.verifySessaoInLocalStorage(sessao)) { //Se a sessao não estiver no banco de dados ele ira entrar aqui para inserir
                this.setSessaoInLocalStorage(sessao);
                this.cleanSessaoField();
                alert("O Cadastro foi realizado com Sucesso!");
                this.createSessaoTable();
            }
        }
    }

    getSessao(sessao) {

        sessao.filme = document.getElementById("filme_sessao").value;
        sessao.idioma = document.getElementById("idioma_sessao").value;
        sessao.dimensao = document.getElementById("dimensao_sessao").value;
        sessao.sala = document.getElementById("sala_sessao").value;
        sessao.data = document.getElementById("data_sessao").value;
        sessao.horario = document.getElementById("horario_sessao").value;

    }

    verifySessao(sessao) {

        if (sessao.filme != "" &&
            sessao.idioma != "" &&
            sessao.dimensao != "" &&
            sessao.sala != "" &&
            sessao.data != "" &&
            sessao.horario != "") {
            return true
        } else {
            alert("Preencha Todos os campos corretamente!")
            return false
        }

    }

    verifySessaoInLocalStorage(sessao) {

        return true
    }

    setSessaoInLocalStorage(sessao) {
        sessao.id = this.sessoesID;
        this.sessoesID++;
        localStorage.setItem('sessoesID', JSON.stringify(this.sessoesID));
        this.sessoes.push(sessao);
        localStorage.setItem('sessoes', JSON.stringify(this.sessoes));
        this.getColection();
    }

    cleanSessaoField() {

        document.getElementById("filme_sessao").value = "";
        document.getElementById("idioma_sessao").value = "";
        document.getElementById("dimensao_sessao").value = "";
        document.getElementById("sala_sessao").value = "";
        document.getElementById("data_sessao").value = "";
        document.getElementById("horario_sessao").value = "";

    }

    createSessaoTable() {

        let tabela = document.getElementById("sessao_tbody");

        tabela.innerHTML = "";

        if (this.sessoes != null && this.sessoes != undefined && this.sessoes != false && this.sessoes != "") {//se existir filme pra inserir na tabela entra aqui



            for (let i = 0; i < this.sessoes.length; i++) {

                let linha = tabela.insertRow();
                linha.id = "linha-" + this.sessoes[i].id;

                let colunaFilme = linha.insertCell();
                let colunaIdioma = linha.insertCell();
                let colunaDimensao = linha.insertCell();
                let colunaSala = linha.insertCell();
                let colunaData = linha.insertCell();
                let colunaHorario = linha.insertCell();
                let colunaEditar = linha.insertCell();
                let colunaExcluir = linha.insertCell();

                colunaFilme.innerText = this.sessoes[i].filme;
                colunaIdioma.innerText = this.sessoes[i].idioma;
                colunaDimensao.innerText = this.sessoes[i].dimensao;
                colunaSala.innerText = this.sessoes[i].sala;
                colunaData.innerText = this.sessoes[i].data;
                colunaHorario.innerText = this.sessoes[i].horario;


                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.png";
                imgEditar.classList.add("img-table");
                imgEditar.setAttribute(
                    "onclick", `gerenciadorCinema.sessaoEdit(${this.sessoes[i].id})`
                );

                colunaEditar.appendChild(imgEditar);



                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.png";
                imgExcluir.classList.add("img-table");
                imgExcluir.setAttribute(
                    "onclick", `gerenciadorCinema.sessaoRemove(${this.sessoes[i].id})`
                );

                colunaExcluir.appendChild(imgExcluir);


            }

        }
    }

    sessaoEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.sessoes.length; i++) { //fazendo busca do nome da sessao no localStorage
            if (this.sessoes[i].id == id) {
                indexOnArray = i;
            }
        }


        document.getElementById("filme_sessao").value = this.sessoes[indexOnArray].filme;
        document.getElementById("idioma_sessao").value = this.sessoes[indexOnArray].idioma;
        document.getElementById("dimensao_sessao").value = this.sessoes[indexOnArray].dimensao;
        document.getElementById("sala_sessao").value = this.sessoes[indexOnArray].sala;
        document.getElementById("data_sessao").value = this.sessoes[indexOnArray].data;
        document.getElementById("horario_sessao").value = this.sessoes[indexOnArray].horario;

        document.getElementById("btn-save").innerText = "Salvar Edição";
        document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.saveSessaoEdit(${id})`);

    }

    saveSessaoEdit(id) {

        let indexOnArray = "";
        for (let i = 0; i < this.sessoes.length; i++) { //fazendo busca do nome da sessao no localStorage
            if (this.sessoes[i].id == id) {
                indexOnArray = i;
            }
        }

        let sessaoNova = {};
        this.getSessao(sessaoNova);

        if (this.verifySessao(sessaoNova)) {

            this.sessoes[indexOnArray].filme = document.getElementById("filme_sessao").value;
            this.sessoes[indexOnArray].idioma = document.getElementById("idioma_sessao").value;
            this.sessoes[indexOnArray].dimensao = document.getElementById("dimensao_sessao").value;
            this.sessoes[indexOnArray].sala = document.getElementById("sala_sessao").value;
            this.sessoes[indexOnArray].data = document.getElementById("data_sessao").value;
            this.sessoes[indexOnArray].horario = document.getElementById("horario_sessao").value;

            document.getElementById("btn-save").innerText = "Salvar";
            document.getElementById("btn-save").setAttribute("onclick", `gerenciadorCinema.createSessao()`);

            localStorage.setItem('sessoes', JSON.stringify(this.sessoes));
            this.getColection();

            this.cleanSessaoField();

            this.createSessaoTable();
        }

    }

    sessaoRemove(id) {

        this.getColection();

        for (let i = 0; i < this.sessoes.length; i++) { //fazendo busca do nome do filme n localStorage
            if (this.sessoes[i].id == id) {
                this.sessoes.splice(i, 1); //removemos a sessao do array
                localStorage.setItem('sessoes', JSON.stringify(this.sessoes));
                this.getColection();
            }
        }

        this.createSessaoTable();


    }

    // ---------- USUARIO ----------

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