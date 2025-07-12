const express = require('express');
const addonRouter = express.Router();

let data = [];
let idCounter = 1;

// Create (POST)
addonRouter.post('', (req, res) => {
    const newItem = { id: idCounter++, ...req.body };
    data.push(newItem);
    res.status(201).json(newItem);
});




// Read all (GET)
addonRouter.get('', (req, res) => {
    res.status(200).json(data);
});

addonRouter.get('/is-valid', (req, res) => {
    let userName = req.query.userName || ""; 
    const item = data.find(item => item.name.trim().toLowerCase() === userName.toLowerCase());
    if (item) {
        res.status(200).json({found:true});
    } else {
        res.status(200).json({found:false});
    }
});

// Read one (GET)
addonRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Update (PUT)
addonRouter.put('/:id', (req, res) => {
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
addonRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});




module.exports = addonRouter;