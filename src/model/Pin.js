const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
    image: String,
    title: String,
    creatorName: String,
    creatorId: String,
    id: String,
    likes: Array,
    pins: Array,
})


const Pin = mongoose.model('Pins',PinSchema);

module.exports = Pin;
