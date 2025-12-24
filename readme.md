# 🚀 VALORANT FAN PAGE - El Portal Táctico

## 🔗 URL del Proyecto Hospedado
* **Repositorio y Código (GitHub):** [https://github.com/xjafrexx/ProyectoIndividual.git]
* **Estado:** 🟢 Desplegado y Funcional

## 📝 Descripción del Proyecto
Este portal web es una enciclopedia interactiva y "fan page" dedicada al shooter táctico **Valorant**. La aplicación permite a los usuarios explorar un catálogo detallado de Agentes y un Arsenal de Armas con un diseño visual inmersivo ("Glass Dark").

El sistema cuenta con un **Backend propio en Python** que gestiona las peticiones del servidor y conecta con una **Base de Datos (SQL)** para procesar formularios de contacto y registros de usuarios de forma persistente.

## 🧭 Secciones (Rutas)
La aplicación consta de las siguientes vistas principales:

* **`/index.html`** — **Inicio:** Portada con diseño de alto impacto y navegación principal.
* **`/agentes.html`** — **Protocolo de Agentes:** Catálogo visual con tarjetas interactivas de los personajes y sus roles.
* **`/armas.html`** — **Arsenal Táctico:** Visualizador de armamento con filtros dinámicos y diseño horizontal tipo inventario.
* **`/contacto.html`** — **Centro de Comando:** Formulario funcional conectado a base de datos y enlaces directos a WhatsApp/Gmail.
* **`/registro.html`** — **Acceso:** Interfaz de usuario para registro en la plataforma.

## 🛠️ Tecnologías Utilizadas
Este proyecto ha sido desarrollado implementando una arquitectura cliente-servidor con las siguientes tecnologías:

* **HTML5:** Estructura semántica y organización del contenido.
* **CSS3:** Diseño responsivo, Grid/Flexbox, animaciones y estilo "Glassmorphism" oscuro.
* **JavaScript:** Lógica del cliente, manipulación del DOM y filtros de búsqueda dinámicos.
* **Python:** Lógica del servidor (Backend) en `server.py` para el manejo de rutas y peticiones HTTP.
* **SQL (MySQL):** Base de datos relacional para el almacenamiento de información de usuarios y mensajes.

## 📁 Estructura del Proyecto
```text
Valorant-Project/
├─ static/
│  ├─ css/          # Estilos globales y específicos
│  ├─ img/          # Assets gráficos y fondos
│  └─ js/           # Scripts de interactividad
├─ server.py        # Servidor Backend Python
├─ database.sql     # Script de Base de Datos
├─ requirements.txt # Dependencias del proyecto
├─ *.html           # Vistas (Paginas web)
└─ README.md        # Documentación