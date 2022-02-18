const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { template } = require('./labelTemplate');
const { init, print, getPrinters } = require('./print');

const PORT = 8090;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {

    try {
        // initialize printer
        const initPrinter = await init();
        const initStatus = await initPrinter.text();
        if (!initPrinter.ok || initStatus !== 'true') {
            throw new Error('Could not initialize printer')
        }

        // get printers (unused, but required)
        const getPrinter = await getPrinters();
        if (!getPrinter.ok) {
            throw new Error('Could not get printers')
        }
        
        // Validate fields
        const json = JSON.parse(req.body.JSONString);
        ['quantity', 'sku', 'mpn', 'manufacturer', 'attribs', 'category'].forEach((field) => {
            if (!json[field]) throw new Error(`Missing field: ${field}`);
        });

        const { quantity, ...data } = json;
        
        for (let i = 0; i < quantity; i++) {
            const response = await print(template(data));
            const responseStatus = await response.text();
            if (!response.ok || responseStatus !== 'true') {
                throw new Error(`Printer responded with: ${responseStatus}`);
            }
        }

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.stack);
    }

});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${PORT}/`);
});

