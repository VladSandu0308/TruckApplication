const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use(express.static("public"));

mongoose.connect('mongodb+srv://sda:sda@cluster0.dlytw.mongodb.net/basic_auth?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Database Connected!");
    })
    .catch((err) => {
        console.log(err);
    });

    

app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});


app.listen(5000, () => {
    console.log('Listening on port 5000');
});
