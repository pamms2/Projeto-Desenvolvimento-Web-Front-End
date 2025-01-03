var userList = [];
var count = 1;

function addUser(user, email) {
    var dataEnvio = new Date().toLocaleString();
    var newUser = { id: count++, user: user, email: email, dataEnvio: dataEnvio };
    userList.push(newUser);
    localStorage.setItem('userList', JSON.stringify(userList));
    renderUser();
    limparForm();
}

function deleteUser(userId) {
    userList = userList.filter(function (user) {
        return user.id !== userId;
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    renderUser();

    var searchInput = document.getElementById('pesquisarInput').value;
    if (searchInput.trim() !== '') {
        buscarUser(searchInput);
    } else {
        limparPesquisa(); 
    }
    limparForm();
}


function limparTudo() {
    if(userList.length > 0) {
        userList = [];
        count = 1;
        localStorage.removeItem('userList');
        renderUser();
        limparPesquisa();
        limparForm();
    } else {
        alert('Não há elementos na lista.');
    }
}

function buscarUser(query) {
    if(userList.length > 0) {
        limparPesquisa();

        var userEncontrado = userList.filter(function (user) {
            return (
                user.user.toLowerCase().includes(query.toLowerCase())
            );
        });

        document.getElementById('pesquisarInput').value = '';
        renderUserEncontrado(userEncontrado);
    } else {
        alert('Insira usuários na lista.');
    }
}

function renderUserEncontrado(userEncontrado) {
    var result = document.getElementById('result');
    result.innerHTML = '';  

    if (userEncontrado.length === 0) {
        var mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhum usuário encontrado.';
        mensagem.style.fontSize = '0.85em'; // Ajuste do tamanho da fonte
        mensagem.style.color = 'gray';     // Cor do texto
        mensagem.style.textAlign = 'center'; // Centralizar texto
        mensagem.style.marginTop = '10px'; // Espaçamento superior
        result.appendChild(mensagem);
    } else {
        userEncontrado.forEach(function (usuario) {
            var listItem = document.createElement('li');
            listItem.innerHTML = 
                `<strong>${usuario.user}</strong> (E-mail: ${usuario.email})`;
            result.appendChild(listItem);
        });
    }
}

function getLista() {
    var lista = JSON.parse(localStorage.getItem('userList'));
    userList = lista || [];
}

function renderUser() {
    var listaElemento = document.getElementById('lista');
    listaElemento.innerHTML = '';

    userList.forEach(function (usuario) {
        var listItem = document.createElement('li');
        listItem.innerHTML =
            `<span class="listaElemento">${usuario.user}</span> 
             (E-mail: ${usuario.email}, Data: ${usuario.dataEnvio}) 
             <button id="del-botao" onclick="deleteUser(${usuario.id})">Excluir</button>`;
        listaElemento.appendChild(listItem);
    });
}

function limparForm() {
    document.getElementById('user').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pesquisarInput').value = '';
}

function limparPesquisa() {
    var result = document.getElementById('result');
    result.innerHTML = '';  
}

getLista();
renderUser();

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    var userInput = document.getElementById('user');
    var emailInput = document.getElementById('email');
    addUser(userInput.value, emailInput.value);
    limparForm();
});

document.getElementById('limparTudoBtn').addEventListener('click', function () {
    limparTudo();
});

document.getElementById('limparFormBtn').addEventListener('click', function () {
    limparForm();
});

document.getElementById('PesquisarBtn').addEventListener('click', function () {
    var searchInput = document.getElementById('pesquisarInput').value;
    buscarUser(searchInput);
});
