//variables
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const memoria = document.querySelector('#memoria');
const condicion = document.querySelector('#condicion');
const puertos = document.querySelector('#puertos');
const pantalla = document.querySelector('#pantalla');

//Generar un objecto para la busqueda
const objectoBusqueda = {
    marca: '',
    minimo: '',
    maximo: '',
    memoria: '',
    condicion: '',
    puertos: '',
    pantalla: ''
}

//EventListeners para los select
marca.addEventListener('change', e => {
    objectoBusqueda.marca = e.target.value;

    filtrarProducto();
});
minimo.addEventListener('change', e => {
    objectoBusqueda.minimo = e.target.value;

});
maximo.addEventListener('change', e => {
    objectoBusqueda.maximo = e.target.value;

});
memoria.addEventListener('change', e => {
    objectoBusqueda.memoria = e.target.value;

});
condicion.addEventListener('change', e => {
    objectoBusqueda.condicion = e.target.value;

});
puertos.addEventListener('change', e => {
    objectoBusqueda.puertos = e.target.value;

});
pantalla.addEventListener('change', e => {
    objectoBusqueda.pantalla = e.target.value;

    console.log(objectoBusqueda)
});

document.addEventListener('DOMContentLoaded', () => {
    
    mostrarEquipos(productos);    
});


function mostrarEquipos(productos){

    limpiarHTML();

    productos.forEach( producto => {
        const {marca, precio, memoriaRam, condicion, puertos, tipoPantalla} = producto;
        
        const cards = document.createElement('DIV');
        cards.classList.add('card');

        const card = document.createElement('DIV');
        card.classList.add('card');

        const info = document.createElement('DIV');

        const infoParrafo = document.createElement('P');
        infoParrafo.textContent = `
            ${marca} pantalla ${tipoPantalla}, ${puertos} entrada(s) HDMI, ${memoriaRam}GB RAM (${condicion}) - Precio $${precio}
        `;

        card.appendChild(info);
        info.appendChild(infoParrafo);

        resultado.appendChild(card)
    });
}
function filtrarProducto(){
    const resultado = productos.filter(filtrarMarca);

    if(resultado.length){
        mostrarEquipos(resultado);
    }
}

function filtrarMarca(producto){
    const {marca} = objectoBusqueda;
    if(marca){
        return producto.marca === marca;
    }
    return producto
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}