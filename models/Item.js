const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    name: {
        type: String
    },
    bsgId: {
        type: String
    },
    shortName: {
        type: String
    },
    traderName: {
        type: String
    },
    traderPrice: {
        type: String
    },
    traderPriceCur: {
        type: String
    },
    updated: {
        type: String
    },
    icon: {
        type: String
    },
    link: {
        type: String
    },
    wikiLink: {
        type: String
    },
})

module.exports = mongoose.model('Item', itemSchema);