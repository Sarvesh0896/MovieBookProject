const mongoose = require('mongoose');

var moviebookSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: 'This field is required.'
    },

    urllink: {
        type: String
    },

    summ: {
        type: String
    }

});

mongoose.model('Moviebook',moviebookSchema );