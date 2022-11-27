const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const studentiRoutes = require('./routes/studenti.js');

const PORT = 4000;


app.use(bodyParser.json());
app.use('/studenti', studentiRoutes);



app.get('/', (req, res) => {
    console.log('TEST!');
    res.send('Welcome to our homepage!')
})




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));