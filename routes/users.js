const express = require('express')
const router = express.Router()

const { User } = require('../js/model')

// 注册接口
router.post('/register', function (req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password
    }, function (err) {
        if (err) {
            console.log('注册失败');
            res.redirect('/register')
        }
        res.redirect('/login')
    })
})

// 登录接口
router.post('/login', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, success) {

        if (success == null) {
            console.warn('用户不存在，请注册')
            res.redirect('/register')
        }else if(success.password!==req.body.password){
            console.warn('输入密码不正确，请重新登录')
            res.redirect('/login')
        }else if(success.password==req.body.password&&req.body.username==req.body.username){
            // 登录成功，保存用户信息
            req.session.username = req.body.username
            res.redirect('/index')
        }
    })
})

// 退出登录
router.get('/logout', function (req, res) {
    // 注销session
    req.session.destroy(function (err) {
        res.redirect('/login')
    })
})


module.exports = router