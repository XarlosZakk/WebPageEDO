const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const events = JSON.parse(event.body);
    const filePath = path.join(process.cwd(), "data", "events.json");

    // Crear directorio data si no existe
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Guardar eventos
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Eventos guardados correctamente",
        count: events.length,
      }),
    };
  } catch (error) {
    console.error("Error saving events:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Error al guardar eventos",
        error: error.message,
      }),
    };
  }
};
