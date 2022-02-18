const express = require('express');
const { template } = require('./labelTemplate');
const { print } = require('./print');

const PORT = 8090;

const app = express();
app.use(express.json());

app.post('/', async (_req, res) => {
    await print(template({name: 'Steve'}));
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});