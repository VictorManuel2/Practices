//Variables
const formulario = document.querySelector('#form');
const listadoGastos = document.querySelector('#gastos ul');

let presupuesto;
let gastos = [];


//EVENTOS
eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', agregarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


//FUNCIONES

function agregarPresupuesto(){
    presupuesto = Number(prompt('¿Cual es su presupuesto?'));

    if(presupuesto === '' || presupuesto === null || isNaN(presupuesto) || presupuesto <= 0){
        window.location.reload();
        return;
    }

    mostrarPresupuesto(presupuesto);
}


function mostrarPresupuesto(cantidad){
    document.querySelector('#total').textContent = cantidad;
    document.querySelector('#restante').textContent = cantidad;

}   

function agregarGasto(e){
    e.preventDefault();
    
    const nombre = document.querySelector('#nombre-gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if(nombre === '' || cantidad === ''){
        mostrarAlerta('Los campos son obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        mostrarAlerta('Cantidad no válida', 'error');
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

    calcularRestastante();

    comprobarPresupuesto(presupuesto);

    formulario.reset();
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

       listadoGastos.appendChild(nuevoGasto);
    });
}

function calcularRestastante(){
    let gastado = gastos.reduce((total, gasto) => total += Number(gasto.cantidad), 0);

    let restante = presupuesto - gastado;
    

    document.querySelector('#restante').textContent = restante;
}

function comprobarPresupuesto(presupuesto){
    const restante = Number(document.querySelector('#restante').textContent);

    const divRestante = document.querySelector('.restante');

    if((presupuesto / 5) > restante){
        divRestante.classList.remove('restante-alto');
        divRestante.classList.add('restante-bajo');
    }else{
        divRestante.classList.remove('restante-bajo');
        divRestante.classList.add('restante-alto')
    }

    if(restante <= 0){
        mostrarAlerta('El presupuesto se ha agotado', 'error');
        formulario.querySelector('button[type="submit"]').disabled = true;
    }

    if(restante > 0){
        formulario.querySelector('button[type="submit"]').disabled = false;
    }
}

function eliminarGasto(id){
    gastos = gastos.filter( gasto => gasto.id !== id);

    mostrarGastos(gastos);

    calcularRestastante();
    
    comprobarPresupuesto(presupuesto);
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