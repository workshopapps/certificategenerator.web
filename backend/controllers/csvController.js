const csvToJson = require("csvtojson");
const { isValidJsonOutput } = require("../utils/validation");
const { createApiError, handleResponse, handleAsync} = require("../utils/helpers")

const handleCsv = handleAsync(async(req, res) => {
  const files = req.files;
  

  const file = files.file;
  const csvFile = files.file.data;
  const csvData = Buffer.from(csvFile).toString();

  if(file.size === 0){
    throw createApiError('No csv file was uploaded', 400)
  }

  //check if file that was uploaded is CSV
  if(file.mimetype != 'text/csv'){
    throw createApiError('Invalid csv file', 400)
  }


  
  // convert csvData to JSON and send back to client
  const jsonOutput = await csvToJson().fromString(csvData);

  if(!isValidJsonOutput(jsonOutput)){
    
    throw createApiError('Invalid input from uploaded csv file', 400)
  }

  let response = {
    result: jsonOutput,
    count: jsonOutput.length
  }
  res.status(200).json(handleResponse(response, 'CSV data created successfully'))
})

module.exports = { handleCsv };
