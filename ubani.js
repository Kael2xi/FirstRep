const express = require('express');
const bodyParser = require('body-parser');
require(`dotenv`).config();
const mongoose = require(`mongoose`)
const URL = process.env.DATABASE
console.log(URL);

const app = express();
app.use(bodyParser.json());

mongoose.connect(database).then(()=>{
    console.log('Database connected successfully')
})


// Create a schema model
// const stateSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is  require'],
//         unique: [true]  
//     },
//     capital: {
//         type: String,
//         required: [true, 'Capital is required']
//     },
//     governor: {
//         type: String,
//         required: [true, 'governor is required']
//     }

// }, {timestamps: true});
// const stateModel = mongoose.model('States', stateSchema)


let states = [
    { id: 1, name: 'State 1', capital: 'Capital 1', governor: 'Governor 1' },
    // { id: 2, name: 'State 2', capital: 'Capital 2', governor: 'Governor 2' },
    // { id: 2, name: 'State 3', capital: 'Capital 3', governor: 'Governor 3' },
    // { id: 2, name: 'State 4', capital: 'Capital 4', governor: 'Governor 4' },
    // { id: 2, name: 'State 5', capital: 'Capital 5', governor: 'Governor 5' },
    // Can take all the 36 states
];

// Get all states
app.get('/states', (req, res) => {
    res.json(states);
});

// Get a single state by ID
app.get('/state/:id', (req, res) => {
    const state = states.find(s => s.id === parseInt(req.params.id));
    if (!state) return res.status(404).send('State not found');
    res.json(state);
});

// Create a new state
app.post('/state', (req, res) => {
    const { name, capital, governor } = req.body;
    if (!name || !capital || !governor) return res.status(400).send('Missing data');

    const newState = {
        id: states.length + 1,
        name,
        capital,
        governor
    };
    states.push(newState);
    res.status(201).json(newState);
});

// Update an existing state
app.put('/state/:id', (req, res) => {
    const state = states.find(s => s.id === parseInt(req.params.id));
    if (!state) return res.status(404).send('State not found');

    const { name, capital, governor } = req.body;
    if (!name || !capital || !governor) return res.status(400).send('Missing data');

    state.name = name;
    state.capital = capital;
    state.governor = governor;

    res.json(state);
});

// Delete a state
app.delete('/state/:id', (req, res) => {
    const stateIndex = states.findIndex(s => s.id === parseInt(req.params.id));
    if (stateIndex === -1) return res.status(404).send('State not found');

    const deletedState = states.splice(stateIndex, 1);
    res.json(deletedState);
});

const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});