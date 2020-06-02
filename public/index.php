<?php
$qid = "0";
$relacionado = "0";
if (isset($_SERVER['PATH_INFO'])) {
    $path = $_SERVER['PATH_INFO'];
    $path = substr($path, 1); //Tira a primeira /, que é ruim para cá
    $arrayPaths = explode("/", $path, 2);

    if(count($arrayPaths) == 1){
      $arrayPaths[] = "";
    }
    
    $qid = str_replace('"', "", $arrayPaths[0]);
    $relacionado = str_replace('"', "", $arrayPaths[1]);
}
?>
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Mensurius</title>
  </head>
  <body>
    <noscript>
      <strong>Pedimos desculpas, mas o Mensurius não funciona sem JavaScript. Se puder habilitar ou atualizar seu navegador, poderá aproveitar com totalidade os recursos!</strong>
    </noscript>
    <main id="app" data-qid="<?=$qid?>" data-relacionado="<?=$relacionado?>"></main>
  </body>
</html>