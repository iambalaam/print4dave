const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { template } = require('./labelTemplate');
const { print } = require('./print');

const PORT = 8090;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/', async (req, res) => {

    try {
        const json = JSON.parse(req.body.JSONString);
        
        // Validate fields
        ['quantity', 'sku', 'mpn', 'manufacturer', 'attribs', 'category'].forEach((field) => {
            if (!json[field]) throw new Error(`Missing field: ${field}`);
        });

        const { quantity, ...data } = json;
        
        for (let i = 0; i < quantity; i++) {
            const response = await print(template(data));
            if (!response.ok) {
                throw new Error(await response.text());
            }
        }

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.stack);
    }

})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${PORT}/`);
});