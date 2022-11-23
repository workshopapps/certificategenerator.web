const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'CERTIFY API',
    description: "",
  },
  host: 'certify-api.onrender.com',
  schemes: [''],
};

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './index.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)