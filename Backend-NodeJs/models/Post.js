const mongoose = require('mongoose');


const Postschema = new mongoose.Schema({
  header:String,
  title:String,
  owner:String ,
  nameOwner:String ,
  Like: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Post', Postschema);
 