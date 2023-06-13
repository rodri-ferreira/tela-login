// variaveis globais
let elementoClicado = false;
let emailExiste = false;
let logado = false;

//botões de cadastrar
const btnCriarConta1 = document.querySelector('#cadastrarInputEntrar');
const btnCriarConta2 = document.querySelector('#cadastrar');
const btnEntrar = document.querySelector('#entrar');

//div input cadastrar
const InputCadastrar = document.querySelector('#inputCadastrar');

const campoLoginEmail = document.querySelector('#email');
const campoLoginSenha = document.querySelector('#senha');

//campo de entrada "CADASTRAR"
const campoCadastrarEmail = document.querySelector('#emailCad');
const campoCadastrarSenha = document.querySelector('#senhaCad');

const msgErroCriado = document.querySelector('#msgErroCriado');
const msgLoginErro = document.querySelector('#msgLogin');

// aparece o form de cadastrar conta
btnCriarConta1.addEventListener('click', () => {
    const InputCadastrar = document.querySelector('#inputCadastrar');
    InputCadastrar.classList.remove('active');
});

// função mostrar msg de conta criada
const msgContaCriada = () => {  
    if(campoCadastrarEmail.value !== '' && campoCadastrarSenha.value !== '' ) {
        if(subirCadastroDb(campoCadastrarEmail.value, campoCadastrarSenha.value)) {
            msgErroCriado.innerHTML = 'conta criada, Faça o login'
        } else {
            msgErroCriado.innerHTML = 'email existente'
        }
        campoCadastrarEmail.value = '';
        campoCadastrarSenha.value = '';
    }

     if(!elementoClicado) {
        InputCadastrar.appendChild(msgContaCriada);
        elementoClicado = true;
    }
}

const msgLogin = (email, senha) => {
    const cadastro = {
        email: email,
        senha: senha
    }

    const cadastroDb = getLocalStorage()
    cadastroDb.forEach(cadastroDb => {
        if(cadastroDb.email === cadastro.email && cadastroDb.senha === cadastro.senha){
            logado = true;
        } 
    });

    if(logado) {
        window.location.href = 'logado.html';
    } else {
        msgLoginErro.innerHTML = 'email ou senha incorretos';
    }

    logado = false;
}

//Subir o cadastro da conta no BD

const getLocalStorage = () => JSON.parse(localStorage.getItem('cadastroClientes')) ?? [];
const setLocalStorage = (cadastro) => localStorage.setItem('cadastroClientes', JSON.stringify(cadastro));

const subirCadastroDb = (email, senha) => {
    getLocalStorage()
    const cadastro = {
        email: email,
        senha: senha
    }

    const cadastroDb = getLocalStorage()
    cadastroDb.forEach(cadastroDb => {
        if(cadastroDb.email === cadastro.email){
            emailExiste = true;
        } 
    });

    if(!emailExiste) {
        const cadastros = getLocalStorage();
        cadastros.push(cadastro);
        setLocalStorage(cadastros);
        emailExiste = false;
        return true;
    } else {
        emailExiste = false;
        return false;
    }
}

const logarPagina = () => {
    msgLogin(campoLoginEmail.value, campoLoginSenha.value);
}

//função cadastrar conta
const cadastrarConta = () => {
    msgContaCriada();
}

// botão que execultará as ações para cadastrar a conta
btnCriarConta2.addEventListener('click', cadastrarConta);
btnEntrar.addEventListener('click', logarPagina);