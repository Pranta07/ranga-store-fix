//load products using api
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
    const allProducts = products.map((product) => product);
    //console.log(allProducts);
    for (const product of allProducts) {
        const imageUrl = product.image;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
        <div class="single-product">
          <div>
            <img class="product-image" src=${imageUrl}></img>
          </div>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <p>Rating Count: ${product.rating.count}</p>
          <p>Rating Average: ${product.rating.rate}</p>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button></div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
};
let count = 0;
const addToCart = (id, price) => {
    count++;
    updatePrice("price", price);

    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
    const text = document.getElementById(id).innerText;
    const value = parseFloat(text);
    return value;
};

// main price update function
const updatePrice = (id, price) => {
    const oldPrice = getInputValue(id);
    const total = oldPrice + price;
    document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") +
        getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal;
};
