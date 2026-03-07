import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JWT Auth API",
      version: "1.0.0",
      description: "Authentication API with access and refresh tokens",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // location of route docs
};

export const swaggerSpec = swaggerJsdoc(options);
