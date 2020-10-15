var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, default: 'Medical instrument', required: true},
    specialty: {type: String, default: 'Medical', required: true},
    condition: {type: String, default: 'Good condition', required: true},
    description: {type: String, required: true},
    //ref option is what tells Mongoose which model to use during population
    owner: {type: Schema.Types.ObjectId, ref:'User'},
    likes: [{type: Schema.Types.ObjectId, ref:'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema)