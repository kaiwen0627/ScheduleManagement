const express = require('express');
const router = express.Router();
const moment = require('moment');

const fs = require('fs');

let User = require('../database/models/user');
let Schedule = require('../database/models/schedule');

//初始化数据
// Schedule.create({
// 	"title": "回家过年4",
// 	"desc": "回家",
// 	"address": "咸阳"
// });

User.findUserByAttr('phone', '12354154645', (data) => { 
	if (data == 'faile') {
		User.create({
			"name": "user1",
			"email": "111111@163.com",
			"phone": "12354154645",
			"password":'123456' 
		});
	}
})
User.findUserByAttr('phone', '12345678901', (data) => { 
	if (data == 'faile') {
		User.create({
			"name": "user2",
			"email": "222222@163.com",
			"phone": "12345678901",
			"password":'123456'
		});
	}
})

// 校验密码并获取账户信息
router.post('/checkpassword', function (req, res) {
	console.log(req.body)
	User.checkpassword(req.body.attr,req.body.val,req.body.password,(user) => {
		res.send(200, user);
	})
});


// 获取账户信息
router.post('/getUserByAttr', function (req, res) {
	console.log(req.body)
	User.findUserByAttr(req.body.attr,req.body.val,(user) => {
		res.send(200, user);
	})
});

//添加日程
router.post('/addSchedule', function (req, res) {
	console.log(req.body);

	Schedule.addSchedule(req.body,(status) => {
		res.send(200, status);
	})
});
//查询日程
router.post('/findScheduleByAttr', function (req, res) {
	console.log(req.body);

	Schedule.findScheduleByAttr(req.body.attr,req.body.val,(status) => {
		res.send(200, status);
	})
});
//删除日程
router.post('/delSchedule', function (req, res) {
	console.log(req.body);

	Schedule.delSchedule(req.body.attr,req.body.val,(status) => {
		res.send(200, status);
	})
});

//修改日程
router.post('/updateSchedule', function (req, res) {
	// console.log(req.body);

	Schedule.updateSchedule(req.body._id,req.body.updata,(status) => {
		res.send(200, status);
	})
});

//查找日程列表
router.post('/findScheduleListByAttr', function (req, res) {
	console.log(req.body);

	Schedule.findScheduleListByAttr(req.body.phone,req.body.timeDian,(status) => {
		res.send(200, status);
	})
});


//全局查找相关日程列表
router.post('/findScheduleListByWord', function (req, res) {
	console.log(req.body);

	Schedule.findScheduleListByWord(req.body.phone,req.body.word,(status) => {
		res.send(200, status);
	})
});

//全局指定时间日程列表
router.post('/findScheduleListByTime', function (req, res) {
	console.log(req.body);

	Schedule.findScheduleListByTime(req.body.phone,req.body.time,(status) => {
		res.send(200, status);
	})
});

module.exports = router;

