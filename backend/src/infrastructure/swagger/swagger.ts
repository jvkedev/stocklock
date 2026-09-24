import swaggerJsDoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StockLock API",
      version: "1.0.0",
      description: "Inventory management API with race-safe stock handling",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/features/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsDoc(options);
