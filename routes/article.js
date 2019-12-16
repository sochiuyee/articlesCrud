const express = require('express')
const { Article } = require('../js/model')
const { dateFormat } = require('../js/method')
const router = express.Router()

// 添加文章接口/编辑文章接口
router.post('/add', function (req, res) {
    const id = parseInt(req.body.id)
    if (id) { // 编辑
        const page = req.body.page
        let title = req.body.title
        let content = req.body.content

        // 将替换掉的内容更新到数据库
        Article.findOneAndUpdate({ id: id }, { $set: { title: title, content: content } }, function (err, success) {
            if (success) {
                res.redirect(`/index?page=${page}`)
            }
        })
    } else { // 新增

        let data = {
            title: req.body.title,
            content: req.body.content,
            time: dateFormat(Date.now()),
            id: Date.now(),
            author: req.session.username
        }

        Article.create(data, function (err) {
            if (err) {
                console.warn('添加文章失败，请重新添加')
                res.redirect('/write')
            } else {
                res.redirect('/index')
            }
        })
    }
})

// 删除文章接口
router.get('/delete', function (req, res) {
    const id = parseInt(req.query.id)
    const page = req.query.page
    Article.findOneAndDelete({ id: id }, function (err) {
        if (err) {
            console.warn('删除失败')
        } else {
            res.redirect(`/index?page=${page}`)
        }
    })
})

module.exports = router