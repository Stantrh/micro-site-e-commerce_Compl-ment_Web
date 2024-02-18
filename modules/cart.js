"use strict";
// Représente le panier et ses actions

class Panier{
    constructor() {
        this.contenu = []; // Crée un panier avec un contenu vide
    }

    // Fonction pour ajouter à un panier un produit avec la quantité de ce produit souhaitée
    addToCart(produit){
        // On vérifie si le produit est déjà dans le panier pour éviter de le dupliquer


        // On va essayer de le récupérer via find comme ça s'il existe on peut directement augmenter sa quantité
        const produitExiste = this.contenu.find(element => element.product === produit);
        if(produitExiste){
            produitExiste.qty++;
        }else{
            this.contenu.push({product : produit, qty: 1});
        }

        // Puis on ajoute le contenu du panier au localStorage
        localStorage.setItem("Panier", JSON.stringify(this.contenu));
    }

    genericCalc(callback){
        return this.contenu.reduce(callback, 0);
    }

    // Permet de vider le contenu du panier
    emptyCart(){
        this.contenu = [];
        localStorage.clear();
    }
}


// On exporte un objet cart
const cart = new Panier();
export {cart};