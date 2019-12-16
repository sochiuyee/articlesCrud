const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

// 引入路由
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const articleRouter = require('./routes/article')

const app = express()

// 使用模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 在 Express 中提供静态文件
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json()) // 加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: true })) //加载解析urlencoded请求体的中间件

// session配置
app.use(session({
    secret: 'manage project',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }
}))

// 使用路由
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/article', articleRouter)

// 登录拦截
app.get('*', function (req, res, next) {
    const username = req.session.username // 获取session存储
    const path = req.path
    if (path != '/login' && path != '/register') {
        if (!username) { // 对没有登录过的用户进行拦截强制登录
            res.redirect('/login')
        }
    }
    next() // 执行完当前的中间件后，放行允许下一个中间件执行
})

app.listen(3000, function () {
    console.log('Server is running')
})