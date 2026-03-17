const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Para desarrollo local con netlify-cli, leer desde data/events.json
    // En producción, esto servirá los datos compilados
    const filePath = path.join(process.cwd(), "data", "events.json");
    
    let events = [];
    
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      events = JSON.parse(data);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(events),
    };
  } catch (error) {
    console.error("Error loading events:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Error al cargar eventos",
        error: error.message,
      }),
    };
  }
};
