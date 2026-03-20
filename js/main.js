$(function(){
    // basePath is set by each page before loading this script
    // Root pages: var basePath = '';
    // Subdirectory pages: var basePath = '../';
    var base = (typeof basePath !== 'undefined') ? basePath : '';

    $("#nav-placeholder").load(base + "header.html", function() {
        // Fix relative paths in loaded header content
        if (base) {
            $("#nav-placeholder").find("img").each(function() {
                var src = $(this).attr("src");
                if (src && !src.startsWith("http") && !src.startsWith("//") && !src.startsWith(base)) {
                    $(this).attr("src", base + src);
                }
            });
            $("#nav-placeholder").find("a").each(function() {
                var href = $(this).attr("href");
                if (href && !href.startsWith("http") && !href.startsWith("//") && !href.startsWith("#") && !href.startsWith(base)) {
                    $(this).attr("href", base + href);
                }
            });
        }

        // Dynamic portfolio dropdown
        fetch(base + "portfolio-data.json")
            .then(response => {
                if (!response.ok) throw new Error("No JSON");
                return response.text();
            })
            .then(text => {
                let data = [];
                try {
                    data = JSON.parse(text);
                } catch(e) {
                    data = [
                       "img/portfolio/Bodas/DSC_1131.jpg",
                       "img/portfolio/Bodas/DSC_1184.jpg",
                       "img/portfolio/Retratos/demo3.jpg",
                       "img/portfolio/Naturaleza/demo4.jpg"
                    ];
                }
                construirMenu(data, base);
            })
            .catch(() => {
                const mockData = [
                   "img/portfolio/Bodas/DSC_1131.jpg",
                   "img/portfolio/Bodas/DSC_1184.jpg",
                   "img/portfolio/Retratos/demo3.jpg",
                   "img/portfolio/Naturaleza/demo4.jpg"
                ];
                construirMenu(mockData, base);
            });

        function construirMenu(imagePaths, bp) {
            const menuContainer = document.getElementById("portfolio-dropdown-menu");
            if (!menuContainer || !Array.isArray(imagePaths)) return;

            const categories = new Set();
            imagePaths.forEach(path => {
                if(path.endsWith('.json') || path.endsWith('.gitkeep') || path.endsWith('.txt')) return;
                const parts = path.split('/');
                const idx = parts.indexOf('portfolio');
                if (idx !== -1 && parts.length > idx + 2) {
                    categories.add(parts[idx + 1]);
                }
            });

            if (categories.size > 0) {
                let html = "";
                Array.from(categories).sort().forEach(cat => {
                    html += `<li><a class="dropdown-item" href="${bp}galery/#${cat}">${cat.replace(/-/g, ' ')}</a></li>`;
                });
                html += `<li><hr class="dropdown-divider"></li>`;
                html += `<li><a class="dropdown-item" href="${bp}galery/">Ver Todo el Portafolio</a></li>`;
                menuContainer.innerHTML = html;
            } else {
                menuContainer.innerHTML = `<li><a class="dropdown-item" href="${bp}galery/">Ver Todo el Portafolio</a></li>`;
            }
        }
    });

    $("#footer-placeholder").load(base + "footer.html", function() {
        // Fix relative paths in loaded footer content
        if (base) {
            $("#footer-placeholder").find("img").each(function() {
                var src = $(this).attr("src");
                if (src && !src.startsWith("http") && !src.startsWith("//") && !src.startsWith(base)) {
                    $(this).attr("src", base + src);
                }
            });
            $("#footer-placeholder").find("a").each(function() {
                var href = $(this).attr("href");
                if (href && !href.startsWith("http") && !href.startsWith("//") && !href.startsWith("#") && !href.startsWith(base)) {
                    $(this).attr("href", base + href);
                }
            });
        }
    });
  });
