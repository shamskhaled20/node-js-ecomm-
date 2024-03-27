const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique: [true,'subCategory must be unique'],
        minlength: [2, 'Category name is too short'],
        maxlength: [32, 'Category name is too long']

    },
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'subCategory must be child of category']
    }
       
},
{timestamps: true}

);
module.exports = mongoose.model('subCategory',SubCategorySchema)