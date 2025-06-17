import { getLocalStorage } from "./renderization.mjs";
import { renderFavoriteCards } from "./renderization.mjs";

const cartItems = getLocalStorage("favorites");
const container = document.querySelector(".favorites-list");

renderFavoriteCards(container, cartItems);