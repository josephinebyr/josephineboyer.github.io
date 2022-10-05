var map = L.map('map').setView([47.829, 1.939], 7);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var icon_cpge = L.icon({iconUrl: './img/pins/pothier.png', iconSize:[80, 100], iconAnchor:[40,100], popupAnchor:[0,-100] });
var marker_cpge = L.marker([47.907958844650274, 1.9091331674268879], {icon: icon_cpge}).addTo(map);
marker_cpge.bindPopup("CPGE Lycée Pothier - 2017-2019<br>MPSI PSI")

var icon_ensg = L.icon({iconUrl: './img/pins/ensg.png', iconSize:[80, 100], iconAnchor:[40, 100], popupAnchor:[0,-100] });
var marker_ensg = L.marker([48.84103889363869, 2.5874391839631943], {icon: icon_ensg}).addTo(map);
marker_ensg.bindPopup("ENSG - 2019-2022<br>Diplôme d'ingénieur en géomatique<br><a href='https://ensg.eu' target='_blank'>ensg.eu</a>");

var icon_ciril = L.icon({iconUrl: './img/pins/ciril.png', iconSize:[80, 100], iconAnchor:[40, 100], popupAnchor:[0,-100] });
var marker_stage_pluri = L.marker([45.78449488566238, 4.888224147972327], {icon: icon_ciril}).addTo(map);
marker_stage_pluri.bindPopup("Ciril Group - 2021<br>Stage pluridisplinaire développement d'application<br><a href='https://www.business-geografic.com/fr/' target='_blank'>business-geografic.com</a>");

var icon_brgm = L.icon({iconUrl: './img/pins/brgm.png', iconSize:[80, 100], iconAnchor:[40, 100], popupAnchor:[0, -100] });
var marker_brgm = L.marker([47.829, 1.939], {icon: icon_brgm}).addTo(map);
marker_brgm.bindPopup("BRGM - 2022<br>Stage de fin d'études<br><a href='https://www.brgm.fr' target='_blank'>brgm.fr</a>");

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
  }
