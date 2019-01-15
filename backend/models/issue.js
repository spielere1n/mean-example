const mongoose = require('mongoose');

let issue = mongoose.Schema({
    title: { type: String },
    responsible: { type: String },
    description: { type: String },
    severity: { type: String },
});

let Issue = module.exports = mongoose.model('Issue', issue);