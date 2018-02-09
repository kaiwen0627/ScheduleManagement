/**
 * 用户表
 */
let mongoose = require('../db'),
	Schema = mongoose.Schema;

let _underscore = require('underscore');

let bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const moment = require('moment');
let now = moment();


let schedule = new Schema({
	"title": {		
        type: String,
	},
	"name": {
		type: String,		
	},
	"phone": {		
		type: String
	},
	"desc": {
		type: String,
	},
	"address": {	
		type: String
	},
	"alertTime": {		
		type:[String]
	},
	"alertTimeIndex": {		
		type:[Number]
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
		type: String,
		default: now.format()
    },
    "endTime": {		
		type:String
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
	
	findScheduleListByAttr: function (phone,time, callback) {
		var reg = null;
		var y=now.format("YYYY-MM-DD HH:mm").split('-')[0];
		var m=now.format("YYYY-MM-DD HH:mm").split('-')[1];
		var d = now.format("YYYY-MM-DD HH:mm").split('-')[2].split(' ')[0];
		switch (time) {
			//当日
			case '1':
				reg = new RegExp(d, 'i');
				break;
			//当月	
			case '2':
				reg = new RegExp(m, 'i');
				break;
			//当年	
			default:
				reg = new RegExp(y, 'i');
			}
			console.log(reg);
		this.find({
			'phone': phone,
			'endTime':reg
		}).sort({
			"_id": -1
		}).exec((err, scheduleList) => {
			if (err) {
				console.log(err);
			} else {
				callback(scheduleList);

			}
		});
	},
	findScheduleListByTime: function (phone,time, callback) {
	
		reg = new RegExp(time, 'i');
		
		this.find({
			'phone': phone,
			'startTime':reg
		}).sort({
			"_id": -1
		}).exec((err, scheduleList) => {
			if (err) {
				console.log(err);
			} else {
				console.log(typeof scheduleList)
				callback(scheduleList);

			}
		});
	},
	findScheduleListByWord: function (phone,word, callback) {
		var reg = new RegExp(word, 'i');
		//支持描述、标题、地址搜索
		this.find({'phone':phone,$or:[{"desc":reg},{"title": reg},{"address":reg}]}).sort({
			"_id": -1
		}).exec((err, userList) => {
			if (err) {
				console.log(err);
			} else {
				callback(userList);

			}
		});
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
			}
		});
	},
	addSchedule: function (scheduleinfo, callback) {
		//console.log(now.format("YYYY-MM-DD HH:mm"));
		let schedule = {
			"title": scheduleinfo.title,
			"desc": scheduleinfo.desc,
			"name": scheduleinfo.name,
			"phone": scheduleinfo.phone,
			"address": scheduleinfo.address,
			"alertTime": scheduleinfo.alertTime,
			"isAllDay": scheduleinfo.isAllDay,
			"startTime": scheduleinfo.startTime,
			"endTime": scheduleinfo.endTime,
			"alertTimeIndex": scheduleinfo.alertTimeIndex,
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
	delSchedule: function (attr,val, callback) {
		this.remove({
			[attr]: val
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
	updateSchedule: function (id, update, callback) {
		var _this = this;
		this.findOne({
			'_id': id
		}, function (err, oldSchedule) {
			if (err) {
				callback({
					'status': "faile",
					'mes': err
				});
			} else {
				let canReset = false;
				for (let attr in update) {
					console.log(typeof update[attr])
					if (attr == 'alertTime') { 
						break;						
					}
					if (update[attr] != oldSchedule[attr]) {
						console.log(update[attr])
						canReset = true;
						break;
					} else {
						console.log('tip')
						canReset = false;						
					}
				
					console.log(canReset)
					
				}
				console.log('!!!!!!!!!')

				console.log(canReset)
				console.log(!canReset)

				if (!canReset) {
					callback({
						'status': "faile",
						'mes': "信息重复。"
					});
					return false;
				}


				// console.log(oldSchedule)
				// console.log(update)
				
				let newSchedule = _underscore.extend(oldSchedule, update);
				newSchedule.meta.updateAt = Date.now();
				// console.log(newSchedule)

				_this.update({
					'_id': id
				}, newSchedule, {
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
							'userMes': newSchedule
						});
					}
				});
			}
		});
	}
}



module.exports = mongoose.model('schedule', schedule);