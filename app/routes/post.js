const express = require('express');
const router = express.Router();

const fs = require('fs');

let User = require('../database/models/user');
let Schedule = require('../database/models/schedule');

//初始化数据
// Schedule.create({
// 	"title": "回家过年",
// 	"desc": "回家",
// 	"address": "咸阳"
// });

// User.create({
// 	"name": "杨璐",
// 	"email": "666666@163.com	",
// 	"phone": "98745632101"
// });




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

module.exports = router;