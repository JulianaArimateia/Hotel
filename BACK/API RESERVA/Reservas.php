<?php
//reservas.php
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

//Rota para obter TODOS os reservas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //aqui eu crio o comando de select para consultar o banco
    $stmt = $conn->prepare("SELECT * FROM reserva");
    //aqui eu executo o select
    $stmt->execute();
    //aqui eu recebo os dados do banco por meio do PDO
    $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //transformo os dados da variave $reservas em um JSON valido
    echo json_encode($reservas);
}

//Rota para criar reservas
//Rota para inserir reservas
//Utilizando o POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome_cliente = $_POST['nome_cliente'];
    $numero = $_POST['numero'];
    $check_in = $_POST['check_in'];
    $check_up = $_POST['check_up'];
    //inserir outros campos caso necessario ....

    $stmt = $conn->prepare("INSERT INTO reserva (nome_cliente, numero, check_in, check_up) VALUES (:nome_cliente, :numero, :check_in, :check_up)");
    $stmt->bindParam(':nome_cliente', $nome_cliente);
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':check_in', $check_in);
    $stmt->bindParam(':check_up', $check_up);
    //Outros bindParams ....

    if ($stmt->execute()) {
        echo "Reserva criado com sucesso!!";
    } else {
        echo "Erro ao criar reserva";
    }
}


// Rota para excluir um reserva

if($_SERVER['REQUEST_METHOD']==='DELETE' && isset($_GET['id'])){
    $id   = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM reserva WHERE id = :id");
    $stmt-> bindParam(':id', $id);

    if($stmt->execute()){
        echo "Reserva excluido com sucesso!!!";
    } else {
        echo "Erro ao excluir reserva!";
    }
}

//Rota para atualizar um reserva existente
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_GET['id'];
    $novoNome_cliente = $_PUT['nome_cliente'];
    $novoNumero = $_PUT['numero'];
    $novoCheck_in = $_PUT['check_in'];
    $novoCheck_up = $_PUT['check_up'];
    //add novos campos caso necessario
    $stmt = $conn->prepare("UPDATE reserva SET nome_cliente = :nome_cliente, numero = :numero, check_in = :check_in, check_up = :check_up WHERE id = :id");
    $stmt->bindParam(':nome_cliente', $novoNome_cliente);
    $stmt->bindParam(':numero', $novoNumero);
    $stmt->bindParam(':check_in', $novoCheck_in);
    $stmt->bindParam(':check_up', $novoCheck_up);
    $stmt->bindParam(':id', $id);
    //add novos campos caso necessario
    if ($stmt->execute()) {
        echo "Reserva atualizado!!";
    } else {
        echo "Erro ao atualizar reserva :(";
    }
}
