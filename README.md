# Day-s-hop 🛒⚽

![GitHub repo size](https://img.shields.io/github/repo-size/tu-usuario/day-s-hop?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/tu-usuario/day-s-hop?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/tu-usuario/day-s-hop?style=for-the-badge)
![License](https://img.shields.io/github/license/tu-usuario/day-s-hop?style=for-the-badge)

---

## 🌟 Descripción

**Day-s-hop** es una **tienda online de camisetas de fútbol**.  
Permite:

- 🔹 Navegar productos por país, temporada y tipo.  
- 🔹 Filtrar por tallas y colores.  
- 🔹 Agregar productos al carrito y gestionar cantidades.  
- 🔹 Pagar a través de un **formulario de contacto** integrado con **EmailJS**.  
- 🔹 Persistencia del carrito usando **LocalStorage**.  
- 🔹 Diseño **responsive**: móvil, tablet y escritorio.

---

## 🛠 Tecnologías utilizadas

- **HTML5**  
- **CSS3 / Media Queries**  
- **JavaScript / ES6**  
- **JSON** para los datos de productos  
- **LocalStorage** para carrito persistente  
- **EmailJS** para envío de formularios  

![HTML Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ⚡ Funcionalidades principales

- Carrito de compras con:
  - Agregar, restar y eliminar productos  
  - Badge dinámico de cantidad  
  - Total actualizado automáticamente  
- Buscador de productos con filtros por:
  - Talla  
  - Nombre  
  - Tipo  
  - Equipo  
  - Temporada  
- Modal de detalle de producto  
- Formulario de contacto con validación de:
  - Nombre  
  - Email  
  - Teléfono  
  - Comentarios  
- Guardado de carrito y formulario en **LocalStorage**

---
## 📂 Estructura del proyecto

```bash
CDY/
├── css/                         # Estilos CSS del sitio
│   ├── index.css
│   ├── nav.css
│   └── style.css
├── html/                        # Páginas HTML adicionales
│   ├── contacto.html
│   └── productos.html
├── ico/                         # Íconos del sitio
│   └── favicon.ico
├── img/                         # Imágenes usadas en la tienda
│   ├── banner.jpg
│   ├── carrito.png
│   ├── logo.png
│   └── producto1.jpg
├── js/                          # Funcionalidad dinámica en JavaScript
│   ├── app.js
│   ├── carrito.js
│   └── validaciones.js
├── json/                        # Datos en formato JSON
│   └── productos.json
├── practica/                    # Carpeta de ejercicios/prácticas
│   ├── ejercicio1.html
│   ├── ejercicio2.html
│   └── ejercicio3.html
├── seguridad/                   # Recursos relacionados con seguridad
│   ├── csrf.js                  # Protección contra ataques CSRF
│   └── seguridad.html           # Explicación de medidas de seguridad
├── index.html                   # Página principal del proyecto
└── README.md                    # Documentación del proyecto

```

## 📖 Explicación de carpetas y archivos

- **css/**  
  Contiene las hojas de estilo en cascada (CSS) que definen el diseño y la apariencia visual del sitio web.  
  - `index.css`: estilos principales aplicados a la página de inicio y otras secciones.

- **html/**  
  Incluye páginas HTML adicionales al `index.html`.  
  - `contacto.html`: página de contacto.  
  - `futbol.html`: página dedicada a contenidos relacionados con fútbol.

- **ico/**  
  Carpeta con íconos e imágenes pequeñas utilizadas para identidad visual del sitio.  
  - `favicon.ico`: ícono mostrado en la pestaña del navegador.  
  - `logo.png` y variaciones: logotipos en diferentes formatos.

- **img/**  
  Contiene imágenes del proyecto, principalmente gráficos y recursos visuales de productos o temáticas deportivas.  
  - Ejemplos: `colombia_local.png`, `españa_visitante.png`, `placeholder.png`.

- **js/**  
  Archivos JavaScript que añaden interacción y funcionalidad dinámica al sitio.  
  - `api.js`: probablemente maneja llamadas a APIs externas o internas.  
  - `carrito.js`: lógica para la gestión del carrito de compras.  
  - `contacto.js`: validación o envío del formulario de contacto.  
  - `menu.js`: funcionalidad del menú de navegación.

- **json/**  
  Archivos con datos estructurados en formato JSON.  
  - `productos.json`: listado de productos usado en la tienda o catálogo.

- **practica/**  
  Carpeta destinada a ejercicios o pruebas de desarrollo. *(No se incluye resumen detallado por tu petición).*

- **seguridad/**  
  Recursos vinculados a aspectos de seguridad del proyecto.  
  - `config.js`: archivo de configuración (posiblemente variables o parámetros de seguridad).

- **.gitignore**  
  Define qué archivos o carpetas deben ser ignorados por Git (para no subirse al repositorio).

- **index.html**  
  Página principal del sitio web, la que sirve como entrada al proyecto.

- **README.md**  
  Archivo de documentación principal donde se explica el proyecto, su estructura y su uso.


## 🖼 Vista previa

![Vista previa de la tienda](img/Imagen%20paguina%20dayshop.kesug.com%2001.png)
 <!-- Reemplaza con tu ruta de imagen -->

---
## 🚀 Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/day-s-hop.git
```
2. Abrir index.html en tu navegador.

3. Navegar por la tienda, agregar productos al carrito y probar el formulario de contacto

## Licencia

público y educativo, libre para ser consultado en GitHub.

## Autor

Jimmy - 2025 





