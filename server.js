 // Importing express and mongoose
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


// Create a port
const PORT = 4044;

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
console.log(`Database connected successfully`);
}).catch((e)=>{
    console.log('Error connected to Database:', e.message);
})

// Create a schema model
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is  require']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    Industry: {
        type: String,
        required: [true, 'Industry is required']
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

app.get(`/allmovies`, async (req, res)=> {
    try{
        // get all data from database
        const allMovies = await moviesModel.find();
        // 
        if (allMovies.lenght === 0) {
            res.status(200).json({
                message: `Listen of all movie in this database, Total number is $
                {allMovies.length}`,
                data: allMovies
            })
        }
    } catch (error) {

    }

    app.get(`/allmovie`, async (req, res)=> {
        data: allmovies
    })

});

app.get(`/movie.id`, async (req, res) => {
    try{
        // 
        const id = req.params.id;
        
    } 
}
)
