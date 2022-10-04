<?php session_start()?>
<!DOCTYPE html>
<html>
<head>
	
	<title>Tulip' escape</title>
	<link rel="icon" type="image/png" href="logo.png" />

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Attribution du fichier de style css : -->
	<link rel="stylesheet" href="style_homepage.css">
	<!-- Téléchargement de la bonne police : -->
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
</head>

<body>
	<!-- On affiche le log du jeu et le titre : -->
	<img id="logo" src="banniere.png" alt="Logo du jeu">
	<h1 id="title">Bienvenue sur le Tulip' escape !</h1>
	
	<!-- Texte des consignes a joueur.-->
	<p id="consignes">
		Les fameuses tulipes ont vadrouillé lors de leur première année à l'ENSG. Mais elles ont perdu leurs précieux objets lors de leurs péripéties. 
		Réussiras-tu à trouver les objets te menant aux tulipes ? Parcours la carte, nos objets préférés t'aideront lors de ta quête.
	</p>

	<!-- Formulaire pour que le joueur entre son pseudo. Il est obligé de remplir le champ input pour pouvoir valider le formulaire.-->
	<form action="script.php" method="get" id="inscription">
		<label> Pseudo :<input type="text" name="pseudo" placeholder="ex : JeSuisTulipe" inputmode="latin" required></label>
		<p><input type="submit" id="play" value="Lancer la partie"></p>
	</form>
  	
	<!-- Encadré pour afficher les meilleurs scores sous forme de liste, on fait appel à la base de données.-->
	<ul id="scores">Meilleurs scores :
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
		$reponse = $bdd->query('SELECT * FROM scores ORDER BY score ASC LIMIT 5');

		while ($donnees = $reponse->fetch()) {
	?>
		<p id="liste_scores">
			<?= $donnees['score']; ?> secondes  - <?php echo $donnees['pseudo']; ?><br />
		</p>
	<?php
		}
		$reponse->closeCursor();
	?>
	</ul>

</body>
</html>