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
    objectoBusqueda.minimo = parseInt(e.target.value);

    filtrarProducto();
});
maximo.addEventListener('change', e => {
    objectoBusqueda.maximo = e.target.value;

    filtrarProducto();
});
memoria.addEventListener('change', e => {
    objectoBusqueda.memoria = parseInt(e.target.value);

    filtrarProducto();
    
});
condicion.addEventListener('change', e => {
    objectoBusqueda.condicion = e.target.value;

    filtrarProducto();
});
puertos.addEventListener('change', e => {
    objectoBusqueda.puertos = parseInt(e.target.value);

    filtrarProducto();
});
pantalla.addEventListener('change', e => {
    objectoBusqueda.pantalla = e.target.value;

    filtrarProducto();
});

document.addEventListener('DOMContentLoaded', () => {
    mostrarEquipos(productos);    
});


function mostrarEquipos(productos){

    limpiarHTML();
    
    productos.forEach( producto => {
        const {imagen,marca, precio, memoriaRam, condicion, puertos, tipoPantalla} = producto;
        
        const cards = document.createElement('DIV');
        cards.classList.add('card');

        const card = document.createElement('DIV');
        card.classList.add('card');

        const info = document.createElement('DIV');

        const infoParrafo = document.createElement('P');
        infoParrafo.innerHTML += `
            <img src="${imagen}" class="produc-img"/>
            <p><strong>${marca}</strong> pantalla ${tipoPantalla} Monitor</p>
            <p>${memoriaRam}GB RAM</p>
            <p>${puertos} Entradas HDMI</p>
            <strong class="condicion">(${condicion})</strong>
            <strong>$${precio}°°</strong>
        `;

        card.appendChild(info);
        info.appendChild(infoParrafo);
        resultado.appendChild(card);
    });
}
function filtrarProducto(){
    const resultado = productos.filter(filtrarMarca).filter(filtarMinimo).filter(filtrarMaximo).filter(filtrarRam).filter(filtrarCondicion).filter(filtrarPuertos).filter(filtrarTipoPantalla);
    
    if(resultado.length){
        mostrarEquipos(resultado);
    }else{
        mostrarMensaje();
    }
}

function filtrarMarca(producto){
    const {marca} = objectoBusqueda;
    if(marca){
        return producto.marca === marca;
    }
    return producto
}
function filtarMinimo(producto){
    const {minimo} = objectoBusqueda;
    if(minimo){
        return producto.precio >= minimo;
    }
    return producto
}
function filtrarMaximo(producto){
    const {maximo} = objectoBusqueda;
    if(maximo){
        return producto.precio <= maximo;
    }
    return producto
}
function filtrarRam(producto){
    const {memoria} = objectoBusqueda;
    if(memoria){
        return producto.memoriaRam === memoria;
    }
    return producto
}
function filtrarCondicion(producto){
    const {condicion} = objectoBusqueda;
    if(condicion){
        return producto.condicion === condicion;
    }
    return producto
}
function filtrarPuertos(producto){
    const {puertos} = objectoBusqueda;
    if(puertos){
        return producto.puertos === puertos;
    }
    return producto
}
function filtrarTipoPantalla(producto){
    const {pantalla} = objectoBusqueda;
    if(pantalla){
        return producto.tipoPantalla === pantalla;
    }

    return producto
}

function mostrarMensaje(){

    limpiarHTML();

    const alerta = document.createElement('P');
    alerta.classList.add('alerta');
    alerta.textContent = 'No hay resultados con los filtros seleccionados';

    resultado.appendChild(alerta)
}
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}