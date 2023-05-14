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
gsap.from(".main-content .box img", {
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

window.onload = function() {
  console.time();
  var noImages = projectIDs.length;
  for (let i = 0; i < noImages; i++) {
    var imageContainer = document.getElementsByClassName("main-content")[0];

    var newDiv = document.createElement("div");
    newDiv.className = "box";

    var img = document.createElement("img");
    img.src = "../img/" + projectIDs[i] +"/0.jpg";
    img.setAttribute('loading','lazy');
    newDiv.appendChild(img);

    var imgText = document.createElement("div");
    imgText.className = "img-text";

    var contentDiv = document.createElement("div");
    contentDiv.className = "content";
    
    var dynamicLink = document.createElement("a");
    dynamicLink.setAttribute("href","projectinfo.html?project="+projectIDs[i]);
    var header = document.createElement("h2");
    header.innerHTML = xmlDoc.getElementsByTagName("title_of_project")[i].childNodes[0].nodeValue;
    dynamicLink.appendChild(header)
    contentDiv.appendChild(dynamicLink);
    


    var yearOfProj = document.createElement("p");
    yearOfProj.innerHTML = xmlDoc.getElementsByTagName("year_of_project")[i].childNodes[0].nodeValue;
    var country_of_contribution = xmlDoc.getElementsByTagName("country_of_contribution")[i].childNodes[0].nodeValue
    country_of_contribution = country_of_contribution.replaceAll('_', ' ');
    var desc = document.createElement("p");
    desc.innerHTML = 
    xmlDoc.getElementsByTagName("city_of_contribution")[i].childNodes[0].nodeValue+", "+
    country_of_contribution;
    
    contentDiv.append(desc);
    contentDiv.append(yearOfProj);
    
    
    imgText.appendChild(contentDiv);
    newDiv.appendChild(imgText);

    imageContainer.appendChild(newDiv)
  }
  console.timeEnd();
}
