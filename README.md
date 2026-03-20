# 📸 PholapSC - Portafolio Fotográfico Premium

Bienvenido al repositorio oficial de **PholapSC**, una plataforma web diseñada para exhibir servicios fotográficos de alta gama con una estética elegante, moderna y profesional.

## 🚀 Características Principales

- **Diseño Premium:** Interfaz basada en una paleta de colores "Rojo Vino y Blanco" con acentos en tonos joya mate (Velo de Terciopelo).
- **URLs Limpias (SEO Friendly):** Estructura de directorios que permite navegar sin extensiones `.html` (ej: `/services/` en lugar de `/services.html`).
- **Totalmente Responsivo:** Optimizado para smartphones, tablets y desktops utilizando Bootstrap 5 y Media Queries personalizadas.
- **Dinamismo con JS:** 
  - Carruseles dinámicos en la página de inicio.
  - Galería con filtros de categorías en tiempo real.
  - Dashboard de servicios generado dinámicamente desde archivos JSON.
- **Integración con WhatsApp:** Formulario de contacto y botones de reserva vinculados directamente a WhatsApp Business.

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Frameworks/Librerías:** 
  - [Bootstrap 5.1.1](https://getbootstrap.com/) (Layout y Componentes).
  - [jQuery](https://jquery.com/) (Carga de fragmentos de Header/Footer).
  - [Bootstrap Icons](https://icons.getbootstrap.com/).
- **Almacenamiento de Datos:** JSON (`paquetes.json`, `portfolio-data.json`).
- **Hosting:** Optimizado para [GitHub Pages](https://pages.github.com/).

## 📁 Estructura del Proyecto

```text
App-Web/
├── index.html              # Página de Inicio
├── header.html             # Componente de navegación compartido
├── footer.html             # Componente de pie de página compartido
├── packages.json           # Base de datos de servicios/precios
├── portfolio-data.json     # Base de datos de imágenes del portafolio
├── about/
│   └── index.html          # Sección "Nosotros"
├── contact/
│   └── index.html          # Sección "Contacto"
├── services/
│   └── index.html          # Sección "Servicios"
├── galery/
│   └── index.html          # Sección "Portafolio"
├── css/                    # Estilos específicos por página
├── js/                     # Lógica de componentes y dinamismo
├── img/                    # Activos visuales y fotos de portafolio
└── fonts/                  # Tipografías (Montserrat, DisplayLight)
```

## 💻 Configuración Local y Desarrollo

Para trabajar en este proyecto localmente, se recomienda seguir estos pasos:

1. **Servidor Local:** Debido a que el proyecto utiliza rutas relativas (`../`) y carga fragmentos HTML mediante AJAX (jQuery `.load()`), **no se recomienda** abrir los archivos directamente (`file://`).
   - Usa la extensión **"Live Server"** en VS Code o cualquier servidor HTTP local.
2. **Estructura de Rutas:** Si añades nuevas carpetas, asegúrate de declarar la variable `basePath` antes de cargar `main.js`:
   ```html
   <script>var basePath = '../';</script>
   <script src="../js/main.js"></script>
   ```

## 🌐 Despliegue

El proyecto está diseñado para funcionar perfectamente en **GitHub Pages**. Al subir los cambios (`git push`), GitHub servirá automáticamente las carpetas como URLs limpias manejando los archivos `index.html` internos.

---
**Desarrollado por PholapSC**  
*Capturando momentos, contando historias.*
