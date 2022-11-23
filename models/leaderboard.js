const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lbSchema = new Schema({
    playerName: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 1024,
    },
}, { timestamps: true });

const lb = mongoose.model('leaderboard', lbSchema);
module.exports = lb;