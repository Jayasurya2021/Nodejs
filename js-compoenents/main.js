import { card } from "./card.js";


let cardcompoent = document.getElementById("card")

const cardsdata = [
  {
    title: "JavaScript Course",
    description: "Learn JavaScript from Beginner to Advanced.",
    price: "₹999"
  },
  {
    title: "React.js Course",
    description: "Build modern web applications using React.",
    price: "₹1,499"
  },
  {
    title: "Node.js Course",
    description: "Master backend development with Node.js and Express.",
    price: "₹1,299"
  },
  {
    title: "MongoDB Course",
    description: "Learn MongoDB database from scratch.",
    price: "₹899"
  }
];

card(cardcompoent, cardsdata )





