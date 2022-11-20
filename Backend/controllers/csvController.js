const csvToJson = require("csvtojson");
const { isValidJsonOutput } = require("../utils/validation");
const jwt = require('jsonwebtoken');


const handleCsv = async (req, res) => {
  const files = req.files;
  
  if (files) {
    const file = files.file;
    
    // Convert the buffered csv data to readable format
    const csvData = Buffer.from(file.data).toString();

    // convert csvData to JSON and send back to client
    const jsonOutput = await csvToJson().fromString(csvData);

    if(!isValidJsonOutput(jsonOutput)){
      
      return res.status(400).json({ message: 'Invalid input from uploaded csv file' }).end();

    }

    return res.status(200).json( jsonOutput ).end();
  }

  return res.status(400).json({message: "No csv file was uploaded"}).end();
};

module.exports = { handleCsv };
