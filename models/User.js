const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre("save", function (next) {
    var user = this;
    // 유져 정보 전체 선택

    // 비밀번호를 암호화 시킨다
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                // 원래 비밀번호에 암호화된 해쉬 넣기
                console.log("hash: ", hash);
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
