const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        minlength: [3, 'Category name is too short'],
        maxlength: [32, 'Category name is too long']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true });

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
