import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Config module');
})

app.listen(3000, () => {
    console.log('Config module listening on port 3000!');
})