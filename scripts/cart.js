import { getLocalStorage, setLocalStorage} from "./renderization.mjs";

const cartItems = getLocalStorage("so-cart");
const container = document.querySelector(".product-list")

function renderCartContents() {
    const htmlItems = cartItems.map((product) => cartItemTemplate(product));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(product) {
    const newItem = `
        <li class="cart-card">
            <img src="${product.ImageProduct}" alt="${product.NameProduct}"/>
            <h2>${product.NameProduct}</h2>
            <p class="cart-card__description">$${product.DescriptionProduct}</p>
            <p class="cart-card__price">$${product.PriceProduct}</p>
            <button class="cart-card__button">Remove from the list</button>
        </li>`;
    return newItem;
}

function sumTotal(arrayList, subArray){
    let total= 0;

    arrayList.forEach(item => {
        let price = item[subArray];
        total = total + price
    });

    return total;
}


const listTotal = document.querySelector(".list-total");
const total = sumTotal(cartItems, "PriceProduct")
listTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;



function renderCards(arrayList) {
    container.innerHTML = ""; // Clear previous content

    if (arrayList.length > 0){

    
    arrayList.forEach(product => {
        let card = document.createElement("li");
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let description = document.createElement("p");
        let price = document.createElement("p");
        let button = document.createElement("button");
        
        card.setAttribute("class", "cart-card");
        description.setAttribute("class", "cart-card__description")
        price.setAttribute("class", "cart-card__price")
        button.setAttribute("class", "cart-card__button")

        name.textContent = product.NameProduct;
        price.innerHTML = `<strong>Price:</strong> $${product.PriceProduct.toFixed(2)}`;
        description.innerHTML = product.DescriptionProduct;

        img.setAttribute("src", product.ImageProduct);
        img.setAttribute("alt", `${product.NameProduct}`);
        img.setAttribute("loading", "lazy");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(button);

        button.innerHTML = `Remove from the list`;
        button.addEventListener("click",() => removeProductOfCart(product));//this function add a respective item to the cart


        /*card.addEventListener("click", () => {
            displayMembershipDetails(product)
        })*/

        container.appendChild(card);
    });
    } else{
        let emptyCard = document.createElement("div");
        let imgEmpty = document.createElement("img");
        let pEmpty = document.createElement("p");

        pEmpty.innerHTML = `Don't wait for having a Marvel Life`
        emptyCard.setAttribute("class", "empty");
        imgEmpty.setAttribute("src", "https://i.pinimg.com/236x/8e/41/43/8e4143f6c679dfb1b525c9361da437e3.jpg");

        emptyCard.appendChild(imgEmpty);
        emptyCard.appendChild(pEmpty);
        container.appendChild(emptyCard);
    }
}

function removeProductOfCart(product){
    try {
        const cart = getLocalStorage("so-cart") || [];
        const index = cart.findIndex(item => item.IdProduct === product.IdProduct);

        cart.splice(index, 1); // remove one item at the found index
        setLocalStorage("so-cart", cart);
        renderCards(cart); // refresh list after removal
        const total = sumTotal(cart, "PriceProduct")
        listTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
        const superScript = document.querySelector("#numberItems");
        length = getLocalStorage("so-cart").length;
        superScript.innerHTML = length;
    } catch (error) {
        console.error("Error removing product to cart:", error);
    }
}

//renderCartContents();
renderCards(cartItems);


