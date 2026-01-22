const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }, filename: {
        type: String,
        required: true
 
    },
    originalName: {
  
        type: String,
        required: true
    },
  
    path: {
        type: String,
        required: true
    },
   
    mimetype: {
        type: String,
        required: true
    },
   
   
  
    size: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
 
 
        default: []
    },
    versions: [{
        filename: String,
        originalName: String,
        path: String,
        mimetype: String,
   
        size: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('document', DocumentSchema);
