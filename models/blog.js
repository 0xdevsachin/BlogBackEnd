const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    BlogTitle: {
        type: String,
        require: true,
    },
    BlogImage: {
        type: String,
    },
    BlogContent: {
        type: String,
        require: true,
    },
    userID: {
        type: String,
        require: true,
    },
    PublishName: {
        type: String,
        require: true,
    }
})

const blog = mongoose.model('blog', BlogSchema);

module.exports = blog;