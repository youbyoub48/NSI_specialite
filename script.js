function Bouton(){
    var conteneur = document.createElement("div")
    conteneur.className = "conteneur";
    document.body.appendChild(conteneur);
    var compteur = 1;
    var indice = 1;

    for (const element in data) {
        console.log(compteur)
        if (compteur == 1) {
            var temp = document.createElement("div");
            temp.id = indice;
            temp.className = "boite"
            conteneur.appendChild(temp)
        }

        // crée un nouveau bouton
        var newButton = document.createElement("button");
        // texte du bouton
        var newTexte = document.createTextNode(element);
        // ajoute le nœud texte au nouveau bouton créé
        newButton.appendChild(newTexte);
        // on lui donne la id du nom de la spe
        newButton.id = element;
        newButton.className = "button";

        newButton.onclick = function() {
            var class_ = this.className
            
            if (class_ != "supr") {
                this.className = "choisie";
                // id de l'element
                var idElt = this.getAttribute('id');
                console.log(idElt);
                choisie.push(idElt);
                console.log(choisie);
                deuxieme_Choix(idElt);
            }
        }
        
        // ajoute le bouton au body du html
        temp.appendChild(newButton);
        compteur = compteur+1;

        if (compteur == 4) {
            indice = indice+1;
            compteur = 1;
        }
    }
}

function readTextFile(file, callback) { // cette fonction sert a récuperer les données d'un fichier json
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function Lecture(){
    readTextFile("./data.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de data.json
        data = JSON.parse(text); // on mets le contenue de data.json dans la variable data
        console.log(data); // on print la variable data pour voir si tout marche bien
        choisie = []
        console.log(choisie)
        Bouton();
    });
}

function Liste_Spe(){
    for (const element in data) {
        console.log(element);
    }
}

function deuxieme_Choix(id) {
    var liste_choix_possible = [];
    var check;
    
    if (choisie.length == 1) {
        var choix_possible = data[id];
        console.log(choix_possible);
        for (const element in choix_possible) {
            liste_choix_possible.push(element);
        }

        for (const element in data) {
            check = liste_choix_possible.includes(element);
            if (check == false && element != id) {
                console.log(element);
                var suprimer = document.getElementById(element);
                suprimer.className = "supr";
            }
        }
    }

    if (choisie.length == 2) {
        var choix_possible = data[choisie[0]];
        var choix_possible_2 = choix_possible[id];

        for (const element in choix_possible) {
            check = choix_possible_2.includes(element);
            if (check == false && element != id) {
                console.log(element);
                var suprimer = document.getElementById(element);
                suprimer.className = "supr";
            }
        }
        console.log(choix_possible_2);

    }

    if (choisie.length == 3) {
        for (const element in data) {
            check = choisie.includes(element)
            if (check == false) {
                var suprimer = document.getElementById(element);
                suprimer.className = "supr";
            }
        }
    }
}