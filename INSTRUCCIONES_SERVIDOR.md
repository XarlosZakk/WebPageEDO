# Instrucciones para Ejecutar el Servidor EDO

## Instalación (Solo la primera vez)

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta:
```bash
npm install
```

## Ejecutar el Servidor

Cada vez que quieras usar el sitio web, ejecuta:
```bash
npm start
```

Verás un mensaje como:
```
✅ Servidor EDO ejecutándose en http://localhost:3000
📝 Panel de administración: http://localhost:3000/gestion_eventos.html
🌐 Sitio web: http://localhost:3000/index.html
```

## Usar el Panel de Administración

1. Asegúrate de que el servidor esté ejecutándose
2. Abre: http://localhost:3000/gestion_eventos.html
3. Ingresa la contraseña: **#######**
4. Agrega/edita/elimina eventos
5. Haz clic en "Guardar Cambios"
6. ¡Los cambios se guardan automáticamente en `events.json`!

## Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está ejecutándose.

## Notas Importantes

- El servidor debe estar ejecutándose para que funcione el guardado automático
- Si ves un error de conexión, verifica que el servidor esté corriendo
- Los eventos pasados se eliminan automáticamente al guardar
