# Guía: EDO Website en GitHub Pages

## 🌐 Workflow Recomendado

### Configuración Inicial (Una sola vez)

1. **Asegúrate de tener Git instalado**
```bash
git --version
```

2. **Inicializa el repositorio (si no lo has hecho)**
```bash
cd c:\Users\carlo\OneDrive\Desktop\EDO
git init
git branch -M main
```

3. **Crea un archivo `.gitignore`**
```
node_modules/
.DS_Store
*.log
```

4. **Conecta con tu repositorio de GitHub**
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
```

5. **Sube los archivos iniciales**
```bash
git add .
git commit -m "Initial commit - EDO Website"
git push -u origin main
```

6. **Activa GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: Deploy from branch `main`
   - Carpeta: `/ (root)`
   - Guarda

## 📝 Gestión de Eventos - Workflow Diario

### Paso 1: Editar Eventos Localmente
```bash
# Inicia el servidor local
npm start
```

### Paso 2: Accede al Panel
- Abre: http://localhost:3000/gestion_eventos.html
- Contraseña: **EDO2025**
- Edita/agrega/elimina eventos
- Haz clic en "Guardar Cambios"

### Paso 3: Sube los Cambios a GitHub
```bash
# Verifica qué cambió
git status

# Agrega el archivo actualizado
git add events.json

# Confirma los cambios
git commit -m "Actualizar eventos - [fecha]"

# Sube a GitHub
git push origin main
```

### Paso 4: Espera la Actualización
- GitHub Pages se actualiza automáticamente en 1-2 minutos
- Tu sitio estará en: `https://TU_USUARIO.github.io/TU_REPO/`

## 🚀 Comandos Rápidos

### Actualizar solo eventos:
```bash
npm start                          # 1. Inicia servidor
# Edita en http://localhost:3000/gestion_eventos.html
git add events.json                # 2. Agrega cambios
git commit -m "Update events"      # 3. Commit
git push                           # 4. Sube a GitHub
```

### Actualizar todo el sitio:
```bash
git add .
git commit -m "Actualización general"
git push
```

## ⚠️ Notas Importantes

1. **El panel de administración NO debe ser público**
   - Opción A: No incluyas `gestion_eventos.html` en Git
   - Opción B: Protégelo con autenticación adicional

2. **Archivos que NO debes subir a GitHub:**
   - `node_modules/` (ya está en .gitignore)
   - `server.js` y `package.json` (solo para uso local)

3. **El servidor local es solo para ti**
   - Los visitantes del sitio NO necesitan el servidor
   - Solo leen `events.json` directamente

## 🔒 Seguridad del Panel de Administración

### Opción 1: No subir el panel (Recomendado)
```bash
# Crea .gitignore y agrega:
echo "gestion_eventos.html" >> .gitignore
```

### Opción 2: Subir pero ocultar
- Cambia el nombre a algo menos obvio: `admin_xyz123.html`
- Usa una contraseña más fuerte en el código

## 📋 Checklist de Despliegue

- [ ] Repositorio creado en GitHub
- [ ] GitHub Pages activado
- [ ] `.gitignore` configurado
- [ ] Archivos subidos
- [ ] Sitio funcionando en `https://TU_USUARIO.github.io/TU_REPO/`
- [ ] Eventos se muestran correctamente
- [ ] Panel de administración funciona localmente

## 🎯 Resumen

**Para actualizar eventos:**
1. `npm start` → Edita en local → Guarda
2. `git add events.json` → `git commit -m "..."` → `git push`
3. ¡Listo! GitHub Pages se actualiza automáticamente
