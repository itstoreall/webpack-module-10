import itemsTemplate from "../templates/gallery-items.hbs";
import countries from "../countries.json";
import "../sass/gallery.scss";

console.log(countries);
console.log(itemsTemplate);

const markup = itemsTemplate(countries);

console.log(markup);

const galleryRef = document.querySelector('.js-gallery');

galleryRef.insertAdjacentHTML("beforeend", markup);