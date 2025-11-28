const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users and Contacts API",
    description: "API for managing users and contacts",
    host: "localhost:3000",
    schemes: ["http", "https"],
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)


