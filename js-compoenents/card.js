
export function card(container, carddata) {
    container.innerHTML = carddata.map((e) => (`
  <div class="card">
    <img src="${e.thumbnail}" alt="${e.title}">

    <h2>${e.title}</h2>

    <p>${e.description}</p>

    <p><strong>Category:</strong> ${e.category}</p>

    <p><strong>Brand:</strong> ${e.brand}</p>

    <p><strong>Price:</strong> $${e.price}</p>

    <p><strong>Discount:</strong> ${e.discountPercentage}%</p>

    <p><strong>⭐ Rating:</strong> ${e.rating}</p>

    <p><strong>Stock:</strong> ${e.stock}</p>

    <p><strong>Status:</strong> ${e.availabilityStatus}</p>

    <button>Buy Now</button>
</div>
`
    ))
}

