const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/manage', { useUnifiedTopology: true, useNewUrlParser: true });

// 定义用户模型
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true // 限制用户名不重复
    },
    password: {
        type: String
    }
})

// 定义文章模型
const ArticleSchema = new mongoose.Schema({
    title: { 
        type: String 
    },
    content: { 
        type: String 
    },
    time: { 
        type: String 
    },
    id: { 
        type: Number, 
        required: true 
    },
    author: { 
        type: String 
    }
})

const User = mongoose.model('User', UserSchema)
const Article = mongoose.model('Article', ArticleSchema)

module.exports = { User, Article }