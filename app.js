const express = require('express');

const app = express();

app.get('/', (req, res) => res.send("Helllo world.."));


app.listen(5000, () => console.log('Started server on http://localhost:5000'));