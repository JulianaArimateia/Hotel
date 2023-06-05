const form = document.querySelector('#quartoForm')
// const numeroQuarto = document.querySelector('#numeroQuarto')
// const tipoQuarto = document.querySelector('#tipoQuarto')
// const disponivelQuarto = document.querySelector('#disponivelQuarto')
// const valorQuarto = document.querySelector('#valorQuarto')
const quartoHotel = document.querySelector('#quartoHotel')
const URLQuartos = 'http://localhost:8080/quartos.php'
const tableBody = document.querySelector('#quartosTable')

function carregarQuartos() {
    fetch(URLQuartos, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(quartos => {
        tableBody.innerHTML = ''

        for (let i = 0; i < quartos.length; i++) {
            const div = document.createElement('div');
            const quarto = quartos[i]
            let status = ''

            if (quarto.disponivel == 1) {
                status = 'disponivel'
            }else{
                status = 'indisponivel'
            }
            div.innerHTML =`
            <div class="card" id="caixa" style="width: 18rem; heigth: 25rem;">
                <div class="card-body list-group list-group-flush " id="central">
                    <h5 class="card-title list-group-item">Reservas de Quartos</h5>
                    <li class="card-text  list-group-item numero">Numero Quarto: ${quarto.numero}</li>
                    <li class="card-text  list-group-item categoria">Categoria: ${quarto.tipo}</li>
                    <li class="card-text  list-group-item">Status: ${status}</li>
                    <li class="card-text  list-group-item">Preço: R$${quarto.valor}</p>
                    <a class="btn btn-warning" href="clientes.html">Reservar Quarto</a>
            </div>`

            tableBody.appendChild(div)
       
       }
    })
}


carregarQuartos()
carregarReservas()



