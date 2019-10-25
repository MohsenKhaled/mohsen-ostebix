document.addEventListener("DOMContentLoaded", function(){
    fetch("/data/produkter.json")
    .then(response => response.json())
    .then(function(data){ 
        const cardTemplate = document.getElementById("cardTemplate")
        const list = document.getElementsByClassName("cardList")[0];

        data.forEach(function (product) {
            const clone = cardTemplate.content.cloneNode(true);

            clone.querySelector("h1").innerText = product.navn;
            clone.querySelector("p").innerText = product.beskrivelse[1];
            clone.querySelector("img").src = `/assets/images/${product.billder[0]}`;
            clone.querySelector(".price").innerText = product.pris;
            clone.querySelector(".weight"). innerText = product.vægt;
            clone.querySelector(".country").innerText = product.land;
            clone.querySelector("a").href = `/produkt/?sku=${product.sku}`;
            list.appendChild(clone);
        })
    });
});