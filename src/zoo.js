const API_BASE = "http://localhost:3000/";

export default class Zoo {

    constructor() {

    }

    getAnimals() {
        fetch(API_BASE + "zvirata")
            .then(response => response.json())
            .then(data => {
                this.showAnimals(data);
            });
    }

    showAnimals(data) {
        let zvirata = document.getElementById("zvirata");
        let html = "";

        data.forEach(zvire => {
            //přes data-id si můžu přidat id prvku z databáze

            html += `
            <div class="zvire" data-id="${zvire.id}">
                <div class="zvire__foto">
                    <img src="images/${zvire.foto}" alt="${zvire.nazev}">
                </div>
                    <div class="zvire__popis">
                    <div class="zvire__nazev">${zvire.nazev}</div>
                    <div class="zvire__latinsky">${zvire.nazevLatinsky}</div>
                </div>
            </div>`;
        });

        zvirata.innerHTML = html;

        //querySelectorAll vybírá všechny prvky, které odpovídají tomu výběru
        //přidáme reakci na kliknutí 

        let tlacitka = document.querySelectorAll(".zvire");

        tlacitka.forEach(tlacitko => {
            //uvnitř arrow function se nemění context .this 
            //this je pořád stejné jako jinde => this = třída
            tlacitko.addEventListener("click", (e) => {
                this.animalClick(e);
            });
        });

    }

    animalClick(e) {
        //e - prvek na který se kliklo, nese nějaké data, které má nějaké id
        let id = e.target.dataset.id;
        this.getAnimal(id);
    }

    getAnimal(id) {
        fetch(API_BASE + "zvirata/" + id)
        .then(response => response.json())
        .then(data => {
            this.showAnimal(data);
        });
    }

    showAnimal(data) {
        console.log(data);
    }
}
