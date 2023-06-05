const form = document.querySelector('#quartoForm')
const numeroInput = document.querySelector('#numeroInput')
const valorInput = document.querySelector('#valorInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const URL = 'http://localhost:8080/quartos.php'

const tableBody = document.querySelector('#quartosTable')

function carregarQuartos() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            tableBody.innerHTML = ''
            
            for (let i = 0; i < quartos.length; i++) {
                const tr = document.createElement('tr')
                const quarto = quartos[i]
                
                let status = ''

                if (quarto.disponivel == 1) {
                    status = 'disponivel'
                } else {
                    status = 'indisponivel'
                    tr.classList.add('bg-warning') // Adiciona a classe CSS 'table-danger' à linha (tr)
                }

                
                tr.innerHTML = `
                    <td>${quarto.id}</td>
                    <td>${quarto.numero}</td>
                    <td>${quarto.valor}</td>
                    <td>${quarto.tipo}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-warning" data-id="${quarto.id}" onclick="atualizarQuarto(${quarto.id})">Editar</button>
                        <button class="btn btn-warning" onclick="excluirQuarto(${quarto.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

// função para criar um quarto
function adicionarQuarto(e) {

    e.preventDefault()

    const numero = numeroInput.value
    const valor = valorInput.value
    const tipo = tipoInput.value
    const disponivel = disponivelInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `numero=${encodeURIComponent(numero)}&valor=${encodeURIComponent(valor)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent(disponivel)}`
    })
        .then(response => {
            if (response.ok) {
                carregarQuartos()
                numeroInput.value = ''
                valorInput.value = ''
                tipoInput.value = ''
                disponivelInput.value = ''
            } else {
                console.error('Erro ao add quarto')
                alert('Erro ao add quarto')
            }
        })
}

function atualizarQuarto(id) {
    const novoNumero = prompt("Informe o novo numero")
    const novoValor = prompt("Informe o novo valor do quarto")
    const novoTipo = prompt("Informe a nova categoria do quarto")
    const novoDisponibilidade = prompt("Informe a nova disponibilidade")
    if (novoNumero && novoValor && novoTipo && novoDisponibilidade) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `numero=${encodeURIComponent(novoNumero)}&valor=${encodeURIComponent(novoValor)}&tipo=${encodeURIComponent(novoTipo)}&disponivel=${encodeURIComponent(novoDisponibilidade)}`
        })
            .then(response => {
                if (response.ok) {
                    carregarQuartos()
                } else {
                    console.error('Erro ao att quarto')
                    alert('erro ao att quarto')
                }
            })
    }
}
function excluirQuarto(id){
    if(confirm('Deseja excluir o quarto ?')){
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if(response.ok){
                carregarQuartos()
            }else{
                console.error('Erro ao excluir quarto')
                alert('Erro ao excluir quarto')
            }
        })
    }
}



addEventListener('submit', adicionarQuarto)

carregarQuartos()

