
export function card(container, carddata) {
    container.innerHTML = carddata.map((e) => (`
  <div class="card">
    <h2>${e.title}</h2>
    <p>${e.description}</p>
    <h3>${e.price}</h3>
    <button>Buy Now</button>
  </div>
`
    ))
}

