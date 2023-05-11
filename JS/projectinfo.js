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


const urlParams = new URLSearchParams(window.location.search);
const greetingValue = urlParams.get('project');

var projNo = (projectIDs.indexOf(greetingValue));


var noImages = xmlDoc.getElementsByTagName("no_of_images")[projNo].childNodes[0].nodeValue;

for (let i = 0; i < noImages; i++){
  const image = document.createElement('img');
  var projectPhoto = "../img/" + projectIDs[projNo] + "/" + i + ".jpg";
  image.setAttribute('src',projectPhoto);
  image.style.width = '100%';
  var ul = document.getElementsByClassName("slider-container")[0];
  var li = document.createElement('li');
  li.appendChild(image)
  ul.appendChild(li)
}
document.getElementsByClassName("attr-value")[0].textContent =
xmlDoc.getElementsByTagName("title_of_project")[projNo].childNodes[0].nodeValue;

document.getElementsByClassName("attr-value")[1].textContent =
xmlDoc.getElementsByTagName("keywords_of_project")[projNo].childNodes[0].nodeValue;

document.getElementsByClassName("attr-value")[2].textContent =
xmlDoc.getElementsByTagName("country_of_contribution")[projNo].childNodes[0].nodeValue;

document.getElementsByClassName("attr-value")[3].textContent =
xmlDoc.getElementsByTagName("primary_SDG")[projNo].childNodes[0].nodeValue;
 
document.getElementsByClassName("attr-value")[4].textContent =
xmlDoc.getElementsByTagName("credits_for_project")[projNo].childNodes[0].nodeValue;

var Affiliation = xmlDoc.getElementsByTagName("Affiliation")[projNo].childNodes[0].nodeValue
Affiliation = Affiliation.replaceAll('_', ' ')
document.getElementsByClassName("attr-value")[5].textContent = Affiliation;

document.getElementsByClassName("attr-value")[6].textContent =
xmlDoc.getElementsByTagName("year_of_project")[projNo].childNodes[0].nodeValue;

var category_of_contribution = xmlDoc.getElementsByTagName("category_of_contribution")[projNo].childNodes[0].nodeValue
category_of_contribution = category_of_contribution.replaceAll('_', ' ');
document.getElementsByClassName("attr-value")[7].textContent = category_of_contribution;

var climate_hazard = xmlDoc.getElementsByTagName("climate_hazard")[projNo].childNodes[0].nodeValue;
climate_hazard = climate_hazard.replaceAll(" ",", ");
document.getElementsByClassName("attr-value")[8].textContent = climate_hazard

document.getElementsByClassName("message-of-hope")[0].innerHTML =
"'"+xmlDoc.getElementsByTagName("synopsis_of_project")[projNo].childNodes[0].nodeValue+"'";

document.getElementsByClassName("project-description")[0].innerHTML =
xmlDoc.getElementsByTagName("description_of_project")[projNo].childNodes[0].nodeValue;

var extra_links = xmlDoc.getElementsByTagName("extra_links")[projNo].childNodes[0].nodeValue

if (extra_links == "NA"){
   //pass
} else{
  document.getElementsByClassName("extra-links")[0].innerHTML = '<a href="'+extra_links+'">'+extra_links+'</a>';
}


// ==== MAP JS POP UP ==== //
var currentLat = xmlDoc.getElementsByTagName("lat")[projNo].childNodes[0].nodeValue;
var currentLong = xmlDoc.getElementsByTagName("long")[projNo].childNodes[0].nodeValue;

var map = L.map('map').setView([currentLat,currentLong], 7.5);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 10,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


function clickZoom(marker) {
  map.setView(marker.target.getLatLng(),10);
}

function closeZoom(marker){
  map.setView(marker.target.getLatLng(),7.5);
}

function addMarker(map,lat,long,projectName,projectDesc,projectLink) {
    var marker = L.marker([lat,long])
    .addTo(map)
    .bindPopup('<a href ='+projectLink+'><h2>'+projectName+"</h2></a><p>"+projectDesc, {maxWidth:"300"})
    .on('click',clickZoom)
    .getPopup().on('remove',closeZoom)
}

for (let i = 0; i < x.length; i++){
  var lat = xmlDoc.getElementsByTagName("lat")[i].childNodes[0].nodeValue;
  var long = xmlDoc.getElementsByTagName("long")[i].childNodes[0].nodeValue;
  var projectName  = xmlDoc.getElementsByTagName("title_of_project")[i].childNodes[0].nodeValue;
  var projectDesc  = xmlDoc.getElementsByTagName("synopsis_of_project")[i].childNodes[0].nodeValue;
  var projectLink = "projectinfo.html?project="+projectIDs[i]
  addMarker(map,lat,long,projectName,projectDesc,projectLink)
}