"use strict";
(() => {
  // modules/products.js
  var Produit = class {
    constructor(ref, price, desc, url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/1200px-Pas_d%27image_disponible.svg.png") {
      this.ref = ref;
      this.price = price;
      this.description = desc;
      this.photo = url;
    }
  };
  var products = [
    new Produit("0001", 12.59, "Ballon de football normal", "https://thumblr.uniid.it/blog_component/149437/cc41be364e0e.jpg"),
    new Produit("0002", 19.99, "Casquette Talmo imprim\xE9e", "https://cdn.babycscdn.com/m/50894-large_default/casquette-lol.jpg"),
    new Produit("0003", 89, "RTX 4090 neuve", "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlKRrv3jFK7pqEuRAW-AWYb5mU9BZ_ttUy6IBgR1xe6FfA30qNhbdGm5V9mq8N4Oj479f_fswZNW0X-_R6ge9Ua1drvX4mr6AZqUhmiFln&usqp=CAc"),
    new Produit("0004", 1, "Mascotte Talmo", "https://i.ytimg.com/vi/I46FFed2CX0/maxresdefault.jpg"),
    new Produit("0005", 15, "Raquette HEAD Gravity Team", "https://www.extreme-tennis.fr/28183-large_default/raquette-head-gravity-team-l-270g.jpg"),
    new Produit("0006", 65, "Nissan Skyline GTR34", "https://static.wixstatic.com/media/8d991e_a1a052e25382451ea7c6fe348a566d36~mv2.jpg/v1/fill/w_480,h_322,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/8d991e_a1a052e25382451ea7c6fe348a566d36~mv2.jpg"),
    new Produit("0007", 20, "Villa ELYSIAN 120m2, 29100, Gr\xE8ce", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1"),
    new Produit("0008", 8, "EXEMPLE PRODUIT INDISPONIBLE"),
    new Produit("0009", 28, "Chaussettes Cars Flash MCQueen")
  ];
  function search(keywords) {
    return products.filter((produit) => produit.description.toLowerCase().includes(keywords.toLowerCase()) || // Soit dans la description
    produit.ref.toLowerCase().includes(keywords.toLowerCase()));
  }

  // modules/cart.js
  var Panier = class {
    constructor() {
      this.contenu = [];
    }
    // Fonction pour ajouter à un panier un produit avec la quantité de ce produit souhaitée
    addToCart(produit) {
      const produitExiste = this.contenu.find((element) => element.product === produit);
      if (produitExiste) {
        produitExiste.qty++;
      } else {
        this.contenu.push({ product: produit, qty: 1 });
      }
      localStorage.setItem("Panier", JSON.stringify(this.contenu));
    }
    genericCalc(callback) {
      return this.contenu.reduce(callback, 0);
    }
    // Permet de vider le contenu du panier
    emptyCart() {
      this.contenu = [];
      localStorage.clear();
    }
  };
  var cart = new Panier();

  // modules/ui.js
  var callbackCart = null;
  function setCallbackAddToCart(callback) {
    callbackCart = callback;
  }
  function displayProduct(product) {
    const htmlProduit = document.createElement("div");
    htmlProduit.classList.add("product");
    htmlProduit.innerHTML = ` 
    <div class="photo">
    </div>
    <div class="details">
      <div class="details-top">
        <strong class="bigger">${product.ref}</strong>
        <strong class="bigger">${product.price} \u20AC</strong>
      </div>
      <div class="details-description">
        ${product.description}
      </div>
    </div>
  `;
    let photo = document.createElement("img");
    photo.src = product.photo;
    const ajouterPanier = document.createElement("a");
    ajouterPanier.classList.add("product-add2cart");
    const logoPanier = document.createElement("span");
    logoPanier.className = "mdi mdi-cart";
    ajouterPanier.appendChild(logoPanier);
    ajouterPanier.addEventListener("click", () => {
      if (callbackCart) {
        callbackCart(product);
      }
    });
    const photoElement = htmlProduit.querySelector(".photo");
    photoElement.insertBefore(photo, photoElement.firstChild);
    photoElement.insertBefore(ajouterPanier, photoElement.firstChild.nextSibling);
    return htmlProduit;
  }
  function buildProductsList(products2) {
    const htmlListeProduits = document.getElementById("product-list");
    htmlListeProduits.innerHTML = "";
    products2.forEach((e) => {
      const elementHtml = displayProduct(e);
      htmlListeProduits.appendChild(elementHtml);
    });
  }
  function displayCart() {
    const contenu = cart.contenu;
    const htmlContenuPanier = document.getElementById("cart-content");
    const genererLigneTableau = (element) => {
      return `
        <tr>
            <td>${element.product.ref}</td>
            <td>${element.product.description}</td>
            <td>${element.qty}</td>
            <td><strong>${element.product.price * element.qty} \u20AC</strong></td>
        </tr>
    `;
    };
    const panierHTML = contenu.map(genererLigneTableau).reduce((acc, html) => {
      return acc + html;
    }, "");
    htmlContenuPanier.innerHTML = panierHTML;
    const sum = (acc, element) => {
      return acc + element.product.price * element.qty;
    };
    const sumProduits = (acc, element) => {
      return acc + element.qty;
    };
    const montantTotal = cart.genericCalc(sum);
    const nbProduits = cart.genericCalc(sumProduits);
    let htmlTotal = document.getElementById("cart-total");
    htmlTotal.innerHTML = montantTotal + " \u20AC";
    let htmlNbProduits = document.getElementById("total-products");
    htmlNbProduits.innerHTML = nbProduits;
  }

  // modules/app.js
  function init() {
    if (localStorage.getItem("Panier") !== null) {
      const contenuPanier = JSON.parse(localStorage.getItem("Panier"));
      console.log(contenuPanier);
      cart.contenu = contenuPanier;
      displayCart();
    } else {
      cart.contenu = [];
    }
    buildProductsList(products);
    const barreRecherche = document.getElementById("product-search");
    barreRecherche.addEventListener("keyup", () => {
      if (event.key === "Enter") {
        const keywords = barreRecherche.value;
        console.log(keywords);
        buildProductsList(search(keywords));
      }
    });
    let viderPanier = document.getElementById("empty-cart");
    viderPanier.addEventListener("click", () => {
      cart.emptyCart();
      displayCart();
    });
    const callbackAddToCart = (produit) => {
      console.log("CLICK SUR BOUTON PANIER");
      cart.addToCart(produit);
      displayCart();
    };
    setCallbackAddToCart(callbackAddToCart);
  }

  // modules/main.js
  window.addEventListener("load", init);
})();
