function Bouton(){
    for (const element in data) {
    // crée un nouveau bouton
    var newButton = document.createElement("button");
    // texte du bouton
    var newTexte = document.createTextNode(element);
    // ajoute le nœud texte au nouveau bouton créé
    newButton.appendChild(newTexte);
    // on lui donne la id du nom de la spe
    newButton.id = element;
    newButton.className = "button"

    newButton.onclick = function() {
        this.className = "choisie"
        // id de l'element
        var idElt = this.getAttribute('id');
        console.log(idElt);
        choisie.push(idElt)
        console.log(choisie)
        deuxieme_Choix(idElt);
        }
    
    // ajoute le bouton au body du html
    document.body.appendChild(newButton)
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
        Liste_Spe();
        Bouton();
    });
}

function Liste_Spe(){
    for (const element in data) {
        console.log(element);
    }
}

function deuxieme_Choix(id) {
    var choix_possible = data[id];
    console.log(choix_possible);
    var liste_choix_possible = [];
    for (const element in choix_possible) {
        liste_choix_possible.push(element);
    }
    var check;
    for (const element in data) {
        check = liste_choix_possible.includes(element);
        if (check == false && element != id) {
            console.log(element);
            var suprimer = document.getElementById(element);
            suprimer.remove();
        }
    }
}