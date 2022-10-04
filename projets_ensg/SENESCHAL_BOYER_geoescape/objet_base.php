<?php
//On se connecte à la BDD geobase
    //$bdd = new PDO('mysql:host=localhost;dbname=geoescape;charset=utf8', 'root', 'root');
    $link = mysqli_connect('mysql-esene.alwaysdata.net','esene', 'geoescape', 'esene_geoescape');
    
    if (!$link) {
        die('Erreur de connexion');
    } 
    else {
        //echo 'Succès... ';
    }
    ?>
    
    <?php
    mysqli_set_charset($link, "utf8");
    ?>
    
    <?php
    //$id_objet_debut = $_POST['code'];

    $requete ="SELECT * FROM objet ";
    //$result = mysqli_query($link, $requete);
    if ($result = mysqli_query($link, $requete)) {
    //3-récupérer une liste d'objet contenant la valeur
          //on recup chaque ligne du résultat sous forme de tableau associatif
        while ($array = mysqli_fetch_assoc($result)) {
            //$liste_objet_debut= $array;
            $liste_objet[] = $array; // $array est un tableau associatif
      } }
      
      /*
      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["indice"]. "<br>";
        }}
        */
    else {
        echo "Erreur de requête de base de données.";
      }
    ?>
    
    <?php 
//4-retourner le tout en JSON (avec echo json_encode($array)) -->
    echo json_encode($liste_objet, JSON_NUMERIC_CHECK);
    /*   foreach ($liste_objet  as $elem2) {
        echo json_encode($elem2);}; 
    */
        
    ?>