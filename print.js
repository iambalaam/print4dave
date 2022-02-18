const fetch = require('node-fetch');

// Disable certs
if (typeof process !== 'undefined' && process.env) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

async function print(xml) {
    const printerName = 'DYMO LabelWriter 450';
    const bodyParms = [
        `printerName=${encodeURIComponent(printerName)}`,
        `printParamsXml=`,
        `labelXml=${encodeURIComponent(xml)}`,
        `labelSetXml=`,
        
    ];
    
    return await fetch("https://127.0.0.1:41951/DYMO/DLS/Printing/PrintLabel", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
        },
        "body": bodyParms.join('&'),
        "method": "POST",
    });
    
}

module.exports = { print };