// Importing express and mongoose
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require(`dotenv`).config();


// Create a port
const PORT = 3040;

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
console.log('Database connected successfully');
}).catch((e)=>{
    console.log('Error connected to Database:', e.message);
})

// Create a schema model
const statesandcapitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is  require']
    },
    capital: {
        type: String,
        required: [true, 'Capital is required']
    
    },
    governor: {
        type: String,
        required: [true, 'Governor is required']
    }

}, {timestamps: true});
const movieModel = mongoose.model('Movies', movieSchema)


app.post('/create', async (req, res)=>{
    try {
        // Get the data from the request body
        const data = req.body;
        // Create an instance of the document
        const movie = new movieModel(data);

        const newMovie = await movie.save();
        // Check error
        if(!newMovie){
            res.status(400).json({
                message: 'Error creating movie'
            })
        }else {
            // Send a success message
            res.status(201).json({
                message: 'Movie created successfully', 
                data: newMovie
            })
        }
     }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/allMovies', async(req, res)=>{
    try {
        // Get all data from the database
        const allMovies = await movieModel.find();
        // Check if there are no values returned
        if (allMovies.length === 0){
            res.status(200).json({
                message: 'There are currently no movie in this database',
                data: allMovies
            })
        }else {
            res.status(200).json({
                message: `List of all movies in this database, Total number is ${allMovies.length}`,
                data: allMovies
            })
        }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
});

app.get('/movie/:id', async (req, res)=>{
    try {
        // Get the id  from the params
        const id = req.params.id;
        // Get the data from the database
        const movie = await movieModel.findById(id);
        // Check if there are no values returned
        if(!movie){
            res.status(404).json({
                message: 'Movie not found'
            })
         }else{
            res.status(200).json({
                message: `Showing movie with ID: ${id}`,
                data: movie
            })
         }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.put ("/movie/:id", async (req, res)=>{
    try {
         // Get the id from the params
         const id = req.params.id;
         const data = req.body;
         // Find and put
         const movie = await movieModel.findByIdAndUpdate(id, data, {new: true});
         //Check if there is an error
         if(!movie){
            res.status(404).json({
                message: "Movie not fond"
            })
        
         } else{
            res.status(200).json({
                message: `Showing movie with ID: ${id}`,
                data: movie
            })
         }
        
     
    }catch (error) {
        res.status(500).json({
            message: "error.message"
        })
    }
})


app.patch ('/movie/:id', async (req, res)=>{
    try {
         // Get the id from the params
         const id = req.params.id;
         const data = req.body;
         // Find and update
         const movie = await movieModel.findByIdAndUpdate(id, data, {new: true});
         //Check if there is an error
         if(!movie){
            res.status(404).json({
                message: 'Movie not fond'
            })
        
         } else{
            res.status(200).json({
                message: `Showing movie with ID: ${id}`,
                data: movie
            })
         }
        
     
    }catch (error) {
        res.status(500).json({
            message: 'error.message'
        })
    }
})


app.delete('/movie/:id', async (req, res)=>{
    try {
         // Delete the id from the params
         const id = req.params.id;
         const movie = await movieModel.findByIdAndDelete(id);

         //Check if there is an error
         if(!movie){
            res.status(404).json({
                message: 'Movie not found'
            });
        
         } else{
            res.status(200).json({
                message: `Movie with ID: ${id} deleted successfully`
            });
         }
        
     
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})