import { apiFetch } from "./renderization.mjs";
import { createDisneyCard } from "./renderization.mjs";

const container = document.querySelector("#displayCardsDisneyLibrary");
const input = document.getElementById("characterSearch");

const loaderContainer = document.querySelector("#loader");
const loader = document.querySelector("#loaderContainer");


async function main() {
    const cleanPage = document.getElementById("displayCardsDisneyLibrary");
    let url = `https://api.disneyapi.dev/character?`;

    loaderContainer.classList.add('loader');
    loader.classList.add('wireFrame');

    const data = await apiFetch(url);
    const characters = data.data;
    
    if (characters.length > 0) {
            loaderContainer.classList.remove('loader');
            loader.classList.remove('wireFrame');
    }



    createDisneyCard(container, characters);

    input.addEventListener("input", async () => {
    const searchTerm = input.value.trim();

    loaderContainer.classList.add('loader');
    loader.classList.add('wireFrame');

    let url; 

    if (searchTerm.length >= 1) {
        url = `https://api.disneyapi.dev/character?name=${searchTerm}`;
        cleanPage.innerHTML = "";
    } 
    if (searchTerm.length == 0) {
        url = `https://api.disneyapi.dev/character?name=princess`;
        cleanPage.innerHTML = "";
    }

    try {
        const data = await apiFetch(url);
        const characters = data.data;
        
        loaderContainer.classList.remove('loader');
        loader.classList.remove('wireFrame');
            

        createDisneyCard(container, characters);
    } catch (error) {
        console.error("Error fetching Marvel characters:", error);
    }

  })
}

main()
