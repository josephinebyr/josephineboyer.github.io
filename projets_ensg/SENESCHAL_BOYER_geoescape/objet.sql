-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql-esene.alwaysdata.net
-- Généré le :  mar. 15 déc. 2020 à 16:49
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP :  7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `esene_geoescape`
--

-- --------------------------------------------------------

--
-- Structure de la table `objet`
--

CREATE TABLE `objet` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `indice` varchar(200) DEFAULT NULL,
  `icone` varchar(50) DEFAULT NULL,
  `zoom` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `recuperable` tinyint(1) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `bloc_objet` tinyint(1) DEFAULT NULL,
  `etat_bloquer` tinyint(1) NOT NULL,
  `id_bloquant` int(11) NOT NULL,
  `bloc_code` tinyint(1) DEFAULT NULL,
  `liberation` tinyint(1) DEFAULT NULL,
  `id_objet_liberer` int(11) NOT NULL,
  `debut` tinyint(1) DEFAULT NULL,
  `indice_objet_bloquant` varchar(100) NOT NULL,
  `id_objet_liberer_2` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `objet`
--

INSERT INTO `objet` (`id`, `name`, `indice`, `icone`, `zoom`, `latitude`, `longitude`, `recuperable`, `code`, `bloc_objet`, `etat_bloquer`, `id_bloquant`, `bloc_code`, `liberation`, `id_objet_liberer`, `debut`, `indice_objet_bloquant`, `id_objet_liberer_2`) VALUES
(1, 'Tachéomètre', 'C\'est les vacances ! Plonge à côté des bouées sous le soleil de Forca.', 'tacheo.png', 8, 48.8411, 2.58728, 0, '0', 0, 0, 0, 0, 1, 2, 1, '', 0),
(2, 'Clé', 'Tu as trouvé les clés de la Goldie dans la piscine... Récupère-les avec un clic droit et retrouve la Goldie qui est garée non loin d\'ici.', 'cle.png', 13, 43.9561, 5.77998, 1, '0', 1, 0, 0, 0, 1, 3, 0, '', 0),
(3, 'Goldie', 'En voiture Simone, direction le Crous de Montesquieu pour voir Floriane !', 'goldie.png', 13, 43.9624, 5.77419, 0, '0', 1, 1, 2, 0, 1, 6, 0, '', 0),
(4, 'Pergola', 'Cherche les lunettes de soleil en faisant un clic droit. C\'est mieux pour faire la sieste.', 'pergola.png', 13, 43.9955, 5.8437, 0, '0', 1, 1, 0, 0, 1, 13, 0, '', 0),
(5, 'Bouteille', 'Mot de passe pour aller en after au Crous.', 'bouteille.png', 13, 43.2968, 5.35504, 0, '523', 1, 1, 13, 0, 1, 4, 0, 'Tu as oublié tes lunettes de soleil à Sigonce, retourne les chercher !', 0),
(6, 'Crous', '', 'crous.png', 13, 48.8426, 2.58589, 0, '523', 1, 1, 5, 1, 1, 7, 0, 'C\'est Marseille bébé !!', 0),
(7, 'Maquillage', 'Direction Saulieu ! C\'est le WEI, c\'est pas l\'heure de dormir!', 'maquillage.png', 13, 48.8426, 2.58589, 1, '0', 0, 0, 0, 0, 1, 8, 0, '', 0),
(8, 'Sapins', 'Les Sapins de l\'ENSG sont de sortie à la capitale, va leur faire coucou !', 'sapin.png', 13, 47.2902, 4.2262, 0, 'Paris', 1, 0, 7, 0, 1, 9, 0, '', 0),
(9, 'Bières', 'Le bde nous a fait une surprise ! Rends-toi à un autre WEI au bout du RER A.', 'biere.png', 13, 48.8524, 2.3344, 0, 'Paris', 1, 0, 8, 0, 1, 10, 0, 'Retourne voir les Sapins !', 0),
(10, 'Mickey Mouse', 'C\'est l\'heure du week-end Europe, va chercher des tulipes à Amsterdam !', 'mickey.png', 13, 48.8727, 2.7766, 0, '0', 1, 1, 11, 0, 1, 11, 0, 'Retourne vite à l\'ENSG chercher ton masque avant la fermeture du parc !', 12),
(11, 'Masque', 'Clic droit sur le masque pour le récupérer.', 'masque.png', 13, 48.8415, 2.58733, 1, '0', 1, 0, 13, 0, 0, 10, 0, '', 0),
(12, 'Tulipes', 'Là où tout a commencé...', 'tulipe.png', 13, 52.3709, 4.9043, 1, '0', 1, 0, 10, 0, 0, 0, 0, '', 0),
(13, 'Lunettes de soleil', 'Clic droit sur les lunettes pour les récupérer.', 'lunettes.png', 13, 43.9955, 5.8437, 1, '0', 1, 0, 0, 0, 0, 5, 0, '', 0),
(14, 'Carte', 'C\'est les vacances ! Plonge à côté des bouées sous le soleil de Forca.', 'carte.png', 8, 44.4434, 5.02461, 0, '0', 0, 0, 0, 0, 1, 2, 1, '', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `objet`
--
ALTER TABLE `objet`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
