//Fonction d'initialisation.
function init(){
	hide('gameScreen');
	show('loginScreen');
	$('map').innerHTML      = "";
	$('btnLogin').onclick 	= login;
	$('btnLogout').onclick 	= logout;
	$('btnBack').onclick    = back;
}

//Connexion
function login(){
	
	function login_cb(str) {
		if (str == "ok") {
            hide('loginScreen');
			show('gameScreen');
			show('map');
			hide('btnBack');
			hide('view');
			$('titreGameScreen').innerHTML = "Carte";
			RequestLoadMap();
        }
		else{
			window.alert("Pseudo ou mot de passe invalide !");
		}
        
    }
	var login = $('fieldLogin').value;
	var passwd = $('fieldPasswd').value;
	
	if (login != "" || passwd != "") {
        var xhr=getXHR();
		var param = "login="+ login + "&passwd=" + passwd;
		xhr.onreadystatechange= function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					login_cb(xhr.responseText);
				}
			}
		};
		xhr.open("POST","scripts/login.php",true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(param);
    }
	else{
		window.alert("Pseudo ou mot de passe invalide !");
	}
}

//Déconnexion
function logout(){
	$('map').innerHTML = "";
	hide('gameScreen');
	show('loginScreen');
	//$('view').innerHTML = "";
	$('titreGameScreen').innerHTML = "";
}

//Retour vers la carte.
function back(){
	show('map');
	hide('view');
	hide('btnBack');
	$('titreGameScreen').innerHTML = "Carte";
}

//Affiche la carte choisie et lance une requête pour récupérer les informationde la base de données.
function choseMap(x, y){
	hide('map');
	show('view');
	show('btnBack');
	$('btnBack').style.display = 'inline';
	$('titreGameScreen').innerHTML = "Village";
	var xhr=getXHR();
	var param = "x="+ x + "&y=" + y;
	xhr.onreadystatechange= function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				villageInfo_cb(xhr.responseText);
			}
		}
	};
	xhr.open("GET","scripts/village.php?"+param,true);
	xhr.send(null);
	
}

//Injecte les information du village
function villageInfo_cb(str){
	tabRes = str.split(",");
	$('townInfo').innerHTML = "<p>Joueur : " + tabRes[0] + "</p><p>Couleur : " + tabRes[1] + "</p><p>Position : ("+tabRes[2]+","+tabRes[3]+")</p>"
	
}

//Génére un tableau avec le contenue de map.txt et appelle la fonction de génération de la carte.
function loadMap_cb(str) {
	var tabMap 	= new Array();
	var tempMap = str.split("|");

	for(var i = 0 ; i <  tempMap.length ;i++){
		tabMap[i] = tempMap[i].split(",");
	}
	genMap(tabMap);
}

//Requête AJAX qui lit le contenu la carte d'un fichier texte.
function RequestLoadMap() {
	var xhr=getXHR();
	xhr.onreadystatechange= function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				loadMap_cb(xhr.responseText);
			}
		}
	};
	xhr.open("GET","scripts/map.php",true);
	xhr.send(null);
}

//Fonction génératrice pour l'evenement du choix de la carte.
function genEventMap(x, y){
	return function() { choseMap(x,y); };
}

//Closure.
//Génére la carte.
function genMap(tabMap){
	$('map').innerHTML = "";
	//$('map').style.width = ((tabMap[0].length*75)+25+100) + "px";
	//$('map').style.height = ((tabMap.length*86)+43+10) + "px";
	$('map').style.width ="850px";
	$('map').style.height ="1050px";
	
	for (var i = 0 ; i < tabMap.length ; i++) {
		for (var j = 0 ; j < tabMap[0].length ; j++) {
			var div = document.createElement('div');
			$('map').appendChild(div);
			
			//Styles
			div.className = "caseMap";
			div.style.left = (j*75+120) + "px";
			div.style.top=(i*86+(j%2)*43+70) + "px";
			div.style.background = 'url("img/hex' + tabMap[i][j] + '.png")';
			
			//Ne crée pas d'évènement si il n'y a pas de village
			if (tabMap[i][j]!= "") {
               div.onclick = genEventMap(i,j); //Créé un nouveau contexte à chaque appel à la fonction genEventMap()
            }
		};
	};
}

//Lance la fonction init quand la fenêtre est chargée.
window.onload = init;
