### 路由设计
| 请求方法   | 请求路径 |     get参数 |  post参数 | 备注 |
| :----- | :---: | :-------: |:-------: |:-------: |
| POST |  /register  |  |  |注册用户信息 |
| POST |  /login  |  | |登录用户 |
| GET |  /logout  |  | | 退出登录|
| GET |  /index  |  |  |渲染首页用户所有文章页面 |
| GET |  /register  |  | |渲染注册页面 |
| GET |  /login  |  | |渲染登录页面 |
| GET |  /write  | id(可选) | |编辑文章内容页面 |
| GET |  /detail  |  | |渲染详情页 |
| POST |  /add  | | id(可选) | 提交发布或提交修改文章 |
| GET |  /delete  | id | | 删除文章 |

- 业务功能顺序
    - 注册
    - 登录
    - 添加文章
    - 编辑文章
    - 删除文章
    - 查看文章详情
    - 退出登录

- npm install
- npm start
- 浏览器输入`localhost:3000/register`