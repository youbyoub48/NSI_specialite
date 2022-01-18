function Bouton(){
    for (const element in data) {
    // crée un nouveau bouton
    var newButton = document.createElement("button");
    // texte du bouton
    var newTexte = document.createTextNode(element);
    // ajoute le nœud texte au nouveau bouton créé
    newButton.appendChild(newTexte);
    // on lui donne la class Bouton
    newButton.className = "Bouton"
    newButton.onclick = Test
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
        Liste_Spe()
        Bouton()
    });
}

function Liste_Spe(){
    for (const element in data) {
        console.log(element)
    }
}


function Test() {
    console.log("marche")
}