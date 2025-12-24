// URL base de la API pública de Valorant
const URL_BASE = "https://valorant-api.com/v1";

// Función para pedir la lista de agentes
export async function getAgents() {
    try {
        // Hacemos la petición filtrando solo los personajes jugables y en español
        const respuesta = await fetch(`${URL_BASE}/agents?isPlayableCharacter=true&language=es-MX`);
        
        // Convertimos la respuesta a formato JSON
        const datos = await respuesta.json();
        
        // Devolvemos solo la parte de 'data' que es donde está la info
        return datos.data; 
    } catch (error) {
        // Si falla algo, lo mostramos en consola y devolvemos una lista vacía
        console.error("Hubo un error al cargar los agentes:", error);
        return [];
    }
}

// Función para pedir la lista de armas
export async function getWeapons() {
    try {
        // Pedimos las armas en español
        const respuesta = await fetch(`${URL_BASE}/weapons?language=es-MX`);
        const datos = await respuesta.json();
        return datos.data;
    } catch (error) {
        console.error("Hubo un error al cargar las armas:", error);
        return [];
    }
}