const selectrepas = document.getElementById("repas");
const selectaliment = document.getElementById("aliments");
const groupeAliment = document.getElementById("groupeAliment");
const tableBody = document.querySelector("#tabledata tbody");

let datajson = {};

function maj_optn_slct(data) {
    for (let key1 in data) {
        const option1 = document.createElement("option");
        option1.value = key1;
        option1.textContent = key1;
        selectrepas.appendChild(option1);
        if (key1 === "REPAS PRINCIPAUX") {
            for (let key2 in data[key1]) {
                const option2 = document.createElement("option");
                option2.value = key2;
                option2.textContent = key2;
                selectaliment.appendChild(option2);
            }
        }
    }
}

function recup_data_maj_liste() {
    fetch("./data/dataGrammage.json")
        .then(response => response.json())
        .then(data => {
            datajson = data;
            maj_optn_slct(data);
        })
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON:', error);
        });
}

function affichage_liste() {
    if (selectrepas.value === "REPAS PRINCIPAUX") {
        groupeAliment.style.display = 'block';
    } else {
        groupeAliment.style.display = 'none';
    }
    recup_data_maj_tableau();
}

function ajout_ligne(tableau, Nom, valeur1, valeur2, valeur3) {
    const newRow = tableau.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.textContent = Nom;
    cell2.textContent = valeur1;
    cell3.textContent = valeur2;
    cell4.textContent = valeur3;
}

function maj_tableau(data) {
    tableBody.innerHTML = '';
    const key = selectrepas.value;
    if (key === "PETIT DEJEUNER, GOUTER, COLLATION") {
        for (let alim in data[key]) {
            ajout_ligne(tableBody, alim, data[key][alim][0], data[key][alim][1], data[key][alim][2]);
        }
    } else if (key === "REPAS PRINCIPAUX") {
        const type = selectaliment.value;
        if (type === "Pain") {
            ajout_ligne(tableBody, type, data[key][type][0], data[key][type][1], data[key][type][2]);
        } else if (data[key] && data[key][type]) {
            for (let alim in data[key][type]) {
                ajout_ligne(tableBody, alim, data[key][type][alim][0], data[key][type][alim][1], data[key][type][alim][2]);
            }
        }
    }
}

function recup_data_maj_tableau() {
    fetch("./data/dataGrammage.json")
        .then(response => response.json())
        .then(data => maj_tableau(data))
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON:', error);
        });
}

recup_data_maj_liste();
selectrepas.addEventListener('change', affichage_liste);
selectaliment.addEventListener('change', recup_data_maj_tableau);
