/**
 * Jeux : Tulip'Escape
 * 
 * Auteur : Joséphine BOYER & Emma SENESCHAL
 * Date : Novembre-Décembre 2020
 * Projet d'élèves ingénieures en 2e année à l'ENSG Géomatique
 */

//Timer pour calculer le score
var timer = document.getElementById("timer");
var t;
var s = 0, mn = 0;
var start_time;

//Début du chronomètre lorsque la page est chargée
document.addEventListener('DOMContentLoaded', start);
function start() {
    t = setInterval(update_chrono,1000);
    start_time = Date.now();
    document.addEventListener("DOMContentLoaded", debutdujeu());
}

//Création de la carte et récupération du premier objet
function debutdujeu(){   
    //On ne veut obtenir que les objets nécessaires au début du jeu soit "debut=1". 
    //Requête Ajax sur le fichier PHP "connect_base.php"
     fetch('connect_base.php')
      .then(resultat => resultat.json())
      .then(resultat => {
        //Choix aléatoire de l'id de l'objet du début parmis le return "resultat" qui correspond à tous les objets disponibles pour lancer le jeu.
        id_debut = Math.floor(Math.random() * (resultat.length - 0) );

        creation_carte(resultat[id_debut]);
        })
}

//AJOUT DE LA CARTE ET DES OBJETS
function creation_carte(resultat){       
    //Initialisation de la carte
    var startLayer = L.layerGroup();
    var zoomedLayer = L.layerGroup();
    
    //Initialisation OBJETS DEBUT 
    id_debut = resultat.id;
    etat_objet_debut = resultat.etat_bloquer;
    var objdébutIcon = L.icon({ iconUrl: resultat.icone, iconSize: [100, 100], iconAnchor: [50, 100], popupAnchor:  [0, -100] });
    var objdébut_marker = L.marker([resultat.latitude, resultat.longitude], {icon: objdébutIcon})

    objdébut_marker.addTo(startLayer).bindPopup("<b>Objet : "+resultat.name+"</b> <br>Indice : "+resultat.indice+"</b>");

    var tacheo_marker = objdébut_marker; 
    var carte_marker = objdébut_marker;
    
    //Initialisation des autres objets
    fetch('objet_base.php')
    .then(resultat => resultat.json())
    .then(resultat => {
          
    var cleIcon = L.icon({ iconUrl: resultat[1].icone, iconSize: [80, 80],  iconAnchor: [40, 80], popupAnchor:  [0, -80] });
    var Clé =  L.marker([resultat[1].latitude, resultat[1].longitude], {icon: cleIcon});
    
    var goldieIcon = L.icon({ iconUrl: resultat[2].icone, iconSize: [70, 40], iconAnchor: [35, 40], popupAnchor:  [0, -40] } );
    var goldie_marker = L.marker([resultat[2].latitude, resultat[2].longitude], {icon: goldieIcon});
    
    var pergolaIcon =L.icon({ iconUrl: resultat[3].icone, iconSize: [80, 80],  iconAnchor: [40, 80], popupAnchor:  [0, -80] });
    var pergola_marker = L.marker([resultat[3].latitude, resultat[3].longitude], {icon: pergolaIcon});

    var lunettesIcon =L.icon({ iconUrl: resultat[12].icone, iconSize: [38, 21], iconAnchor: [19, 21], popupAnchor:  [0, -21] } );
    var lunettes_marker = L.marker([resultat[12].latitude, resultat[12].longitude], {icon: lunettesIcon});

    var bouteilleIcon = L.icon({ iconUrl: resultat[4].icone, iconSize: [30, 87], iconAnchor: [15, 87], popupAnchor:  [0, -87] });
    var bouteille_marker = L.marker([resultat[4].latitude, resultat[4].longitude], {icon: bouteilleIcon});
    
    var crousIcon =L.icon({ iconUrl: resultat[5].icone, iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor:  [0, -50] } );
    var crous_marker =  L.marker([resultat[5].latitude, resultat[5].longitude], {icon: crousIcon});
        
    var maquillageIcon = L.icon({ iconUrl: resultat[6].icone, iconSize: [70, 130], iconAnchor: [35, 130], popupAnchor:  [0, -100] });
    var maquillage_marker = L.marker([resultat[6].latitude, resultat[6].longitude], {icon: maquillageIcon})
        
    var sapinIcon = L.icon({ iconUrl: resultat[7].icone, iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor:  [0, -50] } );
    var sapin_marker = L.marker([resultat[7].latitude, resultat[7].longitude], {icon: sapinIcon})
    
    var biereIcon = L.icon({ iconUrl: resultat[8].icone, iconSize: [34, 40], iconAnchor: [17, 40], popupAnchor:  [0, -40] } );
    var biere_marker = L.marker([resultat[8].latitude, resultat[8].longitude], {icon: biereIcon})
    
    var mickeyIcon = L.icon({ iconUrl: resultat[9].icone, iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor:  [0, -50] } );
    var mickey_marker = L.marker([resultat[9].latitude, resultat[9].longitude], {icon: mickeyIcon})
     
    var masqueIcon = L.icon({ iconUrl: resultat[10].icone, iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor:  [0, -50] } );
    var masque_marker = L.marker([resultat[10].latitude, resultat[10].longitude], {icon: masqueIcon})

    var tulipeIcon = L.icon({ iconUrl: resultat[11].icone, iconSize: [60, 60], iconAnchor: [30, 60], popupAnchor:  [0, -60] });
    var tulipe_marker = L.marker([resultat[11].latitude, resultat[11].longitude], {icon: tulipeIcon});

    //Stockage des objets markers
    tableau_marker =[tacheo_marker,Clé, goldie_marker,pergola_marker, bouteille_marker , crous_marker, maquillage_marker,sapin_marker, biere_marker, mickey_marker, masque_marker, tulipe_marker, lunettes_marker, carte_marker];
      
//GESTION DES ACTIONS SUR LES OBJETS
    //Objet de début : le tachéo libère la clé -
    tacheo_marker.on('click',function (e){ 
        objet_liberation(tacheo_marker, id_debut, tableau_marker, zoomedLayer, etat_objet_debut) ;
        });
    
    //Objet de début : la carte libère la clé -
    carte_marker.on('click',function (e){ 
        objet_liberation(carte_marker, id_debut, tableau_marker, zoomedLayer, etat_objet_debut) ;
        });
        
    //Clé - libère goldie :
    Clé.on('click',function (e){
        objet_liberation(Clé, resultat[1].id, tableau_marker, zoomedLayer, resultat[1].etat_bloquer);
    
    //Clé - objet récupérable --> recupération et libération objet bloqué :
    Clé.on('contextmenu',function(event) {
        event.originalEvent.preventDefault();
        //Ajout de la clé dans la valise :
        gestionvalise('Clé'); 
        //Popup d'ajout dans la valise :
        Clé.bindPopup("<b>"+resultat[1].name+" a été mis dans ta valise.</b> <br> Va maintenant débloquer avec un clic droit la "+resultat[resultat[1].id_objet_liberer -1].name +" au centre IGN !").openPopup();
        //On désactive la clé :
        Clé.setOpacity(0);
        Clé.off('contextmenu');
        Clé.off('click');
        //Mise à jour de l'état de l'objet que bloque la clé: il est débloqué et eventListener "click" est désactivé :
        tableau_marker[ resultat[1].id_objet_liberer -1 ].off('click');
        resultat[2].etat_bloquer = false;
        })
    })
    
    //Goldie - affichage des informations si "click" 
    goldie_marker.on('click',function (e){ 
        Clé.closePopup(); 
        objet_liberation(goldie_marker, resultat[2].id,tableau_marker,  zoomedLayer, resultat[2].etat_bloquer) } );
        
    //Goldie - libère l'objet crous :
    goldie_marker.on('contextmenu',function(event) {
        event.originalEvent.preventDefault(); 
        if(resultat[2].etat_bloquer == false){
            //On supprime le marker clé :
            Clé.closePopup();
            map.removeLayer(Clé);
            //On enlève la clé de la valise :
            gestionvalise('Clé');
            //Libération de l'objet suivant suite au débloquage de l'objet :
            goldie_marker.closePopup();
            objet_liberation(goldie_marker, resultat[2].id,tableau_marker,  zoomedLayer, resultat[2].etat_bloquer)
        }
    });

    //Pergola - affichage des informations si "click" : 
    pergola_marker.on('click ',function (e){ 
        bouteille_marker.closePopup();
        //Affichage des infos car l'état de l'objet est 'bloqué'.
        pergola_marker.bindPopup("<b>"+resultat[3].name+"</b> <br>"+resultat[3].indice+"</b>").openPopup();
        //Débloquage de l'objet (correspond à l'action de rechercher lunettes avec un clic droit).
        resultat[3].etat_bloquer = false;
    } );

    //Pergola - libère un objet si clic droit dessus :
    pergola_marker.on('contextmenu',function(event) {
        event.originalEvent.preventDefault(); 
        if(resultat[2].etat_bloquer == false){
            //On supprime le marker :
            pergola_marker.closePopup();
            map.removeLayer(pergola_marker);
            //Libération de l'objet suivant :
            objet_liberation(pergola_marker, resultat[3].id,tableau_marker,  zoomedLayer, resultat[3].etat_bloquer)
        }
    });
        
    //Lunettes - affichage des informations si "click" :
    lunettes_marker.on('click',function (e){
        lunettes_marker.bindPopup("<b>"+resultat[12].name+"</b> <br>"+resultat[12].indice+"</b>").openPopup();//, {closeOnClick: false, autoClose: false});
    })
    
    //Lunettes - objet récupérable --> récupération et libération de l'objet bloqué :
    lunettes_marker.on('contextmenu',function(event) {
        event.originalEvent.preventDefault();
        //Ajout des lunettes dans la valise :
        gestionvalise('Lunettes de soleil');
        //Popup d'ajout dans la valise :
        lunettes_marker.bindPopup("<b>"+resultat[12].name+" a été mis dans ta valise</b> <br> Quel style ! Va maintenant débloquer avec un clic droit la "+resultat[resultat[12].id_objet_liberer -1].name +" à Marseille !").openPopup();
        //On désactive les lunettes :
        lunettes_marker.setOpacity(0);
        lunettes_marker.off('dblclick');
        //Mise à jour de l'état de l'objet que bloque la clé: il est débloqué et eventListenr "click" est désactivé :
        tableau_marker[ resultat[12].id_objet_liberer -1 ].off('click');
        resultat[4].etat_bloquer = false;
    })

    //Bouteille - affichage des informations si "click" :
    bouteille_marker.on('click',function (e){ 
        //Ferme le popup de l'objet précédent :
        crous_marker.closePopup();
        //Liberation de l'objet suivant :
        objet_code(bouteille_marker, resultat[4].id,tableau_marker,  zoomedLayer,resultat[4].etat_bloquer ); 
    });

    //Bouteille - objet code + libération de l'objet suivant :
    bouteille_marker.on('contextmenu',function(event) {
        event.originalEvent.preventDefault();
        if(resultat[4].etat_bloquer == false){
            crous_marker.closePopup();
            //On supprime le marker :
            lunettes_marker.closePopup();
            map.removeLayer(lunettes_marker);
            //On enleve lunette de la valise si elle sont présente
            gestionvalise('Lunettes de soleil');
            //Déblocage objet crous :
            resultat[5].etat_bloquer = false;
            //Popup d'information : le crous est débloqué :
            objet_code(bouteille_marker, resultat[4].id ,tableau_marker,  zoomedLayer, resultat[4].etat_bloquer)
        }
    });

    //Crous - objet de type "bloqué par un code" :
    crous_marker.on('click', function(evt) {
            //Ferme le popup de l'objet précédent :
            bouteille_marker.closePopup();
            //Vérification de l'état bloqué/débloqué de l'objet et le cas échéant saisie d'un code par le joueur, si le code est correct alors libération de l'objet suivant :
            crous_marker.closePopup();
            objet_a_decoder(crous_marker, resultat[5].id, resultat[5].etat_bloquer,  tableau_marker, zoomedLayer);
            crous_marker.closePopup();
            
            //Objet bloqué par un objet ne faisant pas partie de l'histoire linéaire du geoescape game, donc ajout de l'objet bloquant :
            tableau_marker[resultat[5].id_bloquant-1].addTo(zoomedLayer);
        });

    //Maquillage - affiche info + libère l'objet suivant :
    maquillage_marker.on('click',function (e){ 
        objet_liberation(maquillage_marker, resultat[6].id,tableau_marker,  zoomedLayer, resultat[6].etat_bloquer) 
    }).bindPopup("<b>"+resultat[6].name+"</b> <br>Indice : "+resultat[6].indice+"</b>");

    //Sapin - affiche info + libère l'objet suivant :
    sapin_marker.on('click',function (e){  
        objet_liberation(sapin_marker, resultat[7].id,tableau_marker,  zoomedLayer, resultat[7].etat_bloquer);
        objet_code(sapin_marker, resultat[7].id,tableau_marker,  zoomedLayer, resultat[7].etat_bloquer);
    })

    //Bière - bloquée par un code :
    biere_marker.on('click',function (e){ 
        sapin_marker.closePopup();
        objet_a_decoder(biere_marker, resultat[8].id,resultat[8].etat_bloquer ,  tableau_marker, zoomedLayer);
        } ).bindPopup("<b>"+resultat[8].name+"</b> <br>Indice : "+resultat[8].indice+"</b>");

    //Mickey - bloqué par objet et libère objet :
    mickey_marker.on('click',function (e){ 
        biere_marker.closePopup();
        objet_liberation(mickey_marker, resultat[9].id,tableau_marker,  zoomedLayer, resultat[9].etat_bloquer) } ).bindPopup("<b>"+resultat[9].name+"</b> <br>Indice : "+resultat[9].indice+"</b>");
    
    //Masque - affiche info :
    masque_marker.on('click',function (e){
        mickey_marker.closePopup();
        masque_marker.bindPopup("<b>"+resultat[10].name+"</b> <br>"+resultat[10].indice+"</b>").openPopup();
    })
    //Masque - objet récupérable :
    masque_marker.on('contextmenu',function(event) {
        event.originalEvent.preventDefault();
        masque_marker.closePopup();
        masque_marker.bindPopup("<b>"+resultat[10].name+" a été mis dans ta valise.</b> <br> Va maintenant t'amuser à Disney !").openPopup();
        //Ajout du masque dans la valise :
        gestionvalise('Masque');
        //On désactive le masque
        masque_marker.setOpacity(0);
        masque_marker.off('contextmenu');
        //Ferme popup précédent :
        mickey_marker.closePopup();
        //Mise à jour de l'état de l'objet que bloque la clé: il est débloqué et eventListener "click" est désactivé :
        tableau_marker[ resultat[10].id_objet_liberer -1 ].off('click');
        resultat[9].etat_bloquer = false; 
    })

    //Mise à jour de l'état 'bloquer' de mickey :
    mickey_marker.on('contextmenu',function(event) { 
        event.originalEvent.preventDefault();
        if(resultat[9].etat_bloquer == false){
            //On supprime le marker :
            masque_marker.closePopup();
            map.removeLayer(masque_marker);
            //On enlève la clé de la valise :
            gestionvalise('Masque');
            //Libération de l'objet suivant suite au débloquage de l'objet :
            mickey_marker.closePopup();
            objet_liberation(mickey_marker, resultat[9].id,tableau_marker,  zoomedLayer, resultat[9].etat_bloquer);
        }
    });

    //Un clic sur les tulipes arrête le chrono et ouvre la fenêtre de fin (cf fonction stop()).
    tulipe_marker.addEventListener('click', stop);

    //GESTION AFFICAHGE DES MARQUEURS : Les marqueurs sont affichés ou pas en fonction du zoom :
    map.on("zoomend", function(e){
        console.log(map.getZoom());
        if(map.getZoom() < resultat[0].zoom) {
            map.removeLayer(startLayer);
            
        }else if (map.getZoom() > resultat[0].zoom) {
            startLayer.addTo(map);
        }
        if(map.getZoom() < resultat[1].zoom) {
            map.removeLayer(zoomedLayer);
        } else if (map.getZoom() > resultat[1].zoom) {
            zoomedLayer.addTo(map);
        }
    });
    });

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
        streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

    var map = L.map('map', {
        center: [ resultat.latitude, resultat.longitude], //On centre la carte sur les coordonnées du premier objet.
        zoom: 10 ,
        layers: [streets, zoomedLayer, startLayer]
    });

    var baseLayers = {
        "Streets": streets,
        "Grayscale": grayscale,
    };

    L.control.layers(baseLayers).addTo(map); 
}
           
           
//__________________________FONCTIONS_DE_GESTION_DES_OBJETS_____________________________

//____L'objet est un code : on affiche le code quand on clique dessus
function objet_code(objet, id,tableau_marker,  zoomedLayer, etat){
    //Requête AJAX de type post sur le fichier PHP en envoyant la valeur actuelle de la saisie :
    fetch('objet_base.php', {
        method: 'post'//,
      })
      .then(resultat => resultat.json())
      .then(resultat => {
              
       name = resultat[id-1].name; 
       indice = resultat[id-1].indice; 
       code = resultat[id-1].code

       id_bloquant = resultat[id-1].id_bloquant;
       objet_bloquant = resultat[id_bloquant-1].name;

       id_liberation  = resultat[id-1].id_objet_liberer;
       //Test if l'objet est debloqué alors on affiche le code sinon on affiche l'objet qui le bloque
        if (etat == false){//Objet débloqué
            //On met à jour le popup de l'objet débloqué
            objet.bindPopup("<b>" +name+" </b> <br>Objet debloqué grâce à "+objet_bloquant +" ! </br> <br>Indice : "+indice+"</b> <br>Code : "+code +"</br> ", {closeOnClick: false, autoClose: false}).openPopup();
              /*        
            if (resultat[id-1].liberation == true){
                objet_liberation(objet, id, tableau_marker, zoomedLayer);
            }
            */
        }
        else{//Objet bloqué
            if(id ==5 || id==10){//Cas d'un objet bloqué par un objet pas encore visible sur la carte (Bouteille et Mickey)
                objet.bindPopup("<b>" +name+" </b> <br>Mince... Je suis bloqué par : "+objet_bloquant+"</b> <br></b> <br>"+resultat[id-1].indice_objet_bloquant+"</br> ", {closeOnClick: false, autoClose: false}).openPopup();
                tableau_marker[id_liberation-1].addTo(zoomedLayer);
            }
            else{//Cas d'un objet bloqué par un objet déjà visible sur la carte
                objet.bindPopup("<b>" +name+" </b> <br>Mince... Je suis bloqué par : "+objet_bloquant+"</br> ", {closeOnClick: false, autoClose: false}).openPopup();
            }
        }
    });
}

//__________Objet libérant un autre objet
function objet_liberation(objet, id, tableau_marker, zoomedLayer, etat){
    var objet_id = new FormData();
    objet_id.append('code' , 5);

    //Requête AJAX de type post sur le fichier PHP en envoyant la valeur actuelle de la saisie :
    fetch('objet_base.php', {
        method: 'post',
        body : objet_id
    })
    .then(resultat => resultat.json())
    .then(resultat => {
    name = resultat[id-1].name;
    //Test if : si l'objet est debloqué alors on affiche le code sinon on affiche l'objet qui le bloque
    if (etat == false || id == 6){ //Objet débloqué ou cas du "Crous" (libérationau même endroit)
        id_objet_liberer = resultat[id-1].id_objet_liberer;
        
        //Libération d'un deuxième objet si l'objet en paramètre possède un 2e objet à libérer de renseigné (cas de l'objet "mickey") :
        if (resultat[id-1].id_objet_liberer_2 !=0){
            tableau_marker[resultat[id-1].id_objet_liberer_2-1].addTo(zoomedLayer);
            tableau_marker[id-1].bindPopup("<b>"+name+"</b> <br>Indice : "+resultat[id-1].indice+"</b>").openPopup();
        }

        //Objet récuperable : nouvel objet au même endroit :
        if (resultat[id-1].recuperable == true){
            tableau_marker[resultat[id-1].id_objet_liberer-1].addTo(zoomedLayer);
            tableau_marker[id-1].bindPopup("<b>"+name+"</b> <br>"+resultat[id-1].indice+"</b>").openPopup();
        }
        else{
            if(id==6){ //AJout de l'objet suivant sans popup car au meme endroit (cas du "Crous")
                tableau_marker[id_objet_liberer-1].addTo(zoomedLayer);
            }
            else{ //Cas simple d'un objet libérant une nouvel objet à un endroit différent
                tableau_marker[id_objet_liberer-1].addTo(zoomedLayer);
                tableau_marker[id-1].bindPopup("<b>"+name+"</b> <br> "+resultat[id-1].indice+"</b>").openPopup(); 
           }
        }
    }
    else{//objet bloqué
        if (id != 6){
            id_bloquant = resultat[id-1].id_bloquant;
            nom_objet_bloquant = resultat[id_bloquant-1].name;
            
            if (id==10){//Objet bloqué affiche un popup avec l'indice de l'objet le débloquant et libère l'objet le bloquant: cas de l'objet "Mickey"
                objet.bindPopup("<b>" +name+" </b> <br>Bloqué par : "+nom_objet_bloquant+"</b> <br></b> <br>"+resultat[id-1].indice_objet_bloquant+"</br> ", {closeOnClick: false, autoClose: false}).openPopup();
                id_objet_liberer = resultat[id-1].id_objet_liberer;
                tableau_marker[id_objet_liberer-1].addTo(zoomedLayer);
            }
            else{//Objet bloqué affiche un popup avec l'indice de l'objet le débloquant
            objet.bindPopup("<b>" +name+" </b> <br>Bloqué par : "+nom_objet_bloquant+"</br> ").openPopup();
            }
        }
    }
    })
};

//________L'OBJET EST BLOQUÉ PAR UN CODE 
function objet_a_decoder(objet, id,  etat, tableau_marker, zoomedLayer){

    //1-On appelle l’API en AJAX pour connaitre l’objet code et afficher l’indice 
    //Requête AJAX de type post sur le fichier PHP en envoyant la valeur actuelle de la saisie
    fetch('objet_base.php')
        .then(resultat => resultat.json())
        .then(resultat => {
            objet_bloquant = resultat[id-1].id_bloquant ;
            nom_objet_bloquant = resultat[objet_bloquant-1].name;
            name = resultat[id -1].name;
            //On recupère le code dévérouillant l'objet :
            code_bon =resultat[objet_bloquant-1].code;
            
            //Test if objet débloqué
            if (etat == false) { 
                objet.bindPopup("<b>" + name + " </b> <br>Objet débloqué, vous pouvez maintenant saisir le code ci-dessous pour débloquer l'objet suivant et continuer la quête.</br> ").openPopup();
            //On crée un formulaire pour taper le code
                formulaire_code(code_bon, objet, id, tableau_marker, zoomedLayer);
            }
            else {
                //Mise à jour du popup de l'objet : on met le nom de l'objet qui le bloque et qui contient le code à taper.
                objet.bindPopup("<b>" + name + " </b> <br>Bloqué par : " + nom_objet_bloquant + "</b> <br>Indice : "+resultat[id -1].indice_objet_bloquant+"</br>", { closeOnClick: false, autoClose: false }).openPopup();
            }
        });
}

function formulaire_code(code_bon, objet, id, tableau_marker, zoomedLayer){
    //On lance la vérification du formulaire lors de l'envoi du formulaire "submit" :
    form_code.addEventListener('submit', function(event){ valider(event,  code_bon, objet, id,tableau_marker, zoomedLayer)} );
    form_code.style.visibility = "visible";
};
//On récupère le formulaire par son Id :
var form_code = document.getElementById("codeobjet");

//Fonction suite à la validation du formulaire : teste le code saisie et débloque en conséquence l'objet ou non
function valider (event, code_bon, objet, id,tableau_marker, zoomedLayer) {
    //On récupère le code :
    var champ_code = form_code.elements["code"];

    // Au final, on empêche l'envoi du formulaire si form_OK est faux
    event.preventDefault();
    
    //On vérifie les données envoyées lors de la validation : si le champ ne contient pas le bon nombre de caractères, le code saisi est alors refusé
    var taille = code_bon.toString().length;
    if(champ_code.value.length == taille) {
        //4-On valide ou non
        //On recupère la saisie du formulaire et on teste si le code saisi est correct :
        code_saisie = champ_code.value; 
            
        if (code_saisie == code_bon){
            //On débloque l'objet : 
            etat = false;
            objet.closePopup();
            objet_liberation(objet, id, tableau_marker, zoomedLayer, etat);
            form_code.style.visibility = "hidden"; //On cache le formulaire car on n'en a plus besoin
        }
        else{
            alert("Le code est incorrect, essaie encore.");
        }
    }
    if(champ_code.value.length != taille){// || champ_code.value==""){
        console.log(code_saisie, champ_code);
        objet.bindPopup("Le code saisi est NON valide, essaie de nouveau.").openPopup;
    }
};
        
    
//______________GESTION DU CHRONO
function update_chrono() {
    s += 1;
    if(s == 60) { s=0; mn+=1; }
    timer.innerHTML = mn +" min " + s +" s ";
    return [mn, s]
};

function stop() {
    //on recupère le chrono final puis on le stop
    score_final = update_chrono();
    millis = Date.now() - start_time;
    stop_time = Math.floor(millis / 1000);
    clearInterval(t);
    document.addEventListener("DOMContentLoaded", function(event) {
        //btn_start.disabled = false;
    });
    //On ouvre la fenêtre de victoire
    window.open(
        //"bravo.php?min="+score_final[0]+"&sec="+score_final[1],
        "bravo.php?nb_sec="+stop_time,
        "",
        "location=0,menubar=0,status=0,scrollbars=0,menubar=0,top=100,left=100,width=870,height=600"
    );
};

//____________GESTION DES OBJETS RÉCUPÉRABLES
var tab_obj_stockes = [];
var cle_valise = document.getElementById("img_cle");
var lunettes_valise = document.getElementById("img_lunettes");
var masque_valise = document.getElementById("img_masque");

function initElement() {
    cle_valise.onclick = function() {gestionvalise('Clé');};
    lunettes_valise.onclick = function() {gestionvalise('Lunettes de soleil');};
    masque_valise.onclick = function() {gestionvalise('Masque');};
};

function gestionvalise(objet) {
//Gère l'ajout ou l'enlèvement des objets récupérable en focntion de s'il sont présent ou non dans la valise lors de l'appel de cette fonction
    //Requête AJAX de type post sur le fichier PHP en envoyant la valeur actuelle de la saisie
    fetch('objet_base.php')
      .then(resultat => resultat.json())
      .then(resultat => {
          resultat.forEach(element => {
            var obj_present = tab_obj_stockes.find(element => element.name == objet);
            if (element.name == objet && element.recuperable && obj_present != undefined) {
                //L'objet récupérable est déjà présent dans la valise
                enleve_valise(element,obj_present );
            };
            if(element.name == objet && element.recuperable && obj_present == undefined) {
                //L'objet récupérable n'est pas encore dans la valise
                ajout_valise(element);
            }; 
          });
      })
};

function ajout_valise(objet) {
    //On ajoute l'objet à la liste "valise"
    tab_obj_stockes.push(objet);
    //On le rend visible dans la valise
    if (objet.name == 'Clé') {cle_valise.style.visibility = "visible";};
    if (objet.name == 'Lunettes de soleil') {lunettes_valise.style.visibility = "visible"};
    if (objet.name == 'Masque') {masque_valise.style.visibility = "visible"};

    objet.recupere = true;
};

function enleve_valise(objet, obj_present) {
    //On enlève l'objet de la "valise"
    for (i=0; i<tab_obj_stockes.length; i++) {
        if (tab_obj_stockes[i]==obj_present){
            tab_obj_stockes.splice(i, 1);
        }
    }
    //On rend l'objet retié invisible dans la valise
    if (objet.name == 'Clé') {cle_valise.style.visibility = "hidden";};
    if (objet.name == 'Lunettes de soleil') {lunettes_valise.style.visibility = "hidden";};
    if (objet.name == 'Masque') {masque_valise.style.visibility = "hidden";};
    objet.recupere = false;
};
