document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("servicios-contenedor");

  if (!contenedor) return;

  fetch("paquetes.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar paquetes.json");
      }
      return response.json();
    })
    .then(data => {
      renderizarPaquetes(data);
    })
    .catch(error => {
      console.error("Error cargando paquetes:", error);
      contenedor.innerHTML = "<p class='text-center text-danger'>Hubo un error cargando los servicios. Por favor intenta más tarde.</p>";
    });

  function renderizarPaquetes(categorias) {
    let html = "";

    categorias.forEach(categoria => {
      html += `
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">${categoria.categoria}</h1>
        <div class="card-deck mb-3 text-center">
      `;

      categoria.paquetes.forEach(paquete => {
        // Determinar qué clase de botón usar según si es destacado o no
        const btnClass = paquete.destacado ? "btn-outline-primary" : "btn-primary";
        
        let lis = "";
        paquete.caracteristicas.forEach(caract => {
          lis += `<li>${caract}</li>`;
        });

        html += `
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">${paquete.nombre}</h4>
            </div>
            <div class="card-body d-flex flex-column">
              <h1 class="card-title pricing-card-title">${paquete.precio}</h1>
              <ul class="list-unstyled mt-3 mb-4 flex-grow-1">
                ${lis}
              </ul>
              <button type="button" class="btn btn-lg btn-block ${btnClass} mt-auto" onclick="window.location='${paquete.linkUrl}'">
                ${paquete.linkTexto}
              </button>
            </div>
          </div>
        `;
      });

      html += `
        </div>
      </div>
      `;
    });

    contenedor.innerHTML = html;
  }
});
