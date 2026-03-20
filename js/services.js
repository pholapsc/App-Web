document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("servicios-contenedor");

  if (!contenedor) return;

  // Use the global basePath set by each HTML page
  var base = (typeof basePath !== 'undefined') ? basePath : '';

  // Category theme map: color, icon (Bootstrap Icons), gradient
  const categoryThemes = {
    "Bodas": {
      color: "#7F1300", // The Signature Wine Red
      icon: "bi-gem",
      gradient: "linear-gradient(135deg, #4D0B00, #7F1300)"
    },
    "Eventos": {
      color: "#996515", // Antique Gold - Muted and rich
      icon: "bi-calendar-event",
      gradient: "linear-gradient(135deg, #66440D, #996515)"
    },
    "Sesiones Personales": {
      color: "#004D40", // Deep Teal - Sophisticated contrast
      icon: "bi-person-bounding-box",
      gradient: "linear-gradient(135deg, #002620, #004D40)"
    },
    "Familiares": {
      color: "#5D2E2E", // Deep Terracotta - Warm & grounded
      icon: "bi-people",
      gradient: "linear-gradient(135deg, #3D1F1F, #5D2E2E)"
    },
    "En Estudio": {
      color: "#212121", // Deep Charcoal - Classic Pro
      icon: "bi-lightbulb",
      gradient: "linear-gradient(135deg, #000000, #212121)"
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
