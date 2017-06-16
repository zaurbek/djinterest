const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
    image: String,
    title: String,
    creatorName: String,
    creatorId: String,
    id: String,
    likes: {
        by: Array,
        amount: Number
    },
    pins: {
        by: Array,
        amount: Number
    }
})


const Pin = mongoose.model('Pins',PinSchema);

module.exports = Pin;
