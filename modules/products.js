"use strict";


// On déclare notre classe de produits
class Produit{
    constructor(ref, price, desc, url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/1200px-Pas_d%27image_disponible.svg.png"){ // On met une url par défaut si y en a pas de spécifiée
        this.ref = ref;
        this.price = price;
        this.description = desc;
        this.photo = url;
    }
}

// On crée le tableau qui contient les quelques produits
let products = [
    new Produit("0001", 12.59, "Ballon de football normal", "https://thumblr.uniid.it/blog_component/149437/cc41be364e0e.jpg"),
    new Produit("0002", 19.99, "Casquette Talmo imprimée", "https://cdn.babycscdn.com/m/50894-large_default/casquette-lol.jpg"),
    new Produit("0003", 89, "RTX 4090 neuve", "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlKRrv3jFK7pqEuRAW-AWYb5mU9BZ_ttUy6IBgR1xe6FfA30qNhbdGm5V9mq8N4Oj479f_fswZNW0X-_R6ge9Ua1drvX4mr6AZqUhmiFln&usqp=CAc"),
    new Produit("0004", 1.00, "Mascotte Talmo", "https://i.ytimg.com/vi/I46FFed2CX0/maxresdefault.jpg"),
    new Produit("0005", 15, "Raquette HEAD Gravity Team", "https://www.extreme-tennis.fr/28183-large_default/raquette-head-gravity-team-l-270g.jpg"),
    new Produit("0006", 65.00, "Nissan Skyline GTR34", "https://static.wixstatic.com/media/8d991e_a1a052e25382451ea7c6fe348a566d36~mv2.jpg/v1/fill/w_480,h_322,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/8d991e_a1a052e25382451ea7c6fe348a566d36~mv2.jpg"),
    new Produit("0007", 20.00, "Villa ELYSIAN 120m2, 29100, Grèce", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1"),
    new Produit("0008", 8.00, "EXEMPLE PRODUIT INDISPONIBLE"),
    new Produit("0009", 28.00, "Chaussettes Cars Flash MCQueen")
];


// On ajoute la fonction search qui prend une string en arg et qui retourne le tableau des produits dont la ref/description contient la string
function search(keywords){
    return products.filter((produit) =>
        produit.description.toLowerCase().includes(keywords.toLowerCase()) || // Soit dans la description
        produit.ref.toLowerCase().includes(keywords.toLowerCase())); // soit dans la référence
}


// Puis on l'exporte
export {products, search};