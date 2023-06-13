const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Please enter description'],
    },
    photographer:{
        type: String,
        required: [true, 'Please enter photographer'],
    },
    nasa_id:{
        type: String,
        required: [true, 'Please enter nasa_id'],
    },
    url:{
        type: String,
        required: [true, 'Please enter url'],
    },
    media_type:{
        type: String,
        required: [true, 'Please enter media_type'],
    }
});

module.exports = mongoose.model('Asset', assetSchema);