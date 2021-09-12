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
        div.classList.add("single-product", "card", "h-100", "rounded");
        div.innerHTML = `
          <div>
            <img class="product-image" src=${imageUrl} alt="Product-Image"></img>
          </div>
          <h3 class="card-title">${product.title}</h3>
          <div class="card-body">
            <p class="m-0"><span class="fw-bold">Category:</span> ${product.category}</p>
            <p class="m-0"><span class="fw-bold">Rating Count:</span> ${product.rating.count}</p>
            <p class="m-0"><span class="fw-bold">Rating Average:</span> ${product.rating.rate}</p>
            <h3>Price: <span class="text-primary">$ ${product.price}</span></h3>
          </div>
          <div class="d-flex justify-content-evenly">
          <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
          <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Details</button>
          </div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
};

let count = 0;
const addToCart = (price) => {
    count++;
    document.getElementById("total-Products").innerText = count;

    updatePrice("price", price);

    updateTaxAndCharge();

    updateTotal();
};

const loadDetails = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => showDetails(data));
};

const showDetails = (product) => {
    document.getElementById("mod-title").innerText = product.title;
    document.getElementById("mod-body").innerText = product.description;
};

// to get the value
const getValue = (id) => {
    const text = document.getElementById(id).innerText;
    const value = parseFloat(text);
    return value;
};

// to set innerText
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// main price update function
const updatePrice = (id, price) => {
    const oldPrice = getValue(id);
    const total = oldPrice + price;
    document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const price = getValue("price");
    if (price > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", price * 0.2);
    }
    if (price > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", price * 0.3);
    }
    if (price > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", price * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getValue("price") + getValue("delivery-charge") + getValue("total-tax");
    //document.getElementById("total").innerText = grandTotal;
    setInnerText("total", grandTotal);
};
