<?php
//quartos.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//GET recebe/pega informaçõe
//POST envia informações
//PUT edita informações "update"
//DELETE deleta informações
//OPTIONS  é a  relação de methodos disponiveis para uso
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
//  else {
//     echo "erro de requisição";
// }

include 'conexao.php';

//Rota para obter TODOS os quartos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //aqui eu crio o comando de select para consultar o banco
    $stmt = $conn->prepare("SELECT * FROM quartos");
    //aqui eu executo o select
    $stmt->execute();
    //aqui eu recebo os dados do banco por meio do PDO
    $quartos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //transformo os dados da variave $quartos em um JSON valido
    echo json_encode($quartos);
}

//Rota para criar quartos
//Rota para inserir quartos
//Utilizando o POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $numero = $_POST['numero'];
    $tipo = $_POST['tipo'];
    $disponivel = $_POST['disponivel'];
    $valor = $_POST['valor'];
    //inserir outros campos caso necessario ....

    $stmt = $conn->prepare("INSERT INTO quartos (numero, tipo, disponivel,valor) VALUES (:numero, :tipo, :disponivel,:valor)");
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->bindParam(':disponivel', $disponivel);
    $stmt->bindParam(':valor', $valor);
    //Outros bindParams ....

    if ($stmt->execute()) {
        echo "quarto criado com sucesso!!";
    } else {
        echo "Erro ao criar quarto";
    }
}


// Rota para excluir um quarto

if($_SERVER['REQUEST_METHOD']==='DELETE' && isset($_GET['id'])){
    $id   = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM quartos WHERE id = :id");
    $stmt-> bindParam(':id', $id);

    if($stmt->execute()){
        echo "quarto excluido com sucesso!!!";
    } else {
        echo "Erro ao excluir quarto!";
    }
}

//Rota para atualizar um quarto existente
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_GET['id'];
    $novoNumero = $_PUT['numero'];
    $novoTipo = $_PUT['tipo'];
    $novaDisponibilidade = $_PUT['disponivel'];
    $novoValor = $_PUT['valor'];
    //add novos campos caso necessario
    $stmt = $conn->prepare("UPDATE quartos SET numero = :numero, tipo = :tipo, disponivel = :disponivel, valor = :valor WHERE id = :id");
    $stmt->bindParam(':numero', $novoNumero);
    $stmt->bindParam(':tipo', $novoTipo);
    $stmt->bindParam(':disponivel', $novaDisponibilidade);
    $stmt->bindParam(':valor', $novoValor);
    $stmt->bindParam(':id', $id);
    //add novos campos caso necessario
    if ($stmt->execute()) {
        echo "Quarto atualizado!!";
    } else {
        echo "erro ao atualizar quarto :(";
    }
}
