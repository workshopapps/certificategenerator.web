const path = require("path");
const fs = require("fs/promises");
const Handlebars = require("handlebars");

async function parseTemplate(templateObject) {
  // Get handlebars certificate template from file
  const hbTemplate = await fs.readFile(
    path.join(__dirname, "templates", "template.hbs")
  );

  // Handlebars helper function to wrap a string in curly braces
  Handlebars.registerHelper("wrap", string => `{{${string}}}`);

  // Generate template
  const template = Handlebars.compile(hbTemplate.toString());

  // Pass data into new template and return templated string
  const parsedTemplate = template(templateObject, {
    allowProtoPropertiesByDefault: true
  });

  return parsedTemplate;
}

module.exports = {
  parseTemplate
};
