document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("servicios-contenedor");

  if (!contenedor) return;

  // Use the global basePath set by each HTML page
  var base = (typeof basePath !== 'undefined') ? basePath : '';

  // Category theme map: color, icon (Bootstrap Icons), gradient
  const categoryThemes = {
    "Bodas": {
      color: "#7f1300",
      icon: "bi-gem",
      gradient: "linear-gradient(135deg, #7f1300, #a82010)"
    },
    "Eventos": {
      color: "#9a6c1e",
      icon: "bi-calendar-event",
      gradient: "linear-gradient(135deg, #7a5518, #b8860b)"
    },
    "Sesiones Personales": {
      color: "#1c3d5a",
      icon: "bi-person-bounding-box",
      gradient: "linear-gradient(135deg, #1c3d5a, #2a5f8f)"
    },
    "Familiares": {
      color: "#8b4513",
      icon: "bi-people",
      gradient: "linear-gradient(135deg, #6d3710, #a0522d)"
    },
    "En Estudio": {
      color: "#2c3e50",
      icon: "bi-lightbulb",
      gradient: "linear-gradient(135deg, #1a252f, #34495e)"
    }
  };

  // Default theme for unknown categories
  const defaultTheme = {
    color: "#7f1300",
    icon: "bi-camera",
    gradient: "linear-gradient(135deg, #7f1300, #a82010)"
  };

  fetch(base + "paquetes.json")
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
      const theme = categoryThemes[categoria.categoria] || defaultTheme;

      html += `
      <div class="category-section mb-5" style="--cat-color: ${theme.color}; --cat-gradient: ${theme.gradient};">
        <div class="category-banner" style="background: ${theme.gradient};">
          <div class="container text-center">
            <i class="bi ${theme.icon} category-banner-icon"></i>
            <h2 class="category-banner-title">${categoria.categoria}</h2>
          </div>
        </div>
        <div class="container">
          <div class="row pt-4 justify-content-center">
      `;

      categoria.paquetes.forEach(paquete => {
        const destacCls = paquete.destacado ? "destacado" : "";
        
        let lis = "";
        paquete.caracteristicas.forEach(caract => {
          lis += `<li>${caract}</li>`;
        });

        html += `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="plan-card ${destacCls}" style="--cat-color: ${theme.color};">
              <div class="plan-card-header" style="background: ${destacCls ? theme.gradient : '#f8f9fa'}; ${destacCls ? 'color: white;' : ''}">
                <h4 class="plan-card-title">${paquete.nombre}</h4>
              </div>
              <div class="plan-card-body">
                <div class="plan-price">${paquete.precio}</div>
                <ul class="list-unstyled plan-features">
                  ${lis}
                </ul>
                <button type="button" class="btn btn-plan mt-auto w-100" style="background-color: ${theme.color}; color: #fff; border: 2px solid ${theme.color};" onmouseover="this.style.opacity='0.85'; this.style.transform='translateY(-2px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'" onclick="window.location='${paquete.linkUrl}'">
                  ${paquete.linkTexto}
                </button>
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      </div>
      `;
    });

    contenedor.innerHTML = html;
  }
});
