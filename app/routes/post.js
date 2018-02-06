const express = require('express');
const router = express.Router();

const fs = require('fs');

let User = require('../database/models/user');


const URL = 'D:/project/meetingHelp';


// 获取账户信息
router.post('/getUserByAttr', function (req, res) {
	// if (!req.body.attr || !req.body.val) {
	// 	res.send(200, {
	// 		mes: '参数错误。'
	// 	});
	// 	return false;
	// }
	// User.findUserByAttr(req.body.attr, req.body.val, (user) => {
	// 	res.send(200, user);
	// })
	res.send(200, '15523');
	
});


module.exports = router;