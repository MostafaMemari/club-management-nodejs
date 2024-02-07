const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

export function SwaggerConfig(app) {
  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "REST API for Swagger Documentation",
        version: "1.0.0",
      },
      schemes: ["http", "https"],
      servers: [{ url: "http://localhost:4040/" }],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
