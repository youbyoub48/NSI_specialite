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

function Lecture(){
    $.get("data.json", function(data){
        console.log(data);
        //console.log(data["file_1"]["author"]);
        });
}
