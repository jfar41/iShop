const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: String,
    },
    {
        timestamps: true
    }
);

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        //transform removes properties. Want to remove password 
        //when serializing doc(mongoose document which is being converted)
        //to JSON
        //ret is the object that resulted due to the conversion
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save', function(next) {
    //this (JS keyword) being set to current User document being saved
    const user = this;
    if (!user.isModified('password')) return next();
    //if password has been changed, salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err);
        //replace the user provided password with the hash
        user.password = hash;
        next();
    })
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
    //'this' represents the document i called comparePasswords on
    bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema);