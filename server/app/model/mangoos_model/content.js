const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var contentSchema = new mongoose.Schema({
    name: String,
    description: String,
    category_id: String,
    user_id: String,
    files: [],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    collection: 'content'
});
contentSchema.index({ name: 'text', description: 'text' });
contentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('content', contentSchema);