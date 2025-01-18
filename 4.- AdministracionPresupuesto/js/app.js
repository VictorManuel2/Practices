//Variables
// const inputNombre = document.querySelector('#nombre-gasto').value;
// const inputCantidad = document.querySelector('#cantidad').value;
const formulario = document.querySelector('#form');
const listadoGastos = document.querySelector('#gastos ul');

let presupuesto;
let gastos = [];


//eventos
eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', agregarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}



function agregarPresupuesto(){
    presupuesto = prompt('¿Cual es su presupuesto?');

    if(presupuesto === '' || presupuesto === null || isNaN(presupuesto) || presupuesto <= 0){
        window.location.reload();
        return;
    }

    mostrarPresupuesto(Number(presupuesto));
}


function mostrarPresupuesto(cantidad){
    document.querySelector('#total').textContent = cantidad;
    document.querySelector('#restante').textContent = cantidad;

    console.log(typeof cantidad)
}   

function agregarGasto(e){
    e.preventDefault();
    
    const nombre = document.querySelector('#nombre-gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if(nombre === '' || cantidad === ''){
        mostrarAlerta('Los campos son obligatorios', 'error');
        return;
    }

    //Creamos objecto en donde se almacenarán los datos que se ingresen a los campos del formulario

    const gasto = {
        nombre,
        cantidad,
        id: Date.now()
    }

    mostrarAlerta('Gasto agregado correctamente');

    gastos = [...gastos, gasto];

    mostrarGastos(gastos);
}
function mostrarGastos(gastos){

    limpiarHTML();

    gastos.forEach(gasto => {
       const {nombre, cantidad, id} = gasto;

       const nuevoGasto = document.createElement('LI');
       nuevoGasto.dataset.id = id;

       nuevoGasto.innerHTML = `${nombre} <span class="cantidad"> $${cantidad} <span>`;

       const btnBorrar = document.createElement('button');
       btnBorrar.classList.add('borrar');
       btnBorrar.innerHTML = 'Borrar &times;';

       btnBorrar.onclick = () => {
            eliminarGasto(id);
       }

       nuevoGasto.appendChild(btnBorrar);

       listadoGastos.appendChild(nuevoGasto)
    });
}

function eliminarGasto(id){
    gastos = gastos.filter( gasto => gasto.id !== id);

    mostrarGastos(gastos)
}

function limpiarHTML(){
    while(listadoGastos.firstChild){
        listadoGastos.removeChild(listadoGastos.firstChild);
    }
}

function mostrarAlerta(mensaje, tipo){
    const alerta = document.createElement('DIV');

    const existeAlerta = document.querySelector('.divAlerta');
    existeAlerta?.remove();

    if(tipo === 'error'){
        alerta.classList.add('error');
    }else{
        alerta.classList.add('exito');
    }
    alerta.classList.add('divAlerta');
    alerta.textContent = mensaje;

    document.querySelector('.left').insertBefore(alerta, formulario);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}