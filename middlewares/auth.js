const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new UnauthorizedError("No token provided");
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    
    // Création d'un objet utilisateur contenant toutes les informations pertinentes
    const user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role, // ou tout autre champ que vous avez dans le token JWT
      // Ajoutez d'autres champs d'information utilisateur au besoin
    };

    req.user = user; // Ajout de l'objet utilisateur dans req
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};
