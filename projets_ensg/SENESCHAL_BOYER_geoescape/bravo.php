<?php session_start()?>
<!DOCTYPE html>
<html>
<head>
	
	<title>Tulip' escape</title>
	<link rel="icon" type="image/png" href="logo.png" />

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Attribution du fichier de style css : -->
	<link rel="stylesheet" href="style_bravo.css">
	<!-- Téléchargement de la bonne police : -->
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">

</head>

<body>
	<!--Affichage du logo du jeu sur la page -->
	<img id="logo" src="logo0.png" alt="Logo du jeu">

	<!--Gestion du score en PHP : le score envoyé par le $GET est le nombre de secondes, 
	on le traduit en minutes et secondes avec la fonction 'score_to_time'.
	On garde la valeur des minutes et des secondes pour les afficher sur la page.
	Le score sauvegardé dans la base de données et dans les données de la session
	est un nombre de secondes pour simplifier son traitement.-->
	<?php 
		function score_to_time($score) {
			if ($score < 60) {
				$minutes = 0;
				$secondes = $score;
			} elseif ($score > 60) {
				$minutes = intval(abs($score / 60));
				$score = $score - ($minutes * 60);
				$secondes = $score;
			}
			return [$secondes, $minutes];
		}
		$secondes = score_to_time($_GET['nb_sec'])[0];
		$minutes = score_to_time($_GET['nb_sec'])[1];
		$_SESSION['score'] = $_GET['nb_sec'];
	?>
	<h1 id="title">Tu as trouvé les tulipes en <?= $minutes?> minutes et <?= $secondes?> secondes.</h1>

	<!--On affiche la photo des fameuses tulipes. -->
	<img id="photofinale" src="tulipes.png">

	<!--On enregistre ici le score du joueur dans la BDD, et on affiche sur la page le succès du chargement.-->
	<div id="message_validation">
	<?php
		try {
			$dbName = 'esene_geoescape';
			$host = 'mysql-esene.alwaysdata.net';
			$utilisateur = 'esene';
			$motDePasse = 'geoescape';
			$port='3306';
			$dns = 'mysql:host='.$host .';dbname='.$dbName.';port='.$port;
			$bdd = new PDO( $dns, $utilisateur, $motDePasse );
		}
		catch(Exception $e) {
			die('Erreur : '.$e->getMessage());
		}
		
		$ajout_score = $bdd->prepare('INSERT INTO scores(pseudo, score) VALUES(:pseudo, :score)');
		$ajout_score->execute(array(
			'pseudo' => $_SESSION['pseudo'],
			'score' => $_SESSION['score'],
			));
		echo 'Ton score a bien été ajouté au classement !';
	?>
	
	<!--Liens pour changer de page (retour à l'accueil et regarder les solutions du jeu).-->
	<p id="retour"> <a href = 'homepage.php'> Retour à l'accueil</p>
	<p> <a href = 'solution.html'>Solutions et crédits du jeu </p>
	</div>

	

</body>
</html>