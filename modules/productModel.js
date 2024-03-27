const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,
        minLength:[3,'too short product title'],
        maxLength:[1000,'too long product title'],
    },
    slug:{
        type:String,
        require:true,
        lowercase:true,
    },
    description:{
        type:String,
        require:[true,'product description is required'],
        minLength:[20,'too short description'],
    //    maxLength:[1000,'too long description']
    },
    quantity:{
       type:Number,
       require:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        require:[true,"product price is required"],
        trim:true,
        max:[200000,'too long product price'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    color:[String],
    imageCover:{
        type:String,
        require:[true,'product cover image required'],
    },
    image:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        require:[true,"brand must be belong to category"],
    },
    subCategory:{
        type:mongoose.Schema.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand',
    },
    ratingsAverage:{
        type:Number,
        min:[1,'rating must be equal 1 atleast'],
        max:[5,'rating cant be more than 5'],
    },
    ratingsQuantity:{
        type:Number,
        default:0
    }
}
    ,{timestamps:true});
 // Mongoose query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select: 'name -_id',
    });
    next();
  });
module.exports =mongoose.model('Product',productSchema);