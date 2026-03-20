// js/index.js

document.addEventListener("DOMContentLoaded", () => {
    // Categories we want to build carousels for in the Home page
    const targetCategories = ["Bodas", "Retratos", "Naturaleza"];
    
    fetch("portfolio-data.json")
        .then(response => {
            if (!response.ok) throw new Error("No JSON");
            return response.text();
        })
        .then(text => {
            let data = [];
            try {
                data = JSON.parse(text);
            } catch(e) {
                // Mock data para probar localmente con las extensiones correctas (.webp)
                data = [
                   "img/portfolio/Bodas/DSC_1155.webp",
                   "img/portfolio/Bodas/DSC_1186.webp",
                   "img/portfolio/Retratos/DSC_3254.webp",
                   "img/portfolio/Retratos/DSC_3258.webp",
                   "img/portfolio/Naturaleza/DSC_7037.webp",
                   "img/portfolio/Naturaleza/DSC_7061.webp"
                ];
            }
            buildCarousels(data);
        })
        .catch(() => {
            const mockData = [
               "img/portfolio/Bodas/DSC_1155.webp",
               "img/portfolio/Bodas/DSC_1186.webp",
               "img/portfolio/Retratos/DSC_3254.webp",
               "img/portfolio/Naturaleza/DSC_7037.webp"
            ];
            buildCarousels(mockData);
        });

    function buildCarousels(imagePaths) {
        if (!Array.isArray(imagePaths)) return;

        // Agrupar imágenes por categoría
        const categorizedImages = {};
        targetCategories.forEach(cat => categorizedImages[cat] = []);

        imagePaths.forEach(path => {
            if(path.endsWith('.json') || path.endsWith('.gitkeep') || path.endsWith('.txt')) return;
            
            const parts = path.split('/');
            const idx = parts.indexOf('portfolio');
            if (idx !== -1 && parts.length > idx + 2) {
                const category = parts[idx + 1];
                if (targetCategories.includes(category)) {
                    categorizedImages[category].push(path);
                }
            }
        });

        // Construir los inner de cada carrusel
        targetCategories.forEach(cat => {
            const container = document.getElementById(`carousel-inner-${cat}`);
            if (!container) return;

            const images = categorizedImages[cat];
            let html = "";

            if (images.length === 0) {
                // Imagen por defecto si la categoría está vacía en este momento
                const fallbackUrl = `https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop`;
                html = `
                <div class="carousel-item active">
                    <img src="${fallbackUrl}" class="d-block w-100 service-carousel-img" alt="Próximamente">
                </div>`;
            } else {
                // Rotar hasta 5 imágenes máximo por categoría para el inicio para no sobrecargar
                const maxImages = images.slice(0, 5);
                maxImages.forEach((imgSrc, idx) => {
                    const activeClass = idx === 0 ? "active" : "";
                    html += `
                    <div class="carousel-item ${activeClass}">
                        <!-- Fallback visual onerror si la imagen local se rompe -->
                        <img src="${imgSrc}" class="d-block w-100 service-carousel-img" alt="PholapSC ${cat}" onerror="this.src='https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop';">
                    </div>`;
                });
            }

            container.innerHTML = html;
        });
    }
});
