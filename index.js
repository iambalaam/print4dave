const express = require('express');
const { template } = require('./labelTemplate');
const { print } = require('./print');

const PORT = 8090;

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    await print(template(req.body));
    res.sendStatus(200);
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${PORT}/`);
});