const UnauthorizedError = require("../../errors/unauthorized");
const NotFoundError = require("../../errors/not-found");
const articlesService = require("./articles.service");
const User = require('../users/users.model');
class ArticlesController {
  async getAll(req, res, next) {
    try {
      // Récupérer l'ID de l'utilisateur connecté à partir de req.user
      const userId = req.user.id;
  
      // Récupérer uniquement les articles de l'utilisateur connecté
      const articles = await articlesService.getAll(userId);
  
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  



  async create(req, res, next) {
    try {
      // Récupérer l'ID de l'utilisateur connecté à partir de req.user
      const userId = req.user.id;

      // Créer l'article en utilisant l'ID de l'utilisateur connecté
      const article = await articlesService.create(userId, req.body);
      
      // Émettre un événement pour les clients en temps réel
      req.io.emit("article:create", article);
      
      // Répondre avec l'article créé
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const articleId = req.params.id;
      const userId = req.user.id; // Assuming req.user is populated by your auth middleware
      const user = await User.findById(userId);
  
      if (!user || user.role !== 'admin') {
        throw new UnauthorizedError();
      }
  
      const updatedArticle = await articlesService.update(articleId, req.body);
  
      // Émettre un événement pour informer les clients en temps réel de la mise à jour de l'article
      req.io.emit('article:update', updatedArticle);
  
      res.json(updatedArticle);
    } catch (err) {
      next(err);
    }
  }
  

  async delete(req, res, next) {
    try {
      const articleId = req.params.id;
      const userId = req.user.id; // Assuming req.user is populated by your auth middleware
      const user = await User.findById(userId);

      if (user.role !== 'admin') {
        throw new UnauthorizedError();
      }

      await articlesService.delete(articleId);
      req.io.emit('article:delete', { id: articleId });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = new ArticlesController();
