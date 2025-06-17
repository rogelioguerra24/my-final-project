import { apiFetch , createCardHomePage, randomLetters} from "./renderization.mjs"

const container = document.querySelector("#trend-cards");

const publicKey = "fd31043027cd0753f2c7fd00a51d97a1";
const privateKey = "5c198208eaeb76edf1539e827e10cf75e41eadb8";

async function main() {
    const ts = Date.now().toString();
    const hash = md5(ts + privateKey + publicKey);
    const random = randomLetters();

    let url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${random}&limit=7&offset=0&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const data = await apiFetch(url);
    
    const characters = data.data.results;
    
    createCardHomePage(container, characters);

}
main();
