import { apiFetch } from "./renderization.mjs";
import { createCard } from "./renderization.mjs";

const container = document.querySelector("#displayCardsLibrary");
const input = document.getElementById("characterSearch");

const publicKey = "fd31043027cd0753f2c7fd00a51d97a1";
const privateKey = "5c198208eaeb76edf1539e827e10cf75e41eadb8";

const loaderContainer = document.querySelector("#loader");
const loader = document.querySelector("#loaderContainer");

async function main() {
    const cleanPage = document.getElementById("displayCardsLibrary");
    const ts = Date.now().toString();
    const hash = md5(ts + privateKey + publicKey);

    loaderContainer.classList.add('loader');
    loader.classList.add('wireFrame');

    let url = `https://gateway.marvel.com/v1/public/characters?limit=40&offset=0&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const data = await apiFetch(url);
    const characters = data.data.results;

    if (characters.length > 0) {
            loaderContainer.classList.remove('loader');
            loader.classList.remove('wireFrame');
    }


    createCard(container, characters);
    
    input.addEventListener("input", async () => {
        const searchTerm = input.value.trim();

        loaderContainer.classList.add('loader');
        loader.classList.add('wireFrame');

        let url; 

        if (searchTerm.length >= 1) {
            url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            cleanPage.innerHTML = "";
        } 
        if (searchTerm.length == 0) {
            url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            cleanPage.innerHTML = "";
        }

        try {
            const data = await apiFetch(url);
            const characters = data.data.results;
            
            loaderContainer.classList.remove('loader');
            loader.classList.remove('wireFrame');
            
            createCard(container, characters);
        } catch (error) {
            console.error("Error fetching Marvel characters:", error);
        }
    }
)
}

main()

    