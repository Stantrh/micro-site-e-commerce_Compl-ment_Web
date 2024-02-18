"use strict";
import {cart} from "./cart.js"; // on a donc le panier importé depuis le module cart.js


// Ici on s'occupe d'ajouter la fonction de callback
let callbackCart = null; // On déclare d'abord la fonction de callback
function setCallbackAddToCart(callback){
    callbackCart = callback;
}




/** On crée la fonction qui permet de créer l'élement graphique représentant le produit
 */
function displayProduct(product) {
    const htmlProduit = document.createElement('div');
    htmlProduit.classList.add('product');

    htmlProduit.innerHTML = ` 
    <div class="photo">
    </div>
    <div class="details">
      <div class="details-top">
        <strong class="bigger">${product.ref}</strong>
        <strong class="bigger">${product.price} €</strong>
      </div>
      <div class="details-description">
        ${product.description}
      </div>
    </div>
  `;

    // On crée l'élément graphique qui représente la photo du produit
    let photo = document.createElement("img");
    photo.src = product.photo;


    // On crée l'élement <a> et le <span> qui a le logo
    const ajouterPanier = document.createElement('a');
    ajouterPanier.classList.add('product-add2cart');
    const logoPanier = document.createElement("span");
    logoPanier.className = "mdi mdi-cart";
    ajouterPanier.appendChild(logoPanier);





    // Ajout de l'écouteur d'événements click à l'élément <a>, on utilise le callback fourni dans l'en-tete de la fonction
    ajouterPanier.addEventListener("click", () => {
        // On vérifie si la fonction de callback a bien été associée
        if(callbackCart){
            callbackCart(product);
        }
    });


    // on récupère l'élément photo
    const photoElement = htmlProduit.querySelector('.photo');

    // Et on ajoute en premier enfant l'image puis ensuite le bouton d'ajout au panier
    photoElement.insertBefore(photo, photoElement.firstChild);
    photoElement.insertBefore(ajouterPanier, photoElement.firstChild.nextSibling);


    return htmlProduit;
}


// Puis on crée la fonction qui affiche la liste des produits avec la fonction précédente à partir d'un tab de produits
function buildProductsList(products){

    // On récupère d'abord l'élément html qui contient la liste des produits
    const htmlListeProduits = document.getElementById('product-list');
    htmlListeProduits.innerHTML = '';

    // Puis on parcourt la liste des produits pour ajouter chaque html d'un produit à la liste qui les contient
    products.forEach( (e) => {
        const elementHtml = displayProduct(e);
        htmlListeProduits.appendChild(elementHtml);
    });
}


// Fonction qui affiche le contenu du panier
function displayCart(){
    const contenu = cart.contenu;

    // On récupère l'élément HTML dans lequel on va afficher le contenu du panier :
    const htmlContenuPanier = document.getElementById("cart-content");


    // on crée une fonction pour générer une ligne du tableau
    const genererLigneTableau = element => {
        return `
        <tr>
            <td>${element.product.ref}</td>
            <td>${element.product.description}</td>
            <td>${element.qty}</td>
            <td><strong>${element.product.price * element.qty} €</strong></td>
        </tr>
    `;
    }

    // Donc on utilise map pour faire l'image du tableau selon le code qu'on a défini juste en haut
    const panierHTML = contenu.map(genererLigneTableau).reduce((acc, html) => {
        return acc + html;
    }, "");

    // Puis on met le contenu HTML dans l'html du panier
    htmlContenuPanier.innerHTML = panierHTML;

    // On crée la fonction de callback qui sert à faire la somme pour les produits
    const sum = (acc, element) => {
        return acc +  (element.product.price * element.qty );
    }

    // On crée la fonction de callback qui retourne le nombre d'éléments dans le panier
    const sumProduits = (acc, element) => {
        return acc + element.qty;
    }


    // On récupère le montant du panier
    const montantTotal = cart.genericCalc(sum);
    // On récupère aussi le nombre d'articles dans le panier
    const nbProduits = cart.genericCalc(sumProduits);

    // Ensuite on va récupérer l'élement html qui contient le montant puis lui associer la valeur
    let htmlTotal = document.getElementById("cart-total");
    htmlTotal.innerHTML = montantTotal + " €";

    // Idem pour l'élement qui affiche le nombre de produits
    let htmlNbProduits =document.getElementById("total-products");
    htmlNbProduits.innerHTML = nbProduits;
}


// Puis on exporte uniquement la fonction permettant de créer les produits en html à partir d'une liste
export {buildProductsList, displayCart, setCallbackAddToCart};
















// #### EXEMPLE DE L'HTML D'UN PRODUIT ####
/**
 *                <div class="product">
 *
 *                    <div class="photo">
 *                        picto
 *                        <a class="product-add2cart">
 *                            <span class="mdi mdi-cart"></span>
 *                        </a>
 *                    </div>
 *                    <div class="details">
 *                        <div class="details-top">
 *                            <strong class="bigger">ref</strong>
 *                            <strong class="bigger">prix en €</strong>
 *                        </div>
 *                        <div class="details-description">
 *                            Salut petit test
 *                        </div>
 *                    </div>
 *
 *                </div>
 */