const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        unique: [true, 'Brand name must be unique'],
        minlength: [2, 'Brand name is too short'],
        maxlength: [32, 'Brand name is too long']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);

