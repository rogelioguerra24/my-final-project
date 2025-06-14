import { apiFetch } from "./renderization.mjs";
import { createCards } from "./renderization.mjs";

// This part is to use the hamburger selector of the page
const burgerElementFilter = document.querySelector("#buttonDisplay");
const menuElementFilter = document.querySelector("#animated-metFilter");

burgerElementFilter.addEventListener('click', () => {
    menuElementFilter.classList.toggle('open');
    burgerElementFilter.classList.toggle('open'); // toggle means change class list of in this case 'open'
});

const cards = document.getElementById("displayCards");
const url = "../data/products.json"

async function main(){
    const objectProducts = await apiFetch(url);
    const arrayProducts = objectProducts.products;

    createCards(cards, arrayProducts);

    const all = document.querySelector("#category-all");
    const actionFigure = document.querySelector("#category-action-figure");
    const clothing = document.querySelector("#category-clothing");
    const collectible = document.querySelector("#category-collectible");
    const poster = document.querySelector("#category-poster");
    const accessory = document.querySelector("#category-accessory");
    const homeware = document.querySelector("#category-homeware");
    const stationery = document.querySelector("#category-stationery");
    const backpack = document.querySelector("#category-backpack");

    all.addEventListener("click", () => {
        createCards(cards, arrayProducts);
    });

    actionFigure.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Action Figure"));
    });

    clothing.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Clothing"));
    });

    collectible.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Collectible"));
    });

    poster.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Poster"));
    });

    accessory.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Accessory"));
    });

    homeware.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Homeware"));
    });

    stationery.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Stationery"));
    });

    backpack.addEventListener("click", () => {
        createCards(cards, arrayProducts.filter(product => product.Category === "Backpack"));
    });    
}

main();