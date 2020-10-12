const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    fileName: String,
    fileText:String,
    fileExtension:String,
    type:String,
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('File', fileSchema);