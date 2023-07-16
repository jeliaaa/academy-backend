const mongoose = require("mongoose");
const Properties = new mongoose.Schema({
  props: {
    type: String,
  },
  value: {
    type: String,
  },
});
const PropertiesRU = new mongoose.Schema({
  props: {
    type: String,
  },
  value: {
    type: String,
  },
});
const PropertiesGE = new mongoose.Schema({
  props: {
    type: String,
  },
  value: {
    type: String,
  },
});
const Images = new mongoose.Schema({
  url: {
    type: String,
  },
});
const Products = new mongoose.Schema({
    name :{
        type: String,
        required:true,
    },
    nameRU :{
        type: String,
        required:true,
    },
    nameGE :{
        type: String,
        required:true,
    },    
    description:{
        type : String,
        required:true
    },
    descriptionRU:{
        type : String,
        required:true
    },
    descriptionGE:{
        type : String,
        required:true
    },
    properties : [Properties],
    propertiesRU : [PropertiesRU],
    propertiesGE : [PropertiesGE],
    mainImage: {
        type : String,
        required: true,
    },
    images: [Images],

});

const ProductScheme = new mongoose.Schema({
    prodType:{
        type: String,
        required: true,
    },
    products:[Products]
});

module.exports = mongoose.model('products', ProductScheme);
