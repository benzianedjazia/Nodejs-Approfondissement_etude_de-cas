// api/articles/articles.schema.js

const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
});

module.exports = model("Article", articleSchema);
