const express = require('express');
const router = express.Router();
const articlesService = require('../api/articles/articles.service');

// Route publique pour récupérer les articles d'un utilisateur
router.get('/:userId/articles', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const articles = await articlesService.getArticlesByUserId(userId);
    res.render('articles', { articles }); // Utilisez la vue EJS
  } catch (err) {
    next(err);
  }
});

module.exports = router;
