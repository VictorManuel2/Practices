document.addEventListener('DOMContentLoaded', function(){

    const info = {
        nombre: '',
        email: '',
        mensaje: ''
    }
    //variables
    const inputName = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('button[type="submit"]');
    const spinner = document.querySelector('#spinner');

    //eventos
    inputName.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputMessage.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarInfo);

    function enviarInfo(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        
        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            
            //mostrar mensaje de exito
            const exito = document.createElement('P');
            exito.classList.add('exito');
            exito.textContent = 'Se ha enviado correctamente la información';

            formulario.appendChild(exito);

            reiniciarFormulario();
            
            setTimeout(() => {
                exito.remove();
            }, 3000);    
        }, 3000);

        
    }

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarMensaje(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            info[e.target.name] = '';
            comprobarInformacion();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            info[e.target.name] = '';
            mostrarMensaje(`El email no es válido`, e.target.parentElement);
            return;
        }

        limpiarAlerta(e.target.parentElement)

        info[e.target.name] = e.target.value.trim()

        comprobarInformacion();
    }

    function comprobarInformacion(){
        if(Object.values(info).includes('')){
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return
        }
        
            btnSubmit.classList.remove('opacity');
            btnSubmit.disabled = false;
    }

    function mostrarMensaje(mensaje, referencia){

        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.classList.add('error', 'existe');
        error.textContent = mensaje;

        referencia.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 3000);
    }
    function limpiarAlerta(referencia){
        const existe = referencia.querySelector('.existe');
        existe?.remove();
    }
    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function reiniciarFormulario(){
        //reiniciamos objecto
        info.nombre = '';
        info.email = '';
        info.mensaje = '';

        //reseteamos el formulario
        formulario.reset();

        comprobarInformacion();

    }
})