const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let data = [];
let idCounter = 1;

// Create (POST)
app.post('/api/items', (req, res) => {
    const newItem = { id: idCounter++, ...req.body };
    data.push(newItem);
    res.status(201).json(newItem);
});

// Read all (GET)
app.get('/api/items', (req, res) => {
    res.status(200).json(data);
});

// Read one (GET)
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Update (PUT)
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, ...req.body };
        res.status(200).json(data[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete (DELETE)
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
