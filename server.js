const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
// Usar puerto de variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get events
app.get("/api/events", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "events.json");

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const data = fs.readFileSync(filePath, "utf8");
    const events = JSON.parse(data);

    res.json(events);
  } catch (error) {
    console.error("Error loading events:", error);
    res.status(500).json({
      success: false,
      message: "Error al cargar eventos",
    });
  }
});

// API endpoint to save events
app.post("/api/save-events", (req, res) => {
  try {
    const events = req.body;
    const filePath = path.join(__dirname, "data", "events.json");

    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");

    res.json({
      success: true,
      message: "Eventos guardados correctamente",
      count: events.length,
    });
  } catch (error) {
    console.error("Error saving events:", error);
    res.status(500).json({
      success: false,
      message: "Error al guardar eventos",
    });
  }
});

// Manejar rutas SPA - esto solo se ejecuta si ningún otro middleware responde
// express.static ya maneja los archivos estáticos antes de llegar aquí

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor EDO ejecutándose en puerto ${PORT}`);
  console.log(`📝 Panel de administración: /gestion_eventos.html`);
  console.log(`🌐 Sitio web: /index.html`);
  if (process.env.PORT) {
    console.log(`🚀 Servidor listo para producción`);
  } else {
    console.log(`🔧 Modo desarrollo: http://localhost:${PORT}`);
  }
});
