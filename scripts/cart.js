import { getLocalStorage} from "./renderization.mjs";
import { renderCards, sumTotal} from "./renderization.mjs";

const cartItems = getLocalStorage("so-cart");
const container = document.querySelector(".product-list");
const listTotal = document.querySelector(".list-total");
const total = sumTotal(cartItems, "PriceProduct");


listTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;

renderCards(container, cartItems);


