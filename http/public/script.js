const inputNameUrl = document.querySelector('#inputNameUrl');
const btnInserir = document.querySelector('#btnInserir');
const lista = document.querySelector('.lista');

btnInserir.addEventListener('click', adicionarElemento);

async function load() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(({ name, url }) => lerElementos({ name, url }))
}

load()

function lerElementos({ name , url }) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const delBtnElement = document.createElement('button');

    link.innerText = `${name}`;
    link.setAttribute('href', `${url}`)
    delBtnElement.innerText = 'Delete';
    delBtnElement.setAttribute('id', name);
    delBtnElement.classList.add('delBtn');

    li.appendChild(link);
    li.appendChild(delBtnElement);
    lista.appendChild(li);

    delBtnElement.addEventListener('click', async function(){
        const res = await fetch(`http://localhost:3000?name=${name}&url=${url}&del=1`).then(removeElements()).then(load())
    })
}

function removeElements(){
    const liLista = document.querySelectorAll('li');
    liLista.forEach((item) => {
        lista.removeChild(item)
    })
}

async function adicionarElemento(){
    const input = inputNameUrl.value;
    const inputSeparate = input.split(',');
    const name = inputSeparate[0];
    const url = inputSeparate[1];
    const res = await fetch(`http://localhost:3000?name=${name}&url=${url}`).then(removeElements()).then(load())
}