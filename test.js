const fetch = require('node-fetch');
const { readFileSync } = require('fs');

// Disable certs
if (typeof process !== 'undefined' && process.env) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const xml = readFileSync(__dirname + '/koala.dymo').toString().trim().replace(/\s+/g, ' ');
const printerName = 'DYMO LabelWriter 450';
const bodyParms = [
    `printerName=${encodeURIComponent(printerName)}`,
    `printParamsXml=`,
    `labelXml=${encodeURIComponent(xml)}`,
    `labelSetXml=`,
    
];

fetch("https://127.0.0.1:41951/DYMO/DLS/Printing/PrintLabel", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
    },
    "body": bodyParms.join('&'),
    "method": "POST",
});