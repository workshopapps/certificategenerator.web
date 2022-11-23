const csvToJson = require("csvtojson");
const { isValidJsonOutput } = require("../utils/validation");
const fs = require('fs')

const handleCsv = async (req, res) => {
  const file = req.file;
  
  if (file) {
    
    // Convert the buffered csv data to readable format
    const buffer = fs.readFileSync(file.path);
    const csvData = Buffer.from(buffer).toString();

    // convert csvData to JSON and send back to client
    const jsonOutput = await csvToJson().fromString(csvData);

    if(!isValidJsonOutput(jsonOutput)){
      
      return res.status(400).json({ message: 'Invalid input from uploaded csv file' }).end();

    }

    return res.status(200).json({ result: jsonOutput, count:jsonOutput.length }).end();
  }

  return res.status(400).json({message: "No csv file was uploaded"}).end();
};

module.exports = { handleCsv };
