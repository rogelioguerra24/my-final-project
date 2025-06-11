export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path){
  const response = await fetch(path);
  const template = await response.text();
  return template;
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
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}