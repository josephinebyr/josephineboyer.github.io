<!-- On crée une session pour garder le pseudo du joueur et mémoire durant le jeu. -->
<?php session_start();
$_SESSION['pseudo'] = $_GET['pseudo']?>

<!DOCTYPE html>
<html>
<head>
	
	<title>Tulip' escape</title>
	<link rel="icon" type="image/png" href="logo.png" />

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Attribution du fichier de style css : -->
	<link rel="stylesheet" href="style_map.css">
	<!-- Téléchargement de la bonne police : -->
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
	<!-- Liaison avec le leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
	
</head>
	<body onload="initElement();"> <!-- On appelle la focntion d'initialisation au chargement du fichier. -->
		
		<h1> Bonjour <?php echo $_SESSION['pseudo']?>, réussiras-tu à retrouver les tulipes ? Clique sur le premier objet de la carte pour commencer la quête :</h1>

		<!-- Affichage de la carte pour le jeu. -->
		<div id="map" ></div>

		<!--Affichage du temps de jeu, actualisé toutes les secondes.-->
		<div class="chronometre">
			Temps de jeu :
			<span id="timer">
				0 min 0 s
			</span>
		</div>

		<!-- Zone dans la laquelle le joueur tape un code pour débloquer un objet. -->
		<form action="#" method="get" id="codeobjet">
			<fieldset>
				<legend>Débloque l'objet en rentrant le code ci-dessous ! </legend>
				<label>Code : <input type="text" name="code"></label>
				<input type="submit" name="valider" value="Valider">
			</fieldset>
		</form>

		<!-- Zone dans laquelle sont affichés les objets récupérés par le joueur. -->
		<div id='objets_stockes'>
			Voici ta valise, fais un clic droit sur les objets récupérables pour les prendre avec toi.<br>
			<img class"blabla" id="img_cle" src="cle.png" alt="Clés" >
			<img id="img_lunettes" src="lunettes.png" alt="Lunettes">
			<img id="img_masque" src="masque.png" alt="Masque">
		
		</div>

		<!-- Script pour charger le leaflet servant à afficher la carte. -->
		<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

		<!-- Script JavaScript pour gérer les interactions du joueur avec la page de jeu. -->
		<script src="map.js"></script>

	</body>
</html>