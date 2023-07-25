const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    guildID: { type: String, default: undefined },
    streams: { type: Array, default: [] }
})

module.exports = mongoose.model('stream', streamSchema);