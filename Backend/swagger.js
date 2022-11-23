const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Certificate Generator API',
    description: "A certificate generator api with other features",
  },
  host: 'certify-api.onrender.com',
  basePath: "/",
  schemes: ['https'],
};

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './index.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)