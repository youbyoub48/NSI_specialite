function Bouton(){
    for (let i=0; i<9; i++){
        // crée un nouvel élément div
    var newDiv = document.createElement("button");
    // et lui donne un peu de contenu
    var newContent = document.createTextNode('NSI');
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);

    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById('div1');
    document.body.insertBefore(newDiv, currentDiv);
    }
}

function readTextFile(file, callback) {
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
    readTextFile("./data.json", function(text){
        var data = JSON.parse(text);
        console.log(data);
    });
}