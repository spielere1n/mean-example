const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Issue = require('./models/issue');
const config = require('./config/database');

const app = express();

app.use(bodyParser.json());

//Connect to database
mongoose.connect(config.database);
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB database connection established');
});

app.get('/', (req, res) => {
    Issue.find((err, issues) => {
        if(err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

app.listen(4000, () => {
    console.log(`Express server running on port 4000`);
});