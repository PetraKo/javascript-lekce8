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
                this.animalClick(e.target);
            });
        });

    }

    animalClick(element) {
        let prvek = element.closest(".zvire");
        let id = prvek.dataset.id;
        //e - prvek na který se kliklo, nese nějaké data, které má nějaké id
        //let id = e.target.dataset.id;
        this.getAnimal(id);
        //console.log(id);
    }

    getAnimal(id) {
        fetch(API_BASE + "zvirata/" + id)
            .then(response => response.json())
            .then(data => {
                this.showAnimal(data);
            });
    }

    showAnimal(data) {
        document.getElementById("nazev").textContent = data.nazev;
        document.getElementById("latinsky").textContent = data.nazevLatinsky;
        document.getElementById("popis").textContent = data.popis;
        document.getElementById("domovina").textContent = data.domovina;
        document.getElementById("biotop").textContent = data.biotop;
        document.getElementById("potrava").textContent = data.potrava;
        document.getElementById("velikost").textContent = data.velikost;
        document.querySelector(".detail__foto").src = "images/" + data.foto;
        document.querySelector(".detail__foto").alt = "images/" + data.nazev;

    //    let pole = [];

    //     data.zoo.forEach(zoo => {
    //         pole.push(fetch(API_BASE + "zoo/" + zoo));
    //     });

    //     Promise.all(pole)
    //         .then(responses => {
    //             let poleJson = [];

    //             responses.forEach(response => {
    //                 poleJson.push(response.json());
    //             })

    //             Promise.all(poleJson)
    //                 .then(zoos => {
    //                     console.table(zoos);
    //                 })
    //         });
    // }

    //načte z API konkrétní zoo podle předaného ID
    async getZoo(id) {

        let response = await fetch(API_BASE + "zoo/" + id);
        let data = await response.json();

        return data;
        // fetch(API_BASE + "zoo/" + id)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.showZoo(data);
        //     });
    }

    showZoo(data) {

    }

}