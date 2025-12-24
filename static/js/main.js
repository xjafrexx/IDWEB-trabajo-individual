const URL_AGENTES = 'https://valorant-api.com/v1/agents?language=es-MX&isPlayableCharacter=true';
const URL_ARMAS = 'https://valorant-api.com/v1/weapons?language=es-MX';

const contenedor = document.getElementById("contenido-dinamico");
const buscador = document.getElementById("buscador");
const rutaActual = window.location.pathname;

let datosGlobales = [];

function iniciar() {
    if (!contenedor) return;

    if (rutaActual.includes("agentes")) {
        cargarDatos(URL_AGENTES, "agentes");
    } else if (rutaActual.includes("armas")) {
        cargarDatos(URL_ARMAS, "armas");
    }
}

function cargarDatos(url, tipo) {
    contenedor.innerHTML = '<p style="color:white; font-size:1.2rem;">Cargando catálogo...</p>';

    fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.status === 200) {
                datosGlobales = data.data;
                renderizarTarjetas(datosGlobales, tipo);
            } else {
                contenedor.innerHTML = '<p>Error en la API.</p>';
            }
        })
        .catch(function(err) { console.error(err); });
}

// --- FUNCIÓN DE FILTRADO MEJORADA ---
window.filtrar = function(filtro) {
    // 1. Visual: botón activo
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(function(btn) { btn.classList.remove('activo'); });
    event.target.classList.add('activo');

    // 2. Lógica de filtrado
    if (filtro === 'todos') {
        const tipo = rutaActual.includes("agentes") ? "agentes" : "armas";
        renderizarTarjetas(datosGlobales, tipo);
    } else {
        const filtrados = datosGlobales.filter(function(item) {
            // LÓGICA AGENTES (Por nombre de rol en español)
            if (item.role) {
                return item.role.displayName === filtro; 
            }
            // LÓGICA ARMAS (Por categoría interna en INGLÉS para evitar fallos)
            // La API devuelve algo como "EEquippableCategory::Sniper"
            else if (item.category) {
                return item.category.includes(filtro);
            }
            return false;
        });

        const tipo = rutaActual.includes("agentes") ? "agentes" : "armas";
        renderizarTarjetas(filtrados, tipo);
    }
};

// Buscador por texto
if (buscador) {
    buscador.addEventListener("input", function(e) {
        const texto = e.target.value.toLowerCase();
        const filtrados = datosGlobales.filter(function(item) {
            return item.displayName.toLowerCase().includes(texto);
        });
        const tipo = rutaActual.includes("agentes") ? "agentes" : "armas";
        renderizarTarjetas(filtrados, tipo);
    });
}

function renderizarTarjetas(datos, tipo) {
    contenedor.innerHTML = "";
    if (datos.length === 0) {
        contenedor.innerHTML = "<p style='color:white'>Sin resultados.</p>";
        return;
    }

    datos.forEach(function(item) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        let html = "";

        if (tipo === "agentes") {
            const rolNombre = item.role ? item.role.displayName : "Agente";
            const rolIcono = item.role ? item.role.displayIcon : "";
            html = `
                <div class="card-img-container"><img src="${item.fullPortrait}" alt="${item.displayName}"></div>
                <div class="card-info">
                    <div class="card-header">
                        <h3>${item.displayName}</h3>
                        <div class="agent-role"><img src="${rolIcono}"><span>${rolNombre}</span></div>
                    </div>
                    <p class="card-desc">${item.description}</p>
                </div>
            `;
        } else {
            // Armas
            const categoria = item.shopData ? item.shopData.categoryText : "Arma";
            html = `
                <div class="card-img-container"><img src="${item.displayIcon}" style="transform: scale(0.9)"></div>
                <div class="card-info">
                    <div class="card-header"><h3>${item.displayName}</h3></div>
                    <p class="card-desc" style="color:#ff4655; font-weight:bold;">CLASE: ${categoria}</p>
                    <p class="card-desc">Arma táctica del arsenal Valorant.</p>
                </div>
            `;
        }
        tarjeta.innerHTML = html;
        contenedor.appendChild(tarjeta);
    });
}

iniciar();