const mongoose = require('mongoose');

const stream = new mongoose.Schema({
    guildID: { type: String, default: undefined },
    userID: { type: String, default: undefined },
    channel: { type: String, default: undefined },
    date: { type: Number, default: undefined }
})

module.exports = mongoose.model('streamSaved', stream);