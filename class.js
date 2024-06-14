// Importing express and mongoose
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require(`dotenv`).config();

// Create a port
const PORT = 2230;

// Use express middleware
const app= express();
//Use express JSON bodyParser
app.use(express.json())

//Connect to server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
    
})

const URL = process.env.DATABASE
console.log(URL);

mongoose.connect(URL).then(()=>{
console.log(`Successfully connected to Database`);
}).catch((e)=>{
    console.log("Can not connect to Database:", e.message);
})

// Create a schema model
const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is  require'],
         unique: [true]  
    },
    capital: {
        type: String,
        required: [true, 'Capital is required']
    },
    governor: {
        type: String,
        required: [true, 'governor is required']
    }

}, {timestamps: true});
const stateModel = mongoose.model('States', stateSchema)

app.post('/create', async (req, res)=>{
    try {
        // Get the data from the request body
        const data = req.body;
        // Create an instance of the document
        const state = new stateModel(data);

        const newState = await state.save();
        // Check error
        if(!newState){
            res.status(400).json({
                message: 'An error has occurred creating state'
            })
        }else {
            // Send a success message
            res.status(201).json({
                message: 'State has been successfully created', 
                data: newState
            })
        }
     }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/allStates', async(req, res)=>{
    try {
        // Get all data from the database
        const allStates = await stateModel.find();
        // Check if there are no values returned
        if (allStates.length === 0){
            res.status(200).json({
                message: 'There is currently no state in this database',
                data: allStates
            })
        }else {
            res.status(200).json({
                message: `List of all the states in this database, Total number is ${allStates.lenght}`,
                data: allStates
            })
        }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
});

app.get('/state/:id', async (req, res)=>{
    try {
        // Get the id  from the params
        const id = req.params.id;
        // Get the data from the database
        const state = await stateModel.findById(id);
        // Check if there are no values returned
        if(!state){
            res.status(404).json({
                message: 'No state found'
            })
         }else{
            res.status(200).json({
                message: `Showing state with ID: ${id}`,
                data: state
            });
         }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.put ("/state/:id", async (req, res)=>{
    try {
         // Get the id from the params
         const id = req.params.id;
         const data = req.body;
         // Find and put
         const state = await stateModel.findByIdAndUpdate(id, data, {new: true});
         //Check if there is an error
         if(!state){
            res.status(404).json({
                message: 'no state found'
            })
        
         } else{
            res.status(200).json({
                message: `Showing state with ID: ${id}`,
                data: state
            })
         }
        
     }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete('/state/:id', async (req, res)=>{
    try {
         // Delete the id from the params
         const id = req.params.id;
         const state = await stateModel.findByIdAndDelete(id);

         //Check if there is an error
         if(!state){
            res.status(404).json({
                message: 'No state found'
            });
        
         } else{
            res.status(200).json({
                message: `State with ID: ${id} deleted successfully`
            });
         }
        
     
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});