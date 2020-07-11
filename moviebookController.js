const mongoose = require('mongoose');
const Moviebook = mongoose.model('Moviebook');
const express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    res.render("moviebook/addOrEdit",{
        viewTitle : "Insert Moviebook"
    });

});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res){
    var moviebook = new Moviebook();
    moviebook.movieName = req.body.movieName;
    moviebook.urllink = req.body.urllink;
    moviebook.summ = req.body.summ;

    moviebook.save((err, doc) => {
        if (!err)
            res.redirect('moviebook/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("moviebook/addOrEdit", {
                    viewTitle: "Insert Moviebook",
                    moviebook: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Moviebook.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('moviebook/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("moviebook/addOrEdit", {
                    viewTitle: 'Update Moviebook',
                    moviebook: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Moviebook.find((err, docs) => {
        if (!err) {
            res.render("moviebook/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving moviebook list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'movieName':
                body['movieNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Moviebook.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("moviebook/addOrEdit", {
                viewTitle: "Update Moviebook",
                moviebook: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Moviebook.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/moviebook/list');
        }
        else { console.log('Error in moviebook delete :' + err); }
    });
});


module.exports = router;