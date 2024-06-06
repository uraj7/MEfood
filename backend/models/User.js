const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(    //schema definations for user 
    {
        name:{
            type: String,
            required:true
        },
        location:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        password:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default:Date.now
        }

    }
);

//module.exports = mongoose.model('user',UserSchema)  // iska mtlab user nam ka collection tayyar ho jayega in db in that info users stored
module.exports = mongoose.model('user', UserSchema);
