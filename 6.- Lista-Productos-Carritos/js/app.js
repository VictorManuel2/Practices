const cartOrdenContent = document.querySelector('#order-content');
const productsDiv = document.querySelector('#cards-products');
const nameCategory = document.querySelector('.category-name');
const buttonsCategories = document.querySelectorAll('.categories button');


const url = './data.json';
let addProductCart = [];

document.addEventListener('DOMContentLoaded', () => {
    getMenu();
})


buttonsCategories.forEach( btnCategory => {

    btnCategory.addEventListener('click', async (e) => {
        try {
            const respuesta = await fetch(url);
            const result = await respuesta.json();
            const filteredProducts = result.filter(product => product.category === e.target.id);
            showMenu(filteredProducts);

            buttonsCategories.forEach( btn => btn.classList.remove('btn-select'));
             
            nameCategory.textContent = e.target.id;

            e.target.classList.add('btn-select')
        } catch (error) {
            console.log(error);
        }
    })
})

async function getMenu(){
    try {
        const respuesta = await fetch(url);
        console.log(respuesta)
        const result = await respuesta.json();
        showMenu(result);
    } catch (error) {
        console.log(error)
    }
}


function showMenu(menu){

    limpiarHTML();

    menu.forEach(product => {
        const {image, name, category, price} = product;
        
        const divCard = document.createElement('DIV');
        divCard.classList.add('card-product');

        const divCardImg = document.createElement('DIV');
        divCardImg.classList.add('card-product-img');

        const imgCard = document.createElement('IMG');
        imgCard.src = image;
        imgCard.alt = name;

        const btnCard = document.createElement('BUTTON');
        btnCard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
        Agregar al Carrito
        `;

        btnCard.onclick = () => {
            addCartProdut(product);
        }

        divCardImg.appendChild(imgCard);
        divCardImg.appendChild(btnCard);

        const divCardInfoProduct = document.createElement('DIV');
        divCardInfoProduct.classList.add('card-product-info');

        const infoSpan = document.createElement('SPAN');
        infoSpan.textContent = category;

        const infoName = document.createElement('P');
        infoName.textContent = name;

        const infoPrice = document.createElement('P');
        infoPrice.classList.add('price');
        infoPrice.textContent = `Precio: $${price} pesos`;

        divCardInfoProduct.appendChild(infoSpan);
        divCardInfoProduct.appendChild(infoName);
        divCardInfoProduct.appendChild(infoPrice);


        divCard.appendChild(divCardImg);
        divCard.appendChild(divCardInfoProduct);

        productsDiv.appendChild(divCard);
    });
}

function addCartProdut(product){
    const infoProduct = {
        name: product.name,
        price: product.price,
        id: product.id,
        count: 1,
        image : product.image
    }

    const exists = addProductCart.some( prod => prod.id === infoProduct.id);

    if(exists){
        const products = addProductCart.map( prod => {
            if(prod.id === infoProduct.id){
                prod.count++;
                return prod
            }else{
                return prod
            }
        });

        addProductCart = [...products];
    }else{
        addProductCart = [...addProductCart, infoProduct]
    }


    console.log(addProductCart)
}

function limpiarHTML(){
    while(productsDiv.firstChild){
        productsDiv.removeChild(productsDiv.firstChild)
    }
}

