const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Product = new Schema({
    _id : Number,
    name: {type: String,  require: true ,maxLength: 255},
    description: {type: String, maxLength:600},
    image: {type: String, maxLength:255},
    slug: { type: String, slug: 'name' , unique: true}
},{timestamps: true});

// Add plugin 
mongoose.plugin(slug);
Product.plugin(AutoIncrement);
Product.plugin(mongooseDelete , { 
        _id: false,
        deletedAt : true,
        overrideMethods: 'all' 
        });


module.exports = mongoose.model('Product', Product);