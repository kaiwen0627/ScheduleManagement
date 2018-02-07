/**
 * 用户表
 */
let mongoose = require('../db'),
	Schema = mongoose.Schema;

let _underscore = require('underscore');

let bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

let schedule = new Schema({
	"title": {		
        type: String,
	},
	"desc": {
		type: String,
	},
	"address": {	
		type: String
	},
	"alertTime": {
		type: Date,
		default:Date.now()+5*3600*1000   //默认五分钟之后
	},
	"cycleTime": {
		type: Number,
		default:0
	},
	"isAllDay": {
		type: Number,
		default: 0
	},
	"startTime": {
		type: Date,
		default: Date.now()
    },
    "endTime": {
		type: Date,
		default: Date.now()
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

schedule.statimethodscs = {};

schedule.statics = {
	
	findScheduleList: function (attr, val, callback) {
		if (attr && val) {
			this.find({
				[attr]: val,
				"level": 1
			}).sort({
				"_id": -1
			}).exec((err, userList) => {
				if (err) {
					console.log(err);
				} else {
					callback(userList);
				}
			});
		} else {
			this.find({
				"level": 1
			}).sort({
				"_id": -1
			}).exec((err, userList) => {
				if (err) {
					console.log(err);
				} else {
					callback(userList);
				}
			});
		}
	},
	findScheduleByAttr: function (attr, val, callback) {
		this.findOne({
			[attr]: val
		}).exec((err, user) => {
			if (err) {
				console.log(err);
				callback('faile');
			} else {
				callback(user);
				// callback({
				// 	'name': user.name,
				// 	'email': user.email,
				// 	'phone': user.phone,
				// 	'desc': user.desc,
				// 	'dName': user.dName,
				// 	'level': user.level,
				// });
			}
		});
	},
	addSchedule: function (scheduleinfo, callback) {
		let schedule = {
			"title": scheduleinfo.title,
			"desc": scheduleinfo.desc,
			"address": scheduleinfo.address,
			"alertTime": scheduleinfo.alertTime,
			"isAllDay": scheduleinfo.isAllDay,
			"startTime": scheduleinfo.startTime,
			"endTime": scheduleinfo.endTime,
		}

		this.create(schedule, (err) => {
			if (err) {
				callback({
					'status': "faile",
					'mes': err
				});
			} else {
				callback({
					'status': "success",
				});
			}
		})
	},
	delSchedule: function (name, callback) {
		this.remove({
			'name': name
		}, function (err) {
			if (err) {
				callback({
					'status': "faile",
					'mes': err
				});
			} else {
				callback({
					'status': "success",
				});
			}
		})
	},
	updateSchedule: function (name, update, callback) {
		var _this = this;
		this.findOne({
			'name': name
		}, function (err, oldUser) {
			if (err) {
				callback({
					'status': "faile",
					'mes': err
				});
			} else {
				let canReset = false;
				for (let attr in update) {
					if (update[attr] == oldUser[attr]) {
						canReset = false;
					} else {
						canReset = true;
						break;
					}
				}

				if (!canReset) {
					callback({
						'status': "faile",
						'mes': "信息重复。"
					});
					return false;
				}

				let newUser = _underscore.extend(oldUser, update);
				newUser.meta.updateAt = Date.now();

				_this.update({
					'name': name
				}, newUser, {
					upsert: true
				}, function (error) {
					if (err) {
						callback({
							'status': "faile",
							'mes': err
						});
					} else {
						callback({
							'status': "success",
							'userMes': newUser
						});
					}
				});
			}
		});
	}
}



module.exports = mongoose.model('schedule', schedule);