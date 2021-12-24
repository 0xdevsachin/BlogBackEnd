const mongoose = require("mongoose");
const { Schema } = mongoose;
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
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  PublishName: {
    type: String,
    require: true,
  },
});

const blog = mongoose.model("blog", BlogSchema);

module.exports = blog;
