document.addEventListener('DOMContentLoaded', () => {
    
    // objecto
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //variables
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('button[type="submit"]');
    const btnReset = document.querySelector('button[type="reset"]');
    const spinner = document.querySelector('#spinner');


    //eventos
    inputEmail.addEventListener('blur', validar);
    inputCC.addEventListener('input', validarCC);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        resetFormulario();
    });

    formulario.addEventListener('submit', enviarEmail);

    function validarCC(e){
        if(e.target.id !== '' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            return;
        }
        limpiarAlerta(e.target.parentElement);
        // comprobarEmail();
    }
    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if( e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return
        }
        
        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim();

        comprobarEmail();
    }

    function enviarEmail(e){

        console.log(email)
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //crear alerta de exito
            const alertaExisto = document.createElement('P');
            alertaExisto.classList.add('exito');
            alertaExisto.textContent = 'Se ha enviado correctamente';

            formulario.appendChild(alertaExisto);

            setTimeout(() => {
                alertaExisto.remove();
            }, 3000);
        }, 3000);

    }



    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return;
        }

            btnSubmit.classList.remove('opacity');
            btnSubmit.disabled = false;
    }

    function mostrarAlerta(mensaje, referencia){   
        //limpiar alerta
        limpiarAlerta(referencia);

        //crear alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error', 'existe');

        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const existe = referencia.querySelector('.existe');
        existe?.remove();
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function resetFormulario(){
        //reiniciamos el objecto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
 
        //reiniciamos el formulario
        formulario.reset();

        comprobarEmail();
    }
});