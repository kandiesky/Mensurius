<?php 
$qid = isset($_GET['qid']) ? $_GET['qid'] : "0";
$qid = str_replace('"', "", $qid);

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
    <main id="app" data-qid="0"></main>
  </body>
</html>