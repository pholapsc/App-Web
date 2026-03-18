document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.getElementById("portfolio-filters");
  const galleryContainer = document.getElementById("portfolio-gallery");

  if (!filterContainer || !galleryContainer) return;

  fetch("portfolio-data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Cannot load JSON");
      }
      return response.text();
    })
    .then(text => {
      let data = [];
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Fallback robusto para prueba local (sin Jekyll)
        console.warn("La plantilla de Jekyll para JSON no fue parseada. Usando datos de prueba local.", e);
        data = [
           "img/portfolio/Bodas/DSC_1131.jpg",
           "img/portfolio/Bodas/DSC_1184.jpg",
           "img/portfolio/Retratos/demo3.jpg",
           "img/portfolio/Eventos/demo4.jpg",
           "img/portfolio/Estudio/demo5.jpg"
        ];
      }
      renderPortfolio(data);
    })
    .catch(error => {
      console.warn("Usando datos de prueba por error de fetch local:", error);
      const mockData = [
           "img/portfolio/Bodas/DSC_1131.jpg",
           "img/portfolio/Bodas/DSC_1184.jpg",
           "img/portfolio/Retratos/demo3.jpg",
           "img/portfolio/Eventos/demo4.jpg",
           "img/portfolio/Estudio/demo5.jpg"
      ];
      renderPortfolio(mockData);
    });

  function renderPortfolio(imagePaths) {
    if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
      galleryContainer.innerHTML = "<p class='text-center text-muted col-12 py-5'>Aún no hay imágenes en el portafolio. ¡Sube fotos a img/portfolio/Categoría/!</p>";
      return;
    }

    // Ensure standard categories always appear even if no images exist yet
    const categories = new Set(["Bodas", "Estudio", "Eventos", "Retratos", "Naturaleza"]);
    const items = [];

    // Parse folder structure: /img/portfolio/{Category}/{File}
    imagePaths.forEach(path => {
      // Ignorar archivos no desados como el propio json o gitkeeps
      if(path.endsWith('.json') || path.endsWith('.gitkeep')) return;

      const parts = path.split('/');
      const portfolioIdx = parts.indexOf('portfolio');
      let category = "Otros";
      
      if (portfolioIdx !== -1 && parts.length > portfolioIdx + 2) {
         category = parts[portfolioIdx + 1];
      }
      
      categories.add(category);
      items.push({
         path: path,
         category: category
      });
    });

    if (items.length === 0) {
        galleryContainer.innerHTML = "<p class='text-center text-muted col-12 py-5'>Aún no hay imágenes en el portafolio. ¡Sube fotos a img/portfolio/Categoría/!</p>";
        return;
    }

    // Render Filters
    let filtersHtml = `<button class="filter-btn active" data-filter="all">Todos</button>`;
    Array.from(categories).sort().forEach(cat => {
      const displayCat = cat.replace(/-/g, ' ');
      filtersHtml += `<button class="filter-btn" data-filter="${cat}">${displayCat}</button>`;
    });
    filterContainer.innerHTML = filtersHtml;

    // Render Grid items
    let galleryHtml = "";
    items.forEach(item => {
      // Usar placeholder image proxy si la imagen no existe en entornos locales
      // Unsplash Source API está deprecada pero images.unsplash.com sirve bien
      let imgSrc = item.path;
      if (item.path.includes("demo")) {
          imgSrc = `https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop`;
      }
      
      galleryHtml += `
        <div class="portfolio-item fade-in" data-category="${item.category}">
          <img src="${imgSrc}" alt="Fotografía de ${item.category}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop';">
          <div class="portfolio-overlay">
            <h3 class="portfolio-category-label">${item.category.replace(/-/g, ' ')}</h3>
          </div>
        </div>
      `;
    });
    galleryContainer.innerHTML = galleryHtml;

    // Setup filtering logic
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const portfolioItems = galleryContainer.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          item.classList.remove('fade-in');
          
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.classList.add('fade-in');
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    // Function to apply filter based on URL hash
    function applyHashFilter() {
      const currentHash = window.location.hash.substring(1);
      if (currentHash) {
        const targetBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === currentHash);
        if (targetBtn) {
          // Usa un slight delay por si la animación interfiere
          setTimeout(() => targetBtn.click(), 50);
        }
      }
    }

    // Apply filter on initial load
    applyHashFilter();

    // Listen for hash changes (e.g. clicking header dropdown while already on the page)
    window.addEventListener('hashchange', applyHashFilter);
  }
});
