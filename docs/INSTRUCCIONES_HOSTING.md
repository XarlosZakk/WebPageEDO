# Instrucciones para Desplegar en Hosting Node.js

## Preparación del Proyecto

El proyecto ya está configurado para funcionar directamente en cualquier hosting con Node.js. Los cambios realizados incluyen:

- ✅ Servidor configurado para usar el puerto de la variable de entorno `PORT`
- ✅ Rutas relativas en lugar de URLs absolutas
- ✅ Endpoints API para cargar y guardar eventos
- ✅ Manejo correcto de archivos estáticos

## Pasos para Desplegar

### 1. Subir Archivos al Hosting

Sube todos los archivos del proyecto a tu hosting, excepto:

- `node_modules/` (se instala en el servidor)
- Archivos temporales como `.log`
- `.env` si existe (no debe incluirse)

### 2. Instalar Dependencias

En el servidor del hosting, ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias (Express y CORS).

### 3. Configurar Variables de Entorno

La mayoría de los hostings configuran automáticamente la variable `PORT`. Si tu hosting lo requiere:

- El puerto se lee de `process.env.PORT` automáticamente
- Si no está configurada, usa el puerto 3000 por defecto

### 4. Iniciar el Servidor

El hosting debería ejecutar automáticamente:

```bash
npm start
```

Algunos hostings usan otros comandos, pero `npm start` es el estándar.

## Verificar el Despliegue

Una vez desplegado, deberías poder acceder a:

- **Sitio web principal**: `https://tudominio.com/` o `https://tudominio.com/index.html`
- **Panel de administración**: `https://tudominio.com/gestion_eventos.html`
- **API de eventos (GET)**: `https://tudominio.com/api/events`
- **API de eventos (POST)**: `https://tudominio.com/api/save-events`

## Panel de Administración

Para acceder al panel de gestión de eventos:

1. Ve a: `https://tudominio.com/gestion_eventos.html`
2. Ingresa la contraseña de administrador
3. Gestiona los eventos desde allí

## Notas Importantes

- El archivo `events.json` se crea automáticamente si no existe
- Los eventos pasados se pueden eliminar desde el panel de administración
- El servidor escucha en `0.0.0.0` para aceptar conexiones desde cualquier IP
- Todos los archivos estáticos (HTML, CSS, JS, imágenes) se sirven automáticamente

## Solución de Problemas

### Error: "Cannot find module"

- Ejecuta `npm install` en el servidor

### El sitio no carga

- Verifica que el puerto esté configurado correctamente
- Revisa los logs del servidor para ver errores

### No se pueden guardar eventos

- Asegúrate de que el servidor tenga permisos de escritura en la carpeta del proyecto
- Verifica que el archivo `events.json` pueda ser creado/modificado

### Puerto incorrecto

- El hosting debe proporcionar la variable de entorno `PORT`
- El servidor usará automáticamente el puerto correcto

## Estructura de Archivos Necesarios

```
EDO/
├── server.js              # Servidor Express
├── package.json           # Dependencias y scripts
├── index.html            # Página principal
├── gestion_eventos.html  # Panel de administración
├── Main.js               # JavaScript principal
├── styles.css            # Estilos
├── events.json           # Base de datos de eventos (se crea automáticamente)
├── img/                  # Imágenes
└── node_modules/         # Se instala con npm install
```
