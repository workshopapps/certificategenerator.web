const isValidJsonOutput = (jsonArray) => {
  const validHeaders = [
    "name",
    "nameoforganization",
    "description",
    "award",
    "signed",
    "email",
    "date",
  ];

  const csvHeadersCount = Object.keys(jsonArray[0]).length;

  const validResponse =
    csvHeadersCount === validHeaders.length &&
    validHeaders.every((header) => {
      return jsonArray.every((jsonObj) => {
        const jsonObjHeaders = Object.keys(jsonObj).map((jsonObjHeader) =>
          jsonObjHeader.toLowerCase()
        );

        return jsonObjHeaders.indexOf(header) !== -1;
      });
    });

  return validResponse;
};

module.exports = {
  isValidJsonOutput,
};
