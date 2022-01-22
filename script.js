function Bouton(){
    var conteneur = document.getElementById("conteneur");
    document.body.appendChild(conteneur);
    var conteneur2 = document.createElement("div");
    conteneur2.id = "conteneur2";
    conteneur.appendChild(conteneur2);
    var text_description = document.createElement("span");
    var conteneur_texte = document.createElement("div");
    conteneur_texte.className = "texte";
    conteneur.appendChild(conteneur_texte);
    conteneur_texte.appendChild(text_description);
    conteneur_texte.hidden = true
    var compteur = 1;
    var indice = 1;
    var liste_spe = [];
    var liste_hasard = [];
    var check;

    for (const element in data) {
        liste_spe.push(element)
    }

    console.log(liste_spe)

    while (liste_hasard.length != liste_spe.length) {
        const random = Math.floor(Math.random() * liste_spe.length);
        check = liste_hasard.includes(liste_spe[random])
        if (check == false) {
            liste_hasard.push(liste_spe[random])
        }
    }

    console.log(liste_hasard)

    for (const i in liste_spe) {
        if (compteur == 1) {
            var temp = document.createElement("div");
            temp.id = indice;
            temp.className = "boite";
            conteneur2.appendChild(temp);
        }

        // crée une nouvelle image
        var newImg = document.createElement("img");
        newImg.src = "./4.png"
        newImg.className = "spe"
        // texte de l'image
        var newTexte = document.createTextNode(liste_hasard[i]);
        var div = document.createElement("div");
        div.className = "contenant"
        var span_text = document.createElement("span");
        span_text.appendChild(newTexte)
        span_text.className = "texte_centrer"
        // on lui donne le id du nom de la spe
        newImg.id = liste_hasard[i];

        newImg.onclick = function() {
            var class_ = this.className;
            
            if (class_ != "spe supr") {
                this.src = "./6.png";
                // id de l'element
                var idElt = this.getAttribute('id');
                this.className = "spe supr";
                console.log(idElt);
                choisie.push(idElt);
                console.log(choisie);
                deuxieme_Choix(idElt);
            }
        }
        
        newImg.addEventListener("mouseenter", function( event ) {
            // on met l'accent sur la cible de mouseenter
            var class_ = this.className
            var idElt = this.getAttribute('id');
            text_description.innerHTML = description[idElt]
            conteneur_texte.hidden = false;
        }, false)

        // ajoute le bouton au body du html
        div.appendChild(newImg);
        div.appendChild(span_text);
        temp.appendChild(div);
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

    readTextFile("./description.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de data.json
        description = JSON.parse(text); // on mets le contenue de data.json dans la variable data
    });

    readTextFile("./data.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de data.json
        data = JSON.parse(text); // on mets le contenue de data.json dans la variable data
        console.log(data); // on print la variable data pour voir si tout marche bien
        choisie = []
        Bouton();
    });
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
                suprimer.className = "spe supr";
                suprimer.src = "./5.png"
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
                suprimer.className = "spe supr";
                suprimer.src = "./5.png"
            }
        }
        console.log(choix_possible_2);

    }

    if (choisie.length == 3) {
        for (const element in data) {
            check = choisie.includes(element)
            if (check == false) {
                var suprimer = document.getElementById(element);
                suprimer.className = "spe supr";
                suprimer.src = "./5.png"
            }
        }
    }
}