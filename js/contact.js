// js/contact.js

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita abrir correo
            
            // Recolectar datos
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const servicio = document.getElementById('servicio').value;
            const fecha = document.getElementById('fecha').value;
            const mensaje = document.getElementById('mensaje').value;

            // Formatear mensaje para WhatsApp respetando retornos de carro
            let textoWa = `¡Hola Equipo PholapSC! Estoy interesado en sus servicios de fotografía.%0A%0A`;
            textoWa += `*Nombre:* ${nombre}%0A`;
            textoWa += `*Teléfono:* ${telefono}%0A`;
            textoWa += `*Correo:* ${email}%0A`;
            textoWa += `*Servicio de Interés:* ${servicio}%0A`;
            if(fecha) {
                textoWa += `*Fecha Estimada:* ${fecha}%0A`;
            }
            textoWa += `%0A*Mensaje:* ${mensaje}`;

            // Número destino principal de atención al cliente
            const numero = "593963861292";
            
            // Crear el link interactivo de api whatsapp
            const url = `https://api.whatsapp.com/send?phone=${numero}&text=${textoWa}`;
            
            // Abrir en nueva pestaña la app de WhatsApp
            window.open(url, '_blank');
        });
    }
});
