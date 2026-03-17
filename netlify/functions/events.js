const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Try multiple possible paths for the events.json file
    const possiblePaths = [
      path.resolve(__dirname, "../../data/events.json"),
      path.join(process.cwd(), "data", "events.json"),
      path.resolve(__dirname, "data", "events.json"),
    ];

    let events = [];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf8");
        events = JSON.parse(data);
        break;
      }
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
