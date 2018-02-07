/**
 * 用户表
 */
let mongoose = require('../db'),
	Schema = mongoose.Schema;

let _underscore = require('underscore');

let bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
	"name": {		
		type: String
	},
	"password": {
		type: String,
		default: "111111"
	},
	"email": {	
		unique: true,
		type: String
	},
	"phone": {
		unique: true,
		type: String,
	},
	"desc": {
		type: String,
		default: ""
	},
	"level": {
		type: Number,
		default: "1"
	},
	"dName": {
		type: String,
		default: ""
	},	
	"meta": {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//每次创建都会调用这个方法
userSchema.pre('save', function (next) {
	var user = this;

	//判断是否是新的数据对象，更新创建|更新数据的时间
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	//加盐
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		})
	})
})

userSchema.statimethodscs = {};

userSchema.statics = {	
	findUserByAttr: function (attr, val, callback) {
		this.findOne({
			[attr]: val
		}).exec((err, user) => {
			if (err) {
				console.log(err);
				callback('faile');
			} else {
				callback(user);				
			}
		});
	}
}



module.exports = mongoose.model('user', userSchema);