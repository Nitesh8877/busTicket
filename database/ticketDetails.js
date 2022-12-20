const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketStatus = new Schema({

    status: {
        type: Boolean
    },
    ticketNo: {
        type: Number,
        unique: true,
        sparse: true,
        min: 1,
        max: 40,

    },
    userDetails: [{
        name: {
            type: String,
        },
        age: {
            type: Number,
        },

    }],
    source: {
        type: String,
    },
    destination: {
        type: String,
    }
});

const ticketModel = mongoose.Model('tickets', ticketStatus);
module.exports = ticketModel;
