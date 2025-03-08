const inputUrl = document.querySelector('#url');
const formulario = document.querySelector('#qr-form');
const resultDiv = document.querySelector('#result');
const downloand = document.querySelector('.download')

const QR =  new QRCode(resultDiv);


document.addEventListener('DOMContentLoaded', () => {


    formulario.addEventListener('submit', submitFormulario);

    function submitFormulario(e){
        e.preventDefault();
    
        if(inputUrl.value.trim() === ''){
            mostrarMensaje('El campo es obligatorio');
            return
        }

        generarCodigoQR(inputUrl.value);

        setTimeout(() => {
            formulario.reset();
        }, 300);

    }

    function generarCodigoQR(url){
        setTimeout(() => {
            QR.makeCode(url)
            const qrCanvas = resultDiv.querySelector('canvas'); 
            if (qrCanvas) {
                const qrImage = qrCanvas.toDataURL('image/png'); 
                downloand.href = qrImage; 
                downloand.download = "qrcode.png";
                downloand.style.display = 'block';
            }
        }, 500);
        
    }
    
    function mostrarMensaje(mensaje){

        const existeAlerta = document.querySelector('.alert')
        existeAlerta?.remove();

        const divError = document.createElement('DIV');
        divError.classList.add('error', 'alert');
        divError.textContent = mensaje;

        formulario.appendChild(divError)

        setTimeout(() => {
            divError.remove();
        }, 3000);
    }
})
