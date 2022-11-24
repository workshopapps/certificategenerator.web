const fileExtLimiter = (req, res, next) => {
  const fileName = req.files.file.name;
  const fileNameExtension = fileName.split(".").pop();
  const allowed = fileNameExtension === "csv";

  if (!allowed) {
    const message = `Upload failed. Only .csv files allowed`;

    return res.status(422).json({ status: "error", message });
  }
  
  next();
};

module.exports = fileExtLimiter;
