const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
});

let usersModel = mongoose.model('bloguser',userSchema);

module.exports = usersModel;
