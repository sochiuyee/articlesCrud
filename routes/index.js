const express = require('express')
const { Article } = require('../js/model')

const router = express.Router()

// 渲染主页
router.get('/index', function (req, res) {
  const username = req.session.username

  const page = req.query.page || 1

  let pageDetail = {
    total: 0,
    curPage: page,
    list: [] // 当前页的文章列表
  }

  const pageSize = 10

  // 查询所有的文章
  Article.find({ author: username }, function (err, datas) {
    // 得出总共页数
    pageDetail.total = Math.ceil(datas.length / pageSize)
  })

  // find({筛选条件},{显示的内容},{options},callback)
  Article.find({ author: username }, null, { limit: pageSize, skip: (page - 1) * pageSize, sort: { _id: -1 } }, function (err, filterResult) {

    // 将查询得到的当前页结果存放在list属性中
    pageDetail.list = filterResult
    res.render('index', { username: username, list: pageDetail })
  })

})

// 渲染注册页
router.get('/register', function (req, res) {
  res.render('register', {}) // 渲染页面内容
})

// 渲染登录页
router.get('/login', function (req, res, next) {
  res.render('login', {})
})

// 渲染添加文章页/编辑文章页
router.get('/write', function (req, res, next) {
  const username = req.session.username || '';
  const id = parseInt(req.query.id)
  const page = req.query.page
  let data = {
    title: '',
    content: ''
  }

  if (id) { // 编辑
    Article.findOne({ id: id }, function (err, success) {
      if (err) {
        console.warn('查询不到相关数据')
      } else {
        data = success
        data['page'] = page
        res.render('write', { username: username, item: data }) // 将查询到相关结果内容渲染到页面
      }
    })
  } else { // 新增文章
    res.render('write', { username: username, item: data }) // 渲染页面内容
  }
})


// 渲染详情页
router.get('/detail', function (req, res) {
  const id = parseInt(req.query.id)
  const username = req.session.username
  Article.findOne({ id: id }, function (err, success) {
    if (success) {
      console.log(success, username)
      let item = success
      res.render('detail', { item: item, username: username })
    }
  })
})

module.exports = router