const express = require('express');
const app = express();
const authRoutes = require('./auth/routes/authRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => { return res.send('Hello') })


app.listen(5001, () => console.log('Started server on http://localhost:5001'));