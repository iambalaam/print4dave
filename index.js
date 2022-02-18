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
        const { quantity, ...data } = json;
        
        for (let i = 0; i < quantity; i++) {
            await print(template(data))
        }

        res.sendStatus(200);
    } catch (e) {
        res.status(500);
        res.send(e);
    }

})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${PORT}/`);
});