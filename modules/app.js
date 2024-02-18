"use strict";
/**
 * Module qui contrôle le comportement de l'application (lien entre actions de l'utilisateur et les données)
 */

import { products } from './products.js'; // On récupère la liste des produits
import {buildProductsList, displayCart, setCallbackAddToCart} from './ui.js'; // Et la méthode qui permet de les afficher sur en html ainsi que la méthode qui ajoute la vue du panier
import { search } from "./products.js";
import { cart } from "./cart.js";

function init(){
    // On récupère en premier lieu le contenu du panier stocké dans le localStorage
    if(localStorage.getItem("Panier") !== null){
        const contenuPanier = JSON.parse(localStorage.getItem("Panier"));
        console.log(contenuPanier);
        cart.contenu = contenuPanier;
        displayCart();
    }else{
        cart.contenu = [];
    }


    buildProductsList(products); // Donc on ajoute à l'html les produits

    // On ajoute un événement keyup au champ de recherche
    // On récupère l'élement html de la barre de recherche
    const barreRecherche = document.getElementById("product-search");
    barreRecherche.addEventListener("keyup", () =>{
        // On vérifie d'abord si la touche appuyée c'est entrée
        if(event.key === "Enter"){
            // On récupère le contenu html de la barre pour voir ce qu'il contient
            const keywords = barreRecherche.value;
            console.log(keywords);
            buildProductsList(search(keywords));
        }

    });

    // On ajoute aussi un listener sur le bouton vider le panier
    let viderPanier = document.getElementById("empty-cart");
    viderPanier.addEventListener("click", () => {
        cart.emptyCart();
        displayCart();

    });

    // Pour le listener qui regarde l'ajout au panier
    // on crée la fonction de callback qu'on va lui associer
    const callbackAddToCart = (produit) => {
        console.log("CLICK SUR BOUTON PANIER");
        cart.addToCart(produit);
        displayCart();
    }

    // Puis on doit ajouter ce callback à ui.js
    setCallbackAddToCart(callbackAddToCart);
}

export {init}; // Puis on exporte la fonction init
