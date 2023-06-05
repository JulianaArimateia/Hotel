
const reservaForm = document.querySelector('#reservaForm');
const nome_clienteInputb = document.querySelector('#nome_clienteInputb')
const numeroInputb = document.querySelector('#numeroInputb')
const check_inInputb = document.querySelector('#check_inInputb')
const check_upInputb = document.querySelector('#check_upInputb')
const URLReservas = 'http://localhost:8000/reservas.php'
const tbody = document.querySelector('#tbody')

function carregarReservas() {
    fetch(URLReservas, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(reservas => {
            tbody.innerHTML = ''

            for (let i = 0; i < reservas.length; i++) {
                const tr = document.createElement('tr')
                const reserva = reservas[i]

                tr.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.nome_cliente}</td>
                    <td>${reserva.numero}</td>
                    <td>${reserva.check_in}</td>
                    <td>${reserva.check_up}</td>
                    <td>
                        <button class="btn btn-warning" data-id="${reserva.id}" onclick="atualizarReservas(${reserva.id})">Editar</button>
                        <button class="btn btn-warning" onclick="excluirReservas(${reserva.id})">Excluir</button>
                    </td>
                `
                tbody.appendChild(tr)
            }

        })
}


// função para criar uma reserva
function adicionarReserva(e) {
   e.preventDefault()

     //tirei agora
    // let nome_clienteInputb = document.querySelector('#nome_clienteInputb')
    // let numeroInputb       = document.querySelector('#numeroInputb')
    // let check_inInputb     = document.querySelector('#check_inInputb')
    // let check_upInputb     = document.querySelector('#check_upInputb')


    const nome_cliente = nome_clienteInputb.value
    const numero = numeroInputb.value
    const check_in = check_inInputb.value
    const check_up = check_upInputb.value

    console.log('-->', nome_cliente, numero, check_in, check_up)

    fetch(URLReservas, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `numero=${encodeURIComponent(numero)}&check_in=${encodeURIComponent(check_in)}&check_up=${encodeURIComponent(check_up)}&nome_cliente=${encodeURIComponent(nome_cliente)}`
    })
        .then(response => {
            if (response.ok) {
                carregarReservas()
                nome_clienteInputb.value = ''
                numeroInputb.value = ''
                check_inInputb.value = ''
                check_upInputb.value = ''
            } else {
                console.error('Erro ao adicionar reserva')
                alert('Erro ao adicionar reserva')
            }
        })
}

function atualizarReservas(id) {
   
    const novoNumero = prompt("Informe o novo número")
    const novoCheck_in = prompt("Informe o novo check-in do quarto")
    const novoCheck_up = prompt("Informe o novo check-out do quarto")
    const novoNome_cliente = prompt("Informe o novo nome do cliente")
    

    if (novoNumero && novoCheck_in && novoCheck_up && novoNome_cliente) {
        fetch(`${URLReservas}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `numero=${encodeURIComponent(novoNumero)}&check_in=${encodeURIComponent(novoCheck_in)}&check_up=${encodeURIComponent(novoCheck_up)}&nome_cliente=${encodeURIComponent(novoNome_cliente)}`
        })
            .then(response => {
                if (response.ok) {
                    carregarReservas()
                } else {
                    console.error('Erro ao atualizar reserva')
                    alert('Erro ao atualizar reserva')
                }
            })
    }
}

function excluirReservas(id) {
    if (confirm('Deseja excluir a reserva?')) {
        fetch(`${URLReservas}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarReservas()
                } else {
                    console.error('Erro ao excluir reserva')
                    alert('Erro ao excluir reserva')
                }
            })
    }
}

addEventListener('submit', adicionarReserva);


carregarReservas()

  

