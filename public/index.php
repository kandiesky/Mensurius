<?php
$qid = "0";
$relacionado = "0";
$pergunta = "MENSURIUS - PLATAFORMA DE QUESTIONÁRIOS";
$nome = "MENSURIUS";
$imagem = "";
$url = "http://www.okituke.com.br/mensurius/";

if (isset($_SERVER['PATH_INFO'])) {
    $path = $_SERVER['PATH_INFO'];
    $path = substr($path, 1); //Tira a primeira /, que é ruim para cá
    $arrayPaths = explode("/", $path, 2);

    if(count($arrayPaths) == 1){
      $arrayPaths[] = "";
    }
    
    $qid = str_replace('"', "", $arrayPaths[0]);
    $relacionado = str_replace('"', "", $arrayPaths[1]);

    include "api/db.php";
    header("content-type: text/html"); //Fix porque o db.php inclui como json

    $sql = $pdo->prepare("SELECT `codigo`, `nome`, `pergunta`, `midia` FROM `mensurius_questionarios` WHERE `codigo` = ?");
    if($sql->execute(array($qid))){
      $info = $sql->fetch(PDO::FETCH_NAMED);
      if(count($info) > 0){
        $pergunta = $info['pergunta'];
        $nome = $info['nome'];
        $imagem = "http://www.okituke.com.br/mensurius/{$info['midia']}";
        $url = "http://www.okituke.com.br/mensurius/{$info['codigo']}";
      }
    }
}

?>
<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <!-- For Google -->
  <meta name="description" content="<?=$pergunta?>" />
  <meta name="keywords" content="<?=$nome?>" />

  <meta name="author" content="KITSITE" />
  <meta name="copyright" content="SCRIPTA / MULTIKOMBRASIL" />
  <meta name="application-name" content="Mensurius" />

  <!-- For Facebook -->
  <meta property="og:title" content="<?=$nome?>" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="<?=$imagem?>" />
  <meta property="og:url" content="<?=$url?>" />
  <meta property="og:description" content="<?=$pergunta?>" />

  <!-- For Twitter -->
  <meta name="twitter:card" content="Sumário" />
  <meta name="twitter:title" content="<?=$nome?>" />
  <meta name="twitter:description" content="<?=$pergunta?>" />
  <meta name="twitter:image" content="<?=$imagem?>" />
  <title>Mensurius</title>
</head>

<body>
  <noscript>
    <strong>Pedimos desculpas, mas o Mensurius não funciona sem JavaScript. Se puder habilitar ou atualizar seu
      navegador, poderá aproveitar com totalidade os recursos!</strong>
  </noscript>
  <main id="app" data-qid="<?=$qid?>" data-relacionado="<?=$relacionado?>"></main>
</body>

</html>