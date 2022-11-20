const isValidJsonOutput = (data) => {
    const headers = ["name", "student_id"];

    // Check to see if every row has complete set of values
    const validResponse = data.every(jsonObj => {
        return headers.every(header => (jsonObj[header] !== ''));
    });

    return validResponse;
}

module.exports = {
    isValidJsonOutput
}