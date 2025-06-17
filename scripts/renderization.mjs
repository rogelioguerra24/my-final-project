export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path){
  try{
    const response = await fetch(path);
    const template = await response.text();
    return template;
  }catch(error){
    console.log(`You error is ${error}`)
  }
}

export async function apiFetch(url){
  try{
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }catch(error){
    console.log("You error is", error);
  }
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("./partials/header.html");
  const headerElement = document.querySelector("#main-header");

  const navigationTemplate = await loadTemplate("./partials/navigation.html");
  const navigationElement = document.querySelector("#main-navigation");

  const footerTemplate = await loadTemplate("./partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(navigationTemplate, navigationElement);
  renderWithTemplate(footerTemplate, footerElement);

  // This part is to give date to the footer
  const today = new Date();
  const year = document.querySelector("#currentyear");
  year.innerHTML = `${today.getFullYear()}`;

  // This part is to use the hamburguer selector of the page
  const burgerElement = document.querySelector("#myButton");
  const menuElement = document.querySelector("#main-navigation");

  burgerElement.addEventListener('click', () => {
    menuElement.classList.toggle('open');
    burgerElement.classList.toggle('open'); //toggle means change class list of in this case'open'
  });
  

  length = getLocalStorage("so-cart").length;
  const superScript = document.querySelector("#numberItems");

  if (length >= 1) {
    superScript.innerHTML = length;
  } else{
    superScript.innerHTML =`0`;
  }

}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//This code is for the Home Page
export function createCardHomePage(containerInternal, elementArray){
    containerInternal.innerHTML = "";

    elementArray.forEach(element => { 
        let img = document.createElement("img");

        //This following code is to obtain the path for the images
        const extension = element.thumbnail.extension;
        const path = element.thumbnail.path;
        const urlImage = `${path}/portrait_incredible.${extension}`;

        img.setAttribute("src", urlImage);
        img.setAttribute("loading", "lazy")
    
        containerInternal.appendChild(img);
    });
}

export function randomLetters(){
    const lettersArray = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = lettersArray[Math.floor(Math.random() * lettersArray.length)]
    return randomLetter
}

//This code is for the Library Page
export function createCard(containerInternal, elementArray){
    containerInternal.innerHTML = "";

    elementArray.forEach(element => {
        let box = document.createElement("div");
        let link = document.createElement("a");
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let description = document.createElement("p");
        let button = document.createElement("button");
        
        //This following code is to obtain the path for the images
        const extension = element.thumbnail.extension;
        const path = element.thumbnail.path;
        const urlImage = `${path}/landscape_xlarge.${extension}`;

        img.setAttribute("src", urlImage);
        link.appendChild(img);

        name.innerHTML = element.name;
        description.innerHTML = element.description;
      
        box.appendChild(link);
        box.appendChild(name);
        box.appendChild(description);
        box.appendChild(button);

        button.innerHTML = `Add to Favorites`;
        button.addEventListener("click", () => addFavoriteItem(element) )

        containerInternal.appendChild(box);
    });

}

function addFavoriteItem(element){
    try {
        const cart = getLocalStorage("favorites") || [];
        cart.push(element);
        setLocalStorage("favorites", cart);
        
    } catch (error) {
        console.error("Error adding element to cart:", error);
    }
}
//This code is for the store Page
export function createCards(cards, ourProducts) {
    cards.innerHTML = ""; // Clear previous content


    ourProducts.forEach(product => {
        let card = document.createElement("div");
        let name = document.createElement("h3");
        let price = document.createElement("p");
        let description = document.createElement("p");
        let img = document.createElement("img");
        let button = document.createElement("button");
        

        name.textContent = product.NameProduct;
        price.innerHTML = `<strong>Price:</strong> $${product.PriceProduct.toFixed(2)}`;
        description.innerHTML = product.DescriptionProduct;

        img.setAttribute("src", product.ImageProduct);
        img.setAttribute("alt", `${product.NameProduct}`);
        img.setAttribute("loading", "lazy");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(button);

        button.innerHTML = `Add to cart`;
        button.addEventListener("click",() => addProductToCart(product));//this function add a respective item to the cart


        /*card.addEventListener("click", () => {
            displayMembershipDetails(product)
        })*/

        cards.appendChild(card);
    });
}

function addProductToCart(product){
    try {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
        const superScript = document.querySelector("#numberItems");
        length = getLocalStorage("so-cart").length;
        superScript.innerHTML = length;
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}

//This code is for the Cart Page
export function sumTotal(arrayList, subArray){
    let total= 0;

    arrayList.forEach(item => {
        let price = item[subArray];
        total = total + price
    });

    return total;
}

export function renderCards(container, arrayList) {
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
        button.addEventListener("click",() => removeProductOfCart(container, product));//this export function add a respective item to the cart


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

function removeProductOfCart(container, product){
    try {
        const cart = getLocalStorage("so-cart") || [];
        const index = cart.findIndex(item => item.IdProduct === product.IdProduct);
        const listTotal = document.querySelector(".list-total");

        cart.splice(index, 1); // remove one item at the found index
        setLocalStorage("so-cart", cart);
        renderCards(container, cart); // refresh list after removal

        const total = sumTotal(cart, "PriceProduct")
        listTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
        const superScript = document.querySelector("#numberItems");
        length = getLocalStorage("so-cart").length;
        superScript.innerHTML = length;
    } catch (error) {
        console.error("Error removing product to cart:", error);
    }
}

//This code is for the Favorite Page
export function renderFavoriteCards(container, arrayList) {
    container.innerHTML = ""; // Clear previous content

    if (arrayList.length > 0){

    
    arrayList.forEach(element => {
        let card = document.createElement("li");
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let description = document.createElement("p");
        let button = document.createElement("button");
        
        card.setAttribute("class", "favorite-card");
        description.setAttribute("class", "favorite-card__description")
        button.setAttribute("class", "favorite-card__button")


        const extension = element.thumbnail.extension;
        const path = element.thumbnail.path;
        const urlImage = `${path}/landscape_large.${extension}`;


        name.textContent = element.name;

        
        description.innerHTML = element.description;
        img.setAttribute("src", urlImage);




        img.setAttribute("alt", `${element.name}`);
        img.setAttribute("loading", "lazy");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(button);

        button.innerHTML = `Remove from the list`;
        button.addEventListener("click",() => removeFavorite(container, element));//this export function add a respective item to the cart


        /*card.addEventListener("click", () => {
            displayMembershipDetails(element)
        })*/

        container.appendChild(card);
    });
    } else{
        let emptyCard = document.createElement("div");
        let imgEmpty = document.createElement("img");
        let pEmpty = document.createElement("p");

        const containerEmpty = document.querySelector(".empty-Favorite");

        pEmpty.innerHTML = `Don't wait for having a Marvel Life`
        emptyCard.setAttribute("class", "empty");
        imgEmpty.setAttribute("src", "https://i.pinimg.com/236x/8e/41/43/8e4143f6c679dfb1b525c9361da437e3.jpg");

        emptyCard.appendChild(imgEmpty);
        emptyCard.appendChild(pEmpty);
        containerEmpty.appendChild(emptyCard);
    }
}

function removeFavorite(container, element){
    try {
        const favorite = getLocalStorage("favorites") || [];
        const index = favorite.findIndex(item => item.id === element.id);

        favorite.splice(index, 1); // remove one item at the found index
        setLocalStorage("favorites", favorite);
        renderFavoriteCards(container, favorite); // refresh list after removal

       
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
}

//This code is for the Disney Page
export function createDisneyCard(containerInternal, elementArray){
    containerInternal.innerHTML = "";

    elementArray.forEach(element => {
        let box = document.createElement("div");
        let link = document.createElement("a");
        let img = document.createElement("img");
        let name = document.createElement("h2");
        
        img.src = element.imageUrl;
        
        link.setAttribute("href", element.sourceUrl)
        link.setAttribute("target", "_blank")
        link.appendChild(img);
        name.innerHTML = element.name;
       
        
        
        
        
        box.appendChild(link);
        box.appendChild(name);
      
        

       
        containerInternal.appendChild(box);
    });

}
