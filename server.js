const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API endpoint to save events
app.post('/api/save-events', (req, res) => {
  try {
    const events = req.body;
    const filePath = path.join(__dirname, 'events.json');
    
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf8');
    
    res.json({ 
      success: true, 
      message: 'Eventos guardados correctamente',
      count: events.length 
    });
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al guardar eventos' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Servidor EDO ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 Panel de administración: http://localhost:${PORT}/gestion_eventos.html`);
  console.log(`🌐 Sitio web: http://localhost:${PORT}/index.html`);
});
