# 📱 Empresa Del Oeste EDO - Documentación Técnica

**Versión:** 1.0.0  
**Autor:** Carls'Dev  
**Empresa:** Empresa del Oeste  
**Comunidad:** VTC - Euro Truck Simulator 2  
**Fecha:** 2026

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Descripción de Archivos](#descripción-de-archivos)
6. [Arquitectura y Patrones](#arquitectura-y-patrones)
7. [API REST](#api-rest)
8. [Guía de Funcionalidades](#guía-de-funcionalidades)
9. [Seguridad](#seguridad)
10. [Resolución de Problemas](#resolución-de-problemas)

---

## 🎯 Descripción General

**Empresa Del Oeste EDO** es un sitio web profesional para una comunidad VTC (Virtual Trucking Company) de Euro Truck Simulator 2. El proyecto combina un frontend moderno y responsivo con un backend en Node.js para la gestión dinámica de eventos.

### Características Principales

- ✅ Sitio web responsivo y moderno
- ✅ Panel de administración para gestión de eventos
- ✅ Carrusel de imágenes interactivo con autoplay
- ✅ Animaciones suaves y profesionales
- ✅ API REST para eventos
- ✅ Compatibilidad con dispositivos móviles
- ✅ Navegación intuitiva con smooth scroll
- ✅ Efectos visuales avanzados (3D tilt, parallax)

---

## 🗂️ Estructura del Proyecto

```
EDO/
├── index.html                    # Página principal de la web
├── gestion_eventos.html          # Panel de administración (admin)
├── Main.js                       # JavaScript principal (lógica frontend)
├── server.js                     # Servidor Express (backend)
├── styles.css                    # Estilos globales (CSS)
├── events.json                   # Base de datos de eventos (JSON)
├── package.json                  # Dependencias y configuración de npm
├── img/                          # Carpeta de recursos visuales
│   ├── logo.png                  # Logo de la empresa
│   ├── edo_logo (1).jpg          # Logo alternativo
│   ├── comboi_1.png              # Imágenes carousel 1
│   ├── comboi_2.png              # Imágenes carousel 2
│   ├── comboi_3.png              # Imágenes carousel 3
│   ├── convoy_4(1).png           # Imágenes carousel 4
│   ├── convvoy_4(1).png          # Imágenes carousel 5
│   ├── Convoy_8.png              # Imágenes carousel 6
│   ├── Convoy_9.png              # Imágenes carousel 7
│   ├── Convoy_10.png             # Imágenes carousel 8
│   └── Staff_EDO.png             # Imágenes de staff
├── INSTRUCCIONES_HOSTING.md      # Guía de hosting
├── INSTRUCCIONES_SERVIDOR.md     # Guía del servidor
└── GITHUB_PAGES_GUIA.md          # Guía de GitHub Pages

```

---

## 💻 Requisitos del Sistema

### Desarrollo Local

- **Node.js:** v14.0.0 o superior
- **npm:** v6.0.0 o superior
- **Navegador moderno:** Chrome, Firefox, Safari o Edge (últimas versiones)

### Servidor de Producción

- **Node.js:** v14.0.0 o superior
- **Acceso a variables de entorno**
- **Puerto** 3000 o configurable via `PORT`

### Dependencias

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

---

## 🚀 Instalación y Configuración

### 1. Instalación Local

```bash
# Clonar o descargar el proyecto
cd EDO

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El servidor estará disponible en:
# http://localhost:3000
```

### 2. Variables de Entorno

```bash
# Crear archivo .env (opcional)
PORT=3000

# Si no existe .env, el servidor usa puerto 3000 por defecto
```

### 3. Verificación de Instalación

Una vez iniciado el servidor, verificar:

- **Sitio principal:** http://localhost:3000/index.html
- **Panel admin:** http://localhost:3000/gestion_eventos.html
- **API de eventos:** http://localhost:3000/api/events

---

## 📄 Descripción de Archivos

### 1. **index.html** - Página Principal

**Propósito:** Página de inicio del sitio - Punto de entrada para visitantes

**Secciones principales:**

| Sección | Función |
|---------|---------|
| **HEAD** | Metadatos SEO, estilos importados y enlaces |
| **HEADER** | Logo, nombre empresa y botón "Aplica Ya" |
| **NAV** | Menú de navegación con enlaces internos |
| **HERO CAROUSEL** | Carrusel de 8 slides con imágenes de convoys |
| **INTRO SECTION** | Lema y descripción de la empresa |
| **TEAM SECTION (#equipo)** | Tarjetas de staff con información |
| **REQUIREMENTS (#requisitos)** | Tabla de requisitos de entrada |
| **ENVIRONMENT (#entorno)** | Información del servidor del juego |
| **EVENTS (#eventos)** | Contenedor dinámico para eventos (JS) |
| **MEDIA (#media)** | Galería de imágenes y contenido multimedia |

**Meta Tags Implementadas:**

```html
<!-- Esenciales -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Branding -->
<meta name="author" content="Carls'Dev" />
<meta name="copyright" content="Empresa del Oeste 2025" />

<!-- SEO -->
<meta name="keywords" content="VTC, ETS2, truckersmp, comunidad, empresa virtual" />
<meta name="robots" content="index" />
<meta name="description" content="Web VTC Empresa Del Oeste - Transporte Virtual" />

<!-- Open Graph (Compartir en redes) -->
<meta property="og:title" content="Empresa Del Oeste EDO" />
<meta property="og:description" content="Web VTC Empresa Del Oeste" />
<meta property="og:image" content="./img/logo.png" />

<!-- Tema -->
<meta name="theme-color" content="#750c17" />
```

**Librerías Externas:**

- **FontAwesome 7.0.1:** Iconos vectoriales
- **Animate.css 4.1.1:** Animaciones predefinidas
- **Google Fonts (Bruno Ace SC):** Tipografía personalizada

---

### 2. **Main.js** - Lógica Frontend Principal

**Propósito:** Interactividad del cliente, animaciones y gestión de eventos

**Módulos Principales (IIFE - Immediately Invoked Function Expression):**

#### **Módulo 1: Smooth Scroll & ScrollSpy**
```javascript
/* ========== SMOOTH SCROLL & SCROLLSPY ========== */
```
**Funcionalidad:**
- Scroll suave al hacer clic en enlaces anchor (#)
- ScrollSpy: resalta automáticamente el enlace activo durante el scroll
- Calcula offset dinámico basado en altura de header y nav
- Proporciona experiencia UX fluida

**Funciones clave:**
- `getOffset()` - Calcula altura de header + nav
- `clearActive()` - Elimina clase activa de todos los enlaces
- `onScroll()` - Detecta sección actual con RequestAnimationFrame

#### **Módulo 2: Intersection Observer para Animaciones de Scroll**
```javascript
/* ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ========== */
```
**Funcionalidad:**
- Anima secciones cuando entran en viewport
- Opacidad y transform (translateY) suave
- Threshold: 0.1 (10% visible para activar)
- rootMargin: -100px (activación antes de llegar)

**Patrón de diseño:** Observer Pattern

#### **Módulo 3: Animaciones de Títulos con Animate.css**
```javascript
/* ========== TITLE ANIMATIONS WITH ANIMATE.CSS ========== */
```
**Funcionalidad:**
- Aplica animaciones CSS a elementos `.title-enter`
- Lee atributo `data-anim` para tipo de animación
- Por defecto: `fadeInUp`
- Desactiva observer después de animar (eficiencia)

**Atributo HTML:**
```html
<h2 class="title-enter" data-anim="fadeInDown">Título</h2>
```

#### **Módulo 4: Mobile Menu Toggle**
```javascript
/* ========== MOBILE MENU TOGGLE ========== */
```
**Funcionalidad:**
- Abre/cierra menú en modo móvil
- Gestiona atributo `aria-expanded` (accesibilidad)
- Cierra automáticamente al hacer clic en enlace
- Previene scroll del body cuando menú abierto
- Cierra menciona clic fuera

**Métodos:**
- `open()` / `close()` - Gestiona estado del menú
- Event listeners para click, resize y documentos

#### **Módulo 5: Hero Carousel**
```javascript
/* ========== HERO CAROUSEL ========== */
```
**Funcionalidad:**
- Carrusel automático de 8 imágenes
- Intervalo: 4500ms (4.5 segundos)
- Navegación por indicadores
- Soporte para swipe (touch devices)
- Pausa en hover (desktop)

**Funciones:**
- `show(i)` - Muestra slide específico
- `next()` / `prev()` - Navega slides
- `start()` / `stop()` / `restart()` - Gestiona autoplay

**Detección de Swipe:**
```javascript
// Detecta movimiento horizontal > 40px
if (dx < 0) next();  // Deslizar izquierda
else prev();         // Deslizar derecha
```

#### **Módulo 6: Partner Cards 3D Tilt Effect**
```javascript
/* ========== PARTNER CARDS 3D TILT EFFECT ========== */
```
**Funcionalidad:**
- Efecto 3D en cards al mover mouse
- Utiliza `perspective(700px)` y `rotateX/Y`
- Max rotación: 12 grados
- Transición suave (0.3s al salir)

**Matemática 3D:**
```javascript
const rx = (0.5 - y) * max;  // Rotación en eje X
const ry = (x - 0.5) * max;  // Rotación en eje Y
```

#### **Módulo 7: Events Loader**
```javascript
/* ========== EVENTS LOADER ========== */
```
**Funcionalidad:**
- Carga eventos desde `events.json`
- Filtra eventos pasados automáticamente
- Renderiza tarjetas dinámicamente
- Stagger animation (retraso por índice)

**Comparación de fechas:**
```javascript
const eventDate = new Date(event.date);
return eventDate >= now;  // Solo eventos futuros
```

**HTML generado por evento:**
```html
<div class="event-card">
  <div class="event-image">
    <img src="${event.image}" alt="${event.title}">
  </div>
  <div class="event-content">
    <h3 class="event-title">${event.title}</h3>
    <div class="event-date">
      <i class="fa-solid fa-calendar-days"></i>
      ${event.date}
    </div>
    <p class="event-desc">${event.description}</p>
    <a href="${event.link}" class="event-link" target="_blank">
      <i class="fa-solid fa-circle-info"></i>
      Más Información
    </a>
  </div>
</div>
```

#### **Módulo 8: Admin Access Modal**
```javascript
/* ========== ADMIN ACCESS MODAL ========== */
```
**Funcionalidad:**
- Modal de login para panel admin
- Contraseña: `EDO2025`
- Valida entrada y redirige a `gestion_eventos.html`
- Animación "shake" en error

**Flujo:**
1. Usuario hace clic en botón admin
2. Modal se abre y enfoca input
3. Valida contraseña (Enter o botón)
4. Si es correcta → Redirige a `/gestion_eventos.html`
5. Si es incorrecta → Muestra error y anima shake

---

### 3. **server.js** - Backend Node.js/Express

**Propósito:** Servidor HTTP que maneja API de eventos y archivos estáticos

**Configuración Base:**

```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
```

**Middleware:**
| Middleware | Función |
|-----------|---------|
| `cors()` | Permite requests desde otros orígenes |
| `express.json()` | Parsea JSON en bodies |
| `express.static()` | Sirve archivos estáticos (html, css, js, img) |

**Endpoints API:**

#### **GET /api/events**
**Descripción:** Obtiene lista de eventos

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "title": "Convoy Nocturno",
    "date": "2026-03-15",
    "description": "Convoy nocturno por carreteras europeas",
    "image": "./img/convoy.jpg",
    "link": "https://truckersmp.com/..."
  }
]
```

**Manejo de errores:**
- Si `events.json` no existe → Retorna `[]` (array vacío)
- Error en lectura → Status 500 con mensaje de error

#### **POST /api/save-events**
**Descripción:** Guarda nuevo listado de eventos

**Body esperado:**
```json
[
  {
    "title": "Nuevo Evento",
    "date": "2026-03-20",
    "description": "Descripción",
    "image": "./img/evento.jpg",
    "link": "https://..."
  }
]
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Eventos guardados correctamente",
  "count": 5
}
```

**Gestión de archivos:**
```javascript
fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");
// null, 2 = Formatea JSON con indentación de 2 espacios
```

**Logs del servidor:**
```
✅ Servidor EDO ejecutándose en puerto 3000
📝 Panel de administración: /gestion_eventos.html
🌐 Sitio web: /index.html
🚀 Servidor listo para producción (si PORT está definido)
```

---

### 4. **styles.css** - Estilos Globales

**Propósito:** Diseño visual completo del proyecto (1817 líneas)

**Sistema de Colores (Variables CSS):**

```css
:root {
  --primary: #750c17;        /* Rojo oscuro (marca) */
  --secondary: #0047ab;      /* Azul (secundario) */
  --accent: #ff4d4d;         /* Rojo brillante (acentos) */
  --dark: #0a0e27;           /* Fondo principal */
  --darker: #050810;         /* Fondo más oscuro */
  --light: #f8f9fa;          /* Texto claro */
  --text: #e0e0e0;           /* Texto por defecto */
  --border: #1a2540;         /* Bordes */
  --header-height: 95px;     /* Alto header */
  --nav-height: 60px;        /* Alto nav */
}
```

**Reset CSS:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Secciones de Estilos:**

| Sección | Elementos |
|---------|----------|
| **HEADER** | Logo, nombre empresa, botón apply |
| **NAVIGATION** | Menú horizontal, mobile toggle |
| **HERO CAROUSEL** | Slides, transition, indicadores |
| **ANIMATIONS** | @keyframes, transitions suaves |
| **RESPONSIVE** | Media queries para móvil/tablet/desktop |
| **EFFECTS** | Blur effects, shadows, gradients |
| **ACCESSIBILITY** | Contraste, focus states |

**Ejemplos de patrones:**

Gradientes lineales:
```css
background: linear-gradient(135deg, var(--primary) 0%, #5a0812 100%);
```

Blur effects (glassmorphism):
```css
backdrop-filter: blur(10px);
background: rgba(0, 0, 0, 0.5);
```

Animaciones suaves:
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

### 5. **gestion_eventos.html** - Panel de Administración

**Propósito:** Interfaz para gestionar eventos (crear, editar, eliminar)

**Características:**

1. **Login Screen**
   - Requiere contraseña: `EDO2025`
   - Validación JavaScript simple

2. **Admin Panel**
   - Grid responsive de eventos
   - Inputs editables para cada campo
   - Botón guardar descarga JSON

3. **Estructura de formulario:**
   - Title (título del evento)
   - Date (fecha ISO: YYYY-MM-DD)
   - Description (descripción corta)
   - Image URL (enlace a imagen)
   - Event Link (enlace externo)

**Flujo de uso:**

```
1. Usuario accede a /gestion_eventos.html
   ↓
2. Introduce contraseña EDO2025
   ↓
3. Se muestra panel admin
   ↓
4. Edita eventos existentes o añade nuevos
   ↓
5. Hace clic "Guardar Cambios"
   ↓
6. Se descarga events.json
   ↓
7. Reemplaza archivo original
   ↓
8. Reinicia servidor para actualizar
```

**Funciones JavaScript:**
- `checkAuth()` - Valida contraseña
- `addEvent()` - Añade nuevo evento vacío
- `downloadJSON()` - Descarga JSON actual
- Event listeners para edición inline

---

### 6. **events.json** - Base de Datos de Eventos

**Propósito:** Almacenar eventos en formato JSON

**Estructura inicial:** Array vacío `[]`

**Formato de evento:**
```json
{
  "id": 1,
  "title": "Convoy Nocturno",
  "date": "2026-03-15T19:00:00",
  "description": "Acompáñanos en nuestro convoy nocturno por las carreteras europeas",
  "image": "./img/convoy.png",
  "link": "https://truckersmp.com/event/123"
}
```

**Notas:**
- Array se mantiene actualizado desde panel admin
- `date` se compara para filtrar eventos pasados (Main.js)
- Formato ISO8601 recomendado

---

### 7. **package.json** - Configuración NPM

**Propósito:** Dependencias, scripts y metadatos del proyecto

**Campos principales:**

```json
{
  "name": "edo-website",
  "version": "1.0.0",
  "description": "Empresa Del Oeste - Website with Event Management",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
```

**Scripts disponibles:**
```bash
npm start      # Inicia servidor (producción)
npm run dev    # Inicia servidor (desarrollo)
```

---

## 🏗️ Arquitectura y Patrones

### 1. **Patrón IIFE (Immediately Invoked Function Expression)**

Utilizado en `Main.js` para encapsular módulos:

```javascript
(function () {
  "use strict";
  
  // Código privado del módulo
  const privateVar = "solo accesible aquí";
  
  function privateFunc() { }
  
  // Event listeners
  document.addEventListener("click", privateFunc);
})();
```

**Ventajas:**
- Variables privadas (no contamina global scope)
- Evita conflictos de nombres
- Mejor mantenibilidad

### 2. **Patrón Observer (Intersection Observer API)**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Elemento visible: animar
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach(el => observer.observe(el));
```

**Beneficios:**
- Animaciones eficientes (sin scroll listeners constantes)
- Desempeño optimizado
- Adaptable a diferentes viewports

### 3. **Patrón MVC (Model-View-Controller) Ligero**

- **Model:** `events.json` (datos)
- **View:** `index.html` + `styles.css` (presentación)
- **Controller:** `Main.js` (lógica) + `server.js` (backend)

### 4. **Patrón REST API**

```
GET /api/events      → Lectura de eventos
POST /api/save-events → Escritura de eventos
```

Operaciones CRUD:
- **Create:** POST `/api/save-events` con array completo
- **Read:** GET `/api/events`
- **Update:** POST `/api/save-events` con array modificado
- **Delete:** POST `/api/save-events` sin elemento

### 5. **CSS-in-JS Patterns**

Variables CSS para tema consistente:
```css
:root {
  --primary: #750c17;
  --accent: #ff4d4d;
}

button {
  background: var(--accent);
}
```

---

## 🔌 API REST

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. **GET /api/events**

Obtiene lista de eventos actual

**Request:**
```http
GET /api/events HTTP/1.1
Host: localhost:3000
```

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Convoy Especial",
    "date": "2026-03-20",
    "description": "Descripción evento",
    "image": "./img/evento.jpg",
    "link": "https://truckersmp.com/event/..."
  }
]
```

**Response 200 (sin eventos):**
```json
[]
```

**Response 500 (error):**
```json
{
  "success": false,
  "message": "Error al cargar eventos"
}
```

---

#### 2. **POST /api/save-events**

Guarda nuevo listado de eventos (reemplaza completamente)

**Request:**
```http
POST /api/save-events HTTP/1.1
Host: localhost:3000
Content-Type: application/json

[
  {
    "title": "Nuevo Evento",
    "date": "2026-03-25",
    "description": "Descripción",
    "image": "./img/evento.jpg",
    "link": "https://..."
  },
  {
    "title": "Otro Evento",
    "date": "2026-04-01",
    "description": "Otra descripción",
    "image": "./img/evento2.jpg",
    "link": "https://..."
  }
]
```

**Response 200 (éxito):**
```json
{
  "success": true,
  "message": "Eventos guardados correctamente",
  "count": 2
}
```

**Response 500 (error):**
```json
{
  "success": false,
  "message": "Error al guardar eventos"
}
```

---

### Ejemplos con cURL

**Obtener eventos:**
```bash
curl http://localhost:3000/api/events
```

**Guardar eventos:**
```bash
curl -X POST http://localhost:3000/api/save-events \
  -H "Content-Type: application/json" \
  -d '[{"title":"Test","date":"2026-03-20","description":"Test","image":"./img/test.jpg","link":"https://test.com"}]'
```

---

## 🎨 Guía de Funcionalidades

### 1. Carrusel HERO

**Localización:** Sección `#inicio`

**Características:**
- 8 slides de imágenes
- Autoplay cada 4.5 segundos
- Indicadores interactivos
- Soporte para swipe/touch
- Pausa en hover

**Cómo agregar slide:**

1. Añadir imagen a carpeta `img/`
2. Añadir HTML en `index.html`:
```html
<div class="slide">
  <img src="./img/nueva_imagen.png" alt="Descripción" loading="lazy" />
  <div class="slide-overlay">
    <div class="slide-content">
      <h1 class="title-enter" data-anim="fadeInDown">Empresa Del Oeste</h1>
    </div>
    <div class="slide-logo" aria-hidden="false">
      <img src="./img/edo_logo (1).jpg" alt="Logo EDO" />
    </div>
  </div>
</div>
```
3. Añadir indicador:
```html
<button class="indicator" data-index="8" aria-label="Ir a slide 9"></button>
```

---

### 2. Sección de Equipo

**Localización:** Sección `#equipo`

**Estructura:**
```html
<div class="card staff-card animate__animated animate__fadeInUp">
  <div class="staff-avatar">
    <img src="./img/staff_member.png" alt="Nombre" loading="lazy" />
  </div>
  <span class="role-badge">Owner/CEO/Manager</span>
  <h3>Nombre Completo</h3>
  <a class="staff-link" href="https://truckersmp.com/user/ID" target="_blank">
    <i class="fa-solid fa-user"></i>
    Ver Perfil
  </a>
</div>
```

**Clases CSS clave:**
- `.staff-card` - Contenedor de miembro
- `.staff-avatar` - Imagen del staff
- `.role-badge` - Rol de posición
- `.staff-link` - Enlace a perfil

---

### 3. Sección de Requisitos

**Localización:** Sección `#requisitos`

**Contenido:** Tabla con requisitos de entrada a la empresa
- Nivel mínimo de experiencia
- Requisitos de comportamiento
- Equipo necesario

---

### 4. Sección de Eventos

**Localización:** Sección `#eventos`

**Funcionamiento:**
1. JavaScript carga `events.json`
2. Filtra eventos con fecha >= hoy
3. Renderiza dinámicamente tarjetas

**Estructura de evento:**
```json
{
  "title": "Nombre Evento",
  "date": "2026-03-20",
  "description": "Descripción corta",
  "image": "./img/evento.jpg",
  "link": "https://truckersmp.com/..."
}
```

---

### 5. Panel de Administración

**Acceso:** http://localhost:3000/gestion_eventos.html

**Contraseña:** `EDO2025`

**Funciones:**
1. **Ver eventos** - Lista actual en formato editable
2. **Añadir evento** - Botón "+ Nuevo Evento"
3. **Editar evento** - Campos inline editables
4. **Eliminar evento** - Botón delete per evento
5. **Guardar** - Download JSON para reemplazar archivo

**Flujo de guardado:**

```
1. Editar/Agregar eventos en panel
   ↓
2. Click "Guardar Cambios (Descargar JSON)"
   ↓
3. Descarga automática de events.json
   ↓
4. Reemplazar archivo en carpeta proyecto
   ↓
5. Reiniciar servidor (npm start)
   ↓
6. Cambios visibles en sitio
```

---

## 🔒 Seguridad

### Medidas Implementadas

#### 1. **Contraseña Admin (EDO2025)**
- Simple, memorable para el equipo
- ⚠️ **NOTA:** No es segura para producción

#### 2. **CORS Habilitado**
```javascript
app.use(cors());  // Permite requests desde cualquier origen
```

#### 3. **Atributos de Seguridad HTML**
```html
<a href="..." target="_blank" rel="noopener">
  <!-- rel="noopener" previene window.opener -->
</a>
```

#### 4. **Acceso a Archivos**
- `events.json` es público (GET /api/events)
- Modificación requiere POST a endpoint específico

---

### ⚠️ Consideraciones para Producción

1. **Cambiar contraseña admin:**
   - Modificar "EDO2025" en `Main.js` (línea ~380)
   - Modificar "EDO2025" en `gestion_eventos.html` (línea ~180)

2. **Implementar autenticación real:**
   - JWT (JSON Web Tokens)
   - Sessions con express-session
   - OAuth 2.0

3. **Encriptación de datos:**
   - TLS/HTTPS en producción
   - Varables de entorno para secretos

4. **Validación de entrada:**
   - Sanitizar datos en POST /api/save-events
   - Validar formato de fechas
   - Limitar tamaño de request

5. **Rate limiting:**
   - Implementar express-rate-limit
   - Prevenir abuso de API

---

## 🐛 Resolución de Problemas

### Problema: "Puerto 3000 ya en uso"

**Solución:**
```bash
# Opción 1: Usar un puerto diferente
PORT=4000 npm start

# Opción 2: Liberar puerto 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

### Problema: "events.json no se actualiza"

**Causas posibles:**
1. Archivo no reemplazado correctamente
2. Servidor no reiniciado después de cambios
3. Cache del navegador

**Solución:**
1. Verificar que `events.json` existe en raíz proyecto
2. Reiniciar servidor: `npm start`
3. Limpiar cache: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)

---

### Problema: "Menú móvil no se cierra"

**Solución:**
Verificar clase `open` en elemento `<nav>`:
```html
<nav class="open">  <!-- Debe ser removida al cerrar -->
  ...
</nav>
```

---

### Problema: "Evento no aparece en web"

**Verificar:**
1. Campo `date` está en formato ISO (YYYY-MM-DD)
2. Fecha es futura (no pasada)
3. Campo `image` tiene URL válida
4. Campo `link` es URL correcta
5. Servidor reiniciado después de guardar

---

### Problema: "Carrusel no rotea imágenes"

**Solución:**
1. Verificar que imágenes existen en carpeta `img/`
2. Rutas son relativas y correctas: `./img/nombre.png`
3. Consola de navegador (F12) no muestra errores 404

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Líneas HTML** | ~477 |
| **Líneas JavaScript (Main.js)** | ~457 |
| **Líneas CSS** | ~1817 |
| **Líneas Node.js** | ~67 |
| **Módulos JavaScript** | 8 |
| **Endpoints API** | 2 |
| **Dependencias npm** | 2 |
| **Imágenes** | 8+ |

---

## 📚 Referencias Técnicas

### Documentación Oficial

- [MDN - Intersection Observer API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)
- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Express.js Documentation](https://expressjs.com/)
- [CSS Tricks - Smooth Scroll](https://css-tricks.com/snippets/css/smooth-scrolling/)
- [Animate.css](https://animate.style/)
- [FontAwesome Icons](https://fontawesome.com/)

### Librerías Utilizadas

| Librería | Versión | Uso |
|----------|---------|-----|
| FontAwesome | 7.0.1 | Iconos |
| Animate.css | 4.1.1 | Animaciones CSS |
| Express | 4.18.2 | Servidor HTTP |
| CORS | 2.8.5 | Control de origen |
| Google Fonts | - | Tipografía |

---

## 📝 Changelog

### Versión 1.0.0 (2026-02-27)
- ✅ Sitio web base completamente funcional
- ✅ Panel de administración de eventos
- ✅ Carrusel HERO con 8 slides
- ✅ Secciones: Equipo, Requisitos, Entorno, Eventos, Media
- ✅ Animaciones suaves y eficientes
- ✅ Responsivo en todos los dispositivos
- ✅ API REST para gestión de eventos
- ✅ Documentación técnica completa

---

## 👨‍💻 Contribuciones y Mantenimiento

### Contacto/Créditos
- **Desarrollador:** Carls'Dev
- **Empresa:** Empresa del Oeste
- **Comunidad:** TruckersMP VTC
- **Año:** 2025-2026

### Guías Adicionales
- [INSTRUCCIONES_HOSTING.md](INSTRUCCIONES_HOSTING.md) - Deployment en hosting
- [INSTRUCCIONES_SERVIDOR.md](INSTRUCCIONES_SERVIDOR.md) - Configuración de servidor
- [GITHUB_PAGES_GUIA.md](GITHUB_PAGES_GUIA.md) - Deploy en GitHub Pages

---

## 📜 Licencia

**Copyright © 2025 Empresa del Oeste**

Todos los derechos reservados. Este proyecto es propiedad de Empresa Del Oeste VTC.

---

**Última actualización:** 27 de febrero de 2026

---

## 🎓 Notas de Diseño y Arquitectura

### Decisiones de Diseño

1. **IIFE para módulos JavaScript:**
   - Encapsulación natural sin framework
   - Compatible con navegadores antiguos
   - Bajo overhead de dependencias

2. **Express.js para servidor:**
   - Ligero y flexible
   - Perfecto para SPA + API
   - Deployment sencillo

3. **JSON para persistencia:**
   - Simple y legible
   - Fácil de editar manualmente
   - Suficiente para pequeña cantidad de eventos

4. **CSS vanila sin preprocesador:**
   - Variables CSS nativas
   - Sin dependencia de build tools
   - Mantenimiento directo

5. **Intersection Observer para animaciones:**
   - Optimizado para performance
   - Nativo en navegadores modernos
   - Sin necesidad de scroll listeners

### Patrones de Legibilidad

- **Comentarios claros:** Separadores visuales con `/* ========== */`
- **Nombres descriptivos:** Variables y funciones con propósito claro
- **Modularización:** Cada funcionalidad en su propio IIFE
- **Documentación inline:** Explicaciones de lógica compleja

---

**¡Gracias por usar Empresa Del Oeste EDO! 🚛**
