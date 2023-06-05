let input = document.querySelector('#filtra')
let categorias = document.querySelector('#quartosTable')


input.addEventListener("input", function(){
let valor = input.value.toLocaleLowerCase()


 let item = categorias.getElementsByTagName('th')


for (let contador in item) {
    if(true === isNaN(contador)){
        continue
    }


    let conteudo = item[contador].innerHTML.toLocaleLowerCase()
     if (true === conteudo.includes(valor)){
        item[contador].style.center = ''
     } else {
        item[contador].style.display = 'none'
     }
   
}


})