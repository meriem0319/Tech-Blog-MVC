const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "userId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  hooks: true,
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  hooks: true,
});

Comment.belongsTo(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  hooks: true,
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true,
});

module.exports = { User, Comment, Post };
