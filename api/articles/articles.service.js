// api/articles/articles.service.js

const Article = require("./articles.schema");

class ArticlesService {
  async getArticlesByUserId(userId) {
    // Utilisez populate pour inclure les informations de l'utilisateur, sauf le mot de passe
    return Article.find({ user: userId }).populate('user', '-password').exec();
  }

  async getAll(userId) {
    try {
      // Utilisez l'ID de l'utilisateur pour filtrer les articles
      const articles = await Article.find({ createdBy: userId });
      return articles;
    } catch (err) {
      throw err;
    }
  }
  
  async create(userId, articleData) {
    const article = new Article({ ...articleData, user: userId });
    await article.save();
    return article;
  }

  async get(id) {
    return Article.findById(id).populate("user", "-password");
  }

  async update(id, data) {
    const article = await Article.findByIdAndUpdate(id, data, { new: true });
    return article;
  }
  
  async delete(id) {
    await Article.findByIdAndDelete(id);
  }
}

module.exports = new ArticlesService();
