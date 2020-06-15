const express = require('express');
const app = express();

const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors', {useNewUrlParser: true});

app.use(express.static(__dirname + '/public/dist/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const AuthorSchema =  new mongoose.Schema({
    name: {type: String, required: [true, "Everybody has a name"], minlength: [3, "Name must be at least 3 characters."]}
}, {timestamps: true});

const Author = new mongoose.model('Author', AuthorSchema);

app.get('/api/authors', (req, res) => {
    Author.find()
        .then(data => {
            res.json({message: 'success', data: data})
        })
        .catch(err => {
            res.json({message: 'error', data: err});
        });
});

app.get('/api/authors/:id', (req, res) => {
    Author.findOne({_id: req.params.id})
        .then(data => {
            res.json({message: 'success', data: data});
        })
        .catch(data => {
            res.json({message: 'error', data: err});
        })
});

app.post('/api/authors', (req, res) => {
    Author.create(req.body)
        .then(data => {
            res.json({message: 'success', data: data});
        })
        .catch(err => {
            res.json({message: 'error', data: err});
        });
});

app.put('/api/authors/:id', (req, res) => {
    if(req.body.name.length < 3) {
        res.json({message: 'error', data: 'too short'});
        return;
    }
    Author.updateOne({_id: req.params.id}, {$set: req.body})
        .then(data => {
            res.json({message: 'success', data: data});
        })
        .catch(err => {
            res.json({message: 'error', data: err});
        });
});

app.delete('/api/authors/:id', (req, res) => {
    Author.deleteOne({_id: req.params.id})
        .then(data => {
            res.json({message: 'success', data: data});
        })
        .catch(err => {
            res.json({message: 'error', data: err});
        });
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"));
})

app.listen(8000, () => console.log('Server started on port 8000'));