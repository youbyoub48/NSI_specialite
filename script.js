function Bouton(){  // C'est la fonction principale du programme qui va inisialiser toute l'interface graphique

    // On récupere la div qui va contenir tout nos élément
    var conteneur = document.getElementById("conteneur");

    // On crée la div qui va contenir notre programme principale
    var conteneur2 = document.createElement("div");
    conteneur2.id = "conteneur2";
    conteneur.appendChild(conteneur2); // on le rajoute a notre div conteneur

    // On crée la partie ou il y'aura la description de nos spécialités
    var text_description = document.createElement("span");
    var conteneur_texte = document.createElement("div");

    conteneur_texte.className = "texte";
    conteneur.appendChild(conteneur_texte);
    conteneur_texte.appendChild(text_description);
    conteneur_texte.hidden = true

    // déclaration de variables
    var compteur = 0;
    var indice = 1;
    var liste_spe = [];
    var liste_hasard = [];
    var check;

    // on créer une liste des spécialités
    for (const element in data) {
        liste_spe.push(element)
    };

    console.log(liste_spe);

    // cette boucle sert a mettre la liste des spécialités au hasard et a ne pas avoir de doublons
    while (liste_hasard.length != liste_spe.length) { // tant que la taille de liste_hasard n'est pas la même que liste_spe la boucle continura
        // on récupère un élément au hasard de liste_spe
        const random = Math.floor(Math.random() * liste_spe.length);
        check = liste_hasard.includes(liste_spe[random])

        // on verifi qu'il n'y a pas de doublons
        if (check == false) {
            liste_hasard.push(liste_spe[random])
        };
    };

    console.log(liste_hasard);

    for (const i in liste_spe) { // cette boucle crée une interface graphique selon data.json

        if (compteur == 0) { // si le compteur est a zero on créer une div boite qui sera dans conteneur2
            var temp = document.createElement("div");
            temp.id = indice;
            temp.className = "boite";
            conteneur2.appendChild(temp);
        };

        // crée une nouvelle image
        var newImg = document.createElement("img");
        newImg.src = "./image/bleu.png"
        newImg.className = "spe"

        // texte de l'image
        var newTexte = document.createTextNode(liste_hasard[i]);
        var div = document.createElement("div");
        div.className = "contenant"
        var span_text = document.createElement("span");
        span_text.appendChild(newTexte)
        span_text.className = "texte_centrer"
        newImg.id = liste_hasard[i]; // on lui donne le id du nom de la spe

        newImg.onclick = function() { // cette fonction s'execute si on click sur une des spécialités
            var class_ = this.className;
            
            if (class_ != "spe supr") {
                this.src = "./image/vert.png"; // on met la spécialités en vert
                // id de l'element
                var idElt = this.getAttribute('id'); // on récupere l'id pour pouvoir idenfier la spe
                this.className = "spe supr"; // pour eviter que la fonction s'execute a nouveau si on reclique sur la même spe 

                console.log(idElt);

                choisie.push(idElt); // on ajoute la spe choisie dans la liste choisie

                console.log(choisie);

                deuxieme_Choix(idElt);
            };
        };
        
        newImg.addEventListener("mouseenter", function( event ) { // cette fonction s'execute si on passe la sourie sur notre element
            
            var idElt = this.getAttribute('id');
            text_description.innerHTML = description[idElt]
            conteneur_texte.hidden = false;
        }, false);

        // on ajoute tout nos element dans leur div respective
        div.appendChild(newImg);
        div.appendChild(span_text);
        temp.appendChild(div);
        compteur = compteur+1;

        if (compteur == 3) {
            indice = indice+1;
            compteur = 0;
        };
    };
};

function readTextFile(file, callback) { // cette fonction sert a récuperer les données d'un fichier json
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        };
    };
    rawFile.send(null);
};


function Lecture(){ // Ceci est la première fonction appeler dans notre progamme
    
    // lecture du fichier description.json
    readTextFile("./json/description.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de description.json
        description = JSON.parse(text); // on mets le contenue de description.json dans la variable description
    });

    // lecture du fichier domaine.json
    readTextFile("./json/domaine.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de domaine.json
        domaine = JSON.parse(text); // on mets le contenue de domaine.json dans la variable domaine
    });

    readTextFile("./json/data.json", function(text){ //on appelle la  fonction readTextFile pour récupérer le contenu de data.json
        data = JSON.parse(text); // on mets le contenue de data.json dans la variable data
        console.log(data); // on print la variable data pour voir si tout marche bien
        choisie = []; // on déclare la liste choisie en variable globale pour stocker les choix de spécialités 
        Bouton();
    });
};

function deuxieme_Choix(id) {
    var liste_choix_possible = [];
    var check;
    
    if (choisie.length == 1) {
        var choix_possible = data[id];
        console.log(choix_possible);
        for (const element in choix_possible) {
            liste_choix_possible.push(element);
        };

        for (const element in data) {
            check = liste_choix_possible.includes(element);

            if (check == false && element != id) {
                console.log(element);
                var suprimer = document.getElementById(element);
                suprimer.className = "spe supr";
                suprimer.src = "./image/rouge.png"; // on met l'image en rouge
            };
        };
    };

    if (choisie.length == 2) {
        var choix_possible = data[choisie[0]];
        var choix_possible_2 = choix_possible[id];

        for (const element in choix_possible) {
            check = choix_possible_2.includes(element);

            if (check == false && element != id) {
                console.log(element);
                var suprimer = document.getElementById(element);
                suprimer.className = "spe supr";
                suprimer.src = "./image/rouge.png"; // on met l'image en rouge
            };
        };
        console.log(choix_possible_2);

    };

    if (choisie.length == 3) {
        for (const element in data) {
            check = choisie.includes(element)

            if (check == false) {
                var suprimer = document.getElementById(element);
                suprimer.className = "spe supr";
                suprimer.src = "./image/rouge.png"; // on met l'image en rouge
            };
        };

        var premier = domaine[choisie[0]]
        var deuxieme = premier[choisie[1]]
        var debouche = deuxieme[choisie[2]]
        console.log(deuxieme)
        console.log(debouche)
    };
};