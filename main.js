const tbody = document.querySelector("tbody")
const descItem = document.querySelector("#desc")
const valor = document.querySelector("#valor")
const tipo = document.querySelector("#tipo")
const btnNovo = document.querySelector("#btnNovo")

const entradas = document.querySelector(".entradas")
const saidas = document.querySelector(".saidas")
const total = document.querySelector(".total")

let itens;

btnNovo.onclick = () => {
    if(descItem.value === "" || valor.value === "" || tipo.value === "")
    {
        return alert("Preencha todos os campos!")
    }

    itens.push({
        desc: descItem.value,
        valor: Math.abs(valor.value).toFixed(2),
        // o math.abs deixa o valor absoluto
        tipo: tipo.value
    })

    setItensBD()
    loadItens()


    descItem.value = ""
    valor.value = ""
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index){
    let tr = document.createElement("tr")

    tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.valor}</td>
    <td class="columnTipo">${item.tipo === "Entrada"
        ? 'subiu'
        : 'desceu'
    }</td>
    <td class="columnAcao">
        <button onclick="deleteItem(${index})">LX</button>
    </td>
    `
    tbody.appendChild(tr)
}

function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ""
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
    getTotals();
}

function getTotals(){
    const valorEntradas = itens
        .filter((item) => item.tipo === "Entrada")
        .map((transacao) => Number(transacao.valor))

    const valorSaidas = itens
        .filter((item) => item.tipo === "Saída")
        .map((transacao) => Number(transacao.valor))

    const totalEntradas = valorEntradas
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)

    const totalSaidas = valorSaidas
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)

    const totalItens = (totalEntradas - totalSaidas).toFixed(2)

    entradas.innerHTML = totalEntradas
    saidas.innerHTML = totalSaidas
    total.innerHTML = totalItens 
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_itens"))?? []
const setItensBD = () => localStorage.setItem("db_itens", JSON.stringify(itens))

loadItens()