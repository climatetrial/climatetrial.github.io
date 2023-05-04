const 
  navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

// ==== SHOW MENU ==== //
ToggleBtnId.addEventListener("click", () => {
  navId.classList.add("show");
});

// ==== HIDE MENU ==== //
CloseBtnId.addEventListener("click", () => {
  navId.classList.remove("show");
});

// ==== Animate on Scroll Initialize  ==== //
AOS.init();

// ==== GSAP Animations ==== //
// ==== LOGO  ==== //
gsap.from(".logo", {
  opacity: 0,
  y: -10,
  delay: 1,
  duration: 0.5,
});
// ==== NAV-MENU ==== //
gsap.from(".nav_menu_list .nav_menu_item", {
  opacity: 0,
  y: -10,
  delay: 1.4,
  duration: 0.5,
  stagger: 0.3,
});
// ==== TOGGLE BTN ==== //
gsap.from(".toggle_btn", {
  opacity: 0,
  y: -10,
  delay: 1.4,
  duration: 0.5,
});
// ==== MAIN HEADING  ==== //
gsap.from(".main-heading", {
  opacity: 0,
  y: 20,
  delay: 2.4,
  duration: 1,
});
// ==== HERO IMAGE  ==== //
gsap.from(".hero-image", {
  opacity: 0,
  y: 20,
  delay: 2.6,
  duration: 1,
});
// ==== INFO TEXT ==== //
gsap.from(".info-text", {
  opacity: 0,
  y: 20,
  delay: 2.8,
  duration: 1,
});
// ==== CTA BUTTONS ==== //
gsap.from(".btn_wrapper", {
  opacity: 0,
  y: 20,
  delay: 2.8,
  duration: 1,
});
// ==== TEAM IMAGE ==== //
gsap.from(".team_img_wrapper img", {
  opacity: 0,
  y: 20,
  delay: 3,
  duration: 1,
});

// ==== MAP JS POP UP ==== //
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET", "newdata.xml", false);
  xmlhttp.send();
  xmlDoc = xmlhttp.responseXML;

var x = xmlDoc.getElementsByTagName("project");
const projectIDs = [];

for (let i = 0; i < x.length; i++) {
  projectID = x[i].getAttribute("ID");
  projectIDs.push(projectID)
}

// ==== MAP JS POP UP ==== //
var map = L.map('map').setView([27.2,83.95], 4);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 10,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

function clickZoom(marker) {
  map.setView(marker.target.getLatLng(),5);
}

function closeZoom(marker){
  map.setView(marker.target.getLatLng(),2.5);
}

function addMarker(map,lat,long,projectName,projectDesc,projectPhoto,projectLink) {
    var myIcon = L.divIcon({
        className: 'my-div-icon',
        html: "<p>" + projectName + "<p>",
    })
    var marker = L.marker([lat,long],{icon: myIcon})
    .addTo(map)
    .bindPopup('<a href ='+projectLink+'><h2>'+projectName+"</h2></a><p>"+projectDesc+"</p><img src="+projectPhoto+" width='300' height='auto'/>", {maxWidth:"300"})
    .on('click',clickZoom)
    .getPopup().on('remove',closeZoom)
}

for (let i = 0; i < x.length; i++){
  var lat = xmlDoc.getElementsByTagName("lat")[i].childNodes[0].nodeValue;
  var long = xmlDoc.getElementsByTagName("long")[i].childNodes[0].nodeValue;
  var projectName  = xmlDoc.getElementsByTagName("title_of_project")[i].childNodes[0].nodeValue;
  var projectDesc  = xmlDoc.getElementsByTagName("synopsis_of_project")[i].childNodes[0].nodeValue;
  var projectPhoto = "../img/" + projectIDs[i] + "/0.jpg"
  var projectLink = "projectinfoalt.html?greeting="+projectIDs[i]
  addMarker(map,lat,long,projectName,projectDesc,projectPhoto,projectLink)
}