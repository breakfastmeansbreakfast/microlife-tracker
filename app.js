const express = require('express');
const createActivity = require('./controllers/createActivity');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/profile/activities', createActivity);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
