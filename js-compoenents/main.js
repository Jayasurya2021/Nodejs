import { card } from "./card.js";


let cardcompoent = document.getElementById("card")


async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  card(cardcompoent, data.products)
  console.log(data);
}

getProducts();
