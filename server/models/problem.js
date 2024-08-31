const mongoose = require('mongoose')
const {Schema} = mongoose

const problemSchema = new Schema({
    problemId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sampleInput: {
        type: String,
        required: true
    },
    sampleOutput: {
        type: String,
        required: true
    },
    constraints: {
        type: String,
        required: true
    }
});

const problemModel = mongoose.model('Problem', problemSchema);

module.exports = problemModel