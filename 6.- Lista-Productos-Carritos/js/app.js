const cartOrdenContent = document.querySelector("#order-content");
const productsDiv = document.querySelector("#cards-products");
const nameCategory = document.querySelector(".category-name");
const buttonsCategories = document.querySelectorAll(".categories button");
const countProducts = document.querySelector("#count");
const btnConfirm = document.querySelector(".btn-confirm");
const contentTotal = document.querySelector(".content-total");
const priceTotal = document.querySelector("#price-total");
const emptyCart = document.querySelector('.empty-cart');
const confirmOrder = document.querySelector('.btn-confirm');
const showModal = document.querySelector('#show-modal');
const priceTotalOrder = document.querySelector('.total-order strong');
 
let addProductCart = [];
let totalCountProduct;



const url = "./data.json";
document.addEventListener("DOMContentLoaded", () => {
  getMenu();
});

buttonsCategories.forEach((btnCategory) => {
  btnCategory.addEventListener("click", async (e) => {
    try {
      const respuesta = await fetch(url);
      const result = await respuesta.json();
      const filteredProducts = result.filter(
        (product) => product.category === e.target.id
      );
      showMenu(filteredProducts);

      buttonsCategories.forEach((btn) => btn.classList.remove("btn-select"));

      nameCategory.textContent = e.target.id;

      e.target.classList.add("btn-select");
    } catch (error) {
      console.log(error);
    }
  });
});

async function getMenu() {
  try {
    const respuesta = await fetch(url);
    const result = await respuesta.json();
    showMenu(result);
  } catch (error) {
    console.log(error);
  }
}

function showMenu(menu) {
  limpiarHTML(productsDiv);

  menu.forEach((product) => {
    const { image, name, category, price } = product;

    const divCard = document.createElement("DIV");
    divCard.classList.add("card-product");

    const divCardImg = document.createElement("DIV");
    divCardImg.classList.add("card-product-img");

    const imgCard = document.createElement("IMG");
    imgCard.src = image;
    imgCard.alt = name;

    const btnCard = document.createElement("BUTTON");
    btnCard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
        Agregar al Carrito
        `;

    btnCard.onclick = () => {
      addCartProdut(product);
    };

    divCardImg.appendChild(imgCard);
    divCardImg.appendChild(btnCard);

    const divCardInfoProduct = document.createElement("DIV");
    divCardInfoProduct.classList.add("card-product-info");

    const infoSpan = document.createElement("SPAN");
    infoSpan.textContent = category;

    const infoName = document.createElement("P");
    infoName.textContent = name;

    const infoPrice = document.createElement("P");
    infoPrice.classList.add("price");
    infoPrice.textContent = `Precio: $${price} pesos`;

    divCardInfoProduct.appendChild(infoSpan);
    divCardInfoProduct.appendChild(infoName);
    divCardInfoProduct.appendChild(infoPrice);

    divCard.appendChild(divCardImg);
    divCard.appendChild(divCardInfoProduct);

    productsDiv.appendChild(divCard);
  });
}

function addCartProdut(product) {
  const infoProduct = {
    name: product.name,
    price: product.price,
    id: product.id,
    count: 1,
    image: product.image,
  };

  const existe = addProductCart.some((prod) => prod.id === infoProduct.id);
  if (existe) {
    const products = addProductCart.map((prod) => {
      if (prod.id === infoProduct.id) {
        prod.count++;
        return prod;
      }

      return prod;
    });
    addProductCart = [...products];
  } else {
    addProductCart = [...addProductCart, infoProduct];
  }

  showProductsCart();
}

function showProductsCart() {
  limpiarHTML(cartOrdenContent);

  if(addProductCart.length){

      addProductCart.forEach((product) => {
          const { count, id, name, price } = product;

        const divProduct = document.createElement("DIV");
        divProduct.classList.add("product");
    
        const divInfoProduct = document.createElement("DIV");
        divInfoProduct.classList.add("info-product");
    
        const spanName = document.createElement("SPAN");
        spanName.classList.add("name-product");
        spanName.textContent = name;
    
        const divCountPrice = document.createElement("DIV");
        divCountPrice.classList.add("count-price");
    
        const strongCount = document.createElement("STRONG");
        strongCount.classList.add("count");
        strongCount.textContent = `${count}x`;
    
        const spanPrice = document.createElement("SPAN");
        spanPrice.classList.add("price");
        spanPrice.textContent = `$${price}`;
    
        const spanTotal = document.createElement("SPAN");
        spanTotal.classList.add("total");
        spanTotal.textContent = calculateSubtotal(price, count);
    
        const divDelete = document.createElement("DIV");
        divDelete.classList.add('delete');

        const imgDelete = document.createElement("IMG");
        imgDelete.src = "./assets/images/icon-remove-item.svg";
        imgDelete.alt = "Eliminar Producto";
        
        divDelete.onclick = () => {
            deleteProduct(id);
        }

        //AGREGAR NAME-PRODUCT A INFO-PRODUCT
        divInfoProduct.appendChild(spanName);
    
        //agregar count-price-total a count-price
        divCountPrice.appendChild(strongCount);
        divCountPrice.appendChild(spanPrice);
        divCountPrice.appendChild(spanTotal);
    
        //agregar divCount a divInfoProduct
        divInfoProduct.appendChild(divCountPrice);
    
        divDelete.appendChild(imgDelete);
    
        divProduct.appendChild(divInfoProduct);
        divProduct.appendChild(divDelete);
    
        cartOrdenContent.appendChild(divProduct);
        
    });
    
    contentTotal.style.display = 'flex';
    btnConfirm.style.display = 'block';

    quantityProducts();
    totalToPay();


    confirmOrder.onclick = (e) => {
      e.preventDefault();

      showModal.classList.add('show-modal');

      showInformationModal();
    }

  }else{
    contentTotal.style.display = 'none';
    btnConfirm.style.display = 'none';
    countProducts.textContent = 0;
    cartOrdenContent.innerHTML = `
        <div class="empty-cart">
            <img src="assets/images/illustration-empty-cart.svg" alt="">
            <p>Tus productos agregados aparecerán aquí</p>
        </div>
    `;
  }

}

function deleteProduct(id){
    const result = addProductCart.filter(product => product.id !== id);
    addProductCart = [...result];

    showProductsCart();
}

function quantityProducts() {
  totalCountProduct = addProductCart.reduce(
    (total, product) => total + product.count,
    0
  );
  countProducts.textContent = totalCountProduct;
}

function calculateSubtotal(price, count){
    return `$${price * count}`
}
function totalToPay(){
    let total = 0;
    addProductCart.forEach( product => {
        total += product.price * product.count;
    });

    priceTotal.textContent = `$${total}`
    priceTotalOrder.textContent = `$${total}`
}

function showInformationModal(){
  addProductCart.forEach( product => {
    const {image, name, count, price} = product;
    const divOrderProduct = document.querySelector('.order-confirm');

    divOrderProduct.innerHTML += `
      <div class="order">
          <div class="order-info">
              <img src="${image}" alt="${name}">
              <div class="more-info">
                  <p>${name}</p>
                  <div class="price-count">
                      <strong>${count}x</strong>
                      <span>$${price}</span>
                  </div>
              </div>
          </div>
          <div>
              <p class="single-price">${calculateSubtotal(price,count)}</p>
          </div>
      </div>
    `;

  })
}

function limpiarHTML(content) {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
}
