const { readFileSync } = require('fs');
const LABEL_PATH = __dirname + '/db stock label.dymo';
const LABEL_FILE = readFileSync(LABEL_PATH).toString().trim().replace(/\s+/g, ' ');

function template(replacements) {
  let label = LABEL_FILE;

  // replace variables
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\{\{${key}\}\}`, 'g');
    label = label.replace(regex, value);
  })

  return label;
}

module.exports = { template };