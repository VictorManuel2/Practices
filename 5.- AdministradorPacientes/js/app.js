//variables
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#citas');

const btnSubmit = document.querySelector('#formulario-cita input[type="submit"]');

const modal = document.querySelector('.modal');
const confirmar = document.querySelector('.option-confirm .confirm');
const noConfirmar = document.querySelector('.option-confirm .noConfirm');

let editando = false;

//array de citas
let citas = [];

const objectoCitas = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

//event listeners

pacienteInput.addEventListener('change', datosCitas);
propietarioInput.addEventListener('change', datosCitas)
emailInput.addEventListener('change', datosCitas);
fechaInput.addEventListener('change', datosCitas);
sintomasInput.addEventListener('change', datosCitas);


formulario.addEventListener('submit', submitFomulario);



document.addEventListener('DOMContentLoaded', () => {
    //mostrar lo que se tiene guardado en el localStorage
    citas = JSON.parse(localStorage.getItem('citas')) || [];
    mostrarCita(citas);
})
//funciones

function datosCitas(e){
    objectoCitas[e.target.name] = e.target.value;
}

function submitFomulario(e){
    e.preventDefault();
    
    if(Object.values(objectoCitas).some(valor => valor.trim() === '')){
        mostrarMensaje('Los campos son obligatorios', 'error');
        return;
    }


    // Para evitar que se rescriban los valores al agregar un nuevo paciente debemos crear una copia de objectoCitas de esta forma {...objectoCitas};

    if(editando){
        editarCita({...objectoCitas});
        mostrarMensaje('Actualizado correctamente');
    }else{     
        citas = [...citas, {...objectoCitas}];
        mostrarMensaje('Paciente agregado correctamente', 'exito');
    }
    mostrarCita(citas);
    
    formulario.reset();
    limpiarObjectoCitas();

    editando = false;
    btnSubmit.value = 'Registrar Paciente';
}

function guardarLocalStorage(){
    localStorage.setItem('citas', JSON.stringify(citas))
}

function mostrarCita(citas){

    limpiarHTML();

    if(citas.length === 0){
        const p = document.createElement('P');
        contenedorCitas.innerHTML = '<p class="citas-text">No hay pacientes</p>'
    }
    
    citas.forEach(cita => {
        const {id, paciente, propietario, email, fecha, sintomas} = cita;

        const divCitas = document.createElement('DIV');
        divCitas.classList.add('citas-info');

        const parrafoPaciente = document.createElement('P');
        parrafoPaciente.classList.add('dato');
        parrafoPaciente.innerHTML = `PACIENTE: <span>${paciente}</span>`;

        const parrafoPropietario = document.createElement('P');
        parrafoPropietario.classList.add('dato');
        parrafoPropietario.innerHTML = `PROPIETARIO: <span>${propietario}</span>`;

        const parrafoEmail = document.createElement('P');
        parrafoEmail.classList.add('dato');
        parrafoEmail.innerHTML = `EMAIL: <span>${email}</span>`;

        const parrafoFecha = document.createElement('P');
        parrafoFecha.classList.add('dato');
        parrafoFecha.innerHTML = `FECHA: <span>${fecha}</span>`;

        const parrafoSintomas = document.createElement('P');
        parrafoSintomas.classList.add('dato');
        parrafoSintomas.innerHTML = `SINTOMAS: <span>${sintomas}</span>`;


        const divBotones = document.createElement('DIV');
        divBotones.classList.add('btn-accion');

        //Crear botón de editar
        const btnEditar = document.createElement('BUTTON');
        btnEditar.classList.add('editar');
        btnEditar.innerHTML = ` Editar
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`;

        const clone = structuredClone(cita);

        btnEditar.onclick = () => {
            cargarEdicion(clone);
        }

        //Crear botón de eliminar
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('eliminar');
        btnEliminar.innerHTML = ` Eliminar
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>`;

        btnEliminar.onclick = () => {
            eliminarCita(id);
        }

        divBotones.appendChild(btnEditar);
        divBotones.appendChild(btnEliminar);

        divCitas.appendChild(parrafoPaciente);
        divCitas.appendChild(parrafoPropietario);
        divCitas.appendChild(parrafoEmail);
        divCitas.appendChild(parrafoFecha);
        divCitas.appendChild(parrafoSintomas);

        divCitas.appendChild(divBotones);


        contenedorCitas.appendChild(divCitas);
    });
    
    guardarLocalStorage();
}


function eliminarCita(id){
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';

    confirmar.onclick = () =>{
        if(confirmar.value === 'Eliminar'){
            citas = citas.filter( cita => cita.id !== id);
            mostrarCita(citas);
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            return;
        }
    }
    
    noConfirmar.onclick = () => {
        if(noConfirmar.value === 'Cancelar'){
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
    }
    
}

function editarCita(citaAct){
    citas = citas.map( cita => cita.id === citaAct.id ? citaAct : cita);

    mostrarCita(citas);
}

function cargarEdicion(cita){
    Object.assign(objectoCitas, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;


    editando = true;

    btnSubmit.value = 'Editar Paciente';

}
function limpiarHTML(){
    while(contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
}

function generarId(){
    return Math.random().toString(36).substring(2) + Date.now();
}

function limpiarObjectoCitas(){
    objectoCitas.id = generarId();
    objectoCitas.paciente = '';
    objectoCitas.propietario = '';
    objectoCitas.email = '';
    objectoCitas.fecha = '';
    objectoCitas.sintomas = '';
}


function mostrarMensaje(mensaje, tipo){
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('alerta');
    
    const existe = document.querySelector('.alerta');
    existe?.remove();


    if(tipo === 'error'){
        divMensaje.classList.add('error');
    }else{
        divMensaje.classList.add('exito');
    }

    divMensaje.textContent = mensaje;

    document.querySelector('.div-left').insertBefore(divMensaje, formulario);

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);

}