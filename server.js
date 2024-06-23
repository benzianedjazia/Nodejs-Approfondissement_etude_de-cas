const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const NotFoundError = require("./errors/not-found");
const userRouter = require("./api/users/users.router");
const articleRouter = require("./api/articles/articles.router");
const usersController = require("./api/users/users.controller");
const authMiddleware = require("./middlewares/auth");
const usersRoutes = require('./routes/usersRoutes'); 
require("./api/articles/articles.schema"); // Importer le schéma des articles

const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});


// Configurer le moteur de template EJS
app.set('view engine', 'ejs');









app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

// Route publique pour les articles d'un utilisateur
app.use('/api/users', usersRoutes);

// Routes protégées par l'authentification
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/articles", authMiddleware, articleRouter);
app.post("/login", usersController.login);

app.use("/", express.static("public"));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    status,
    message,
  });
});

module.exports = {
  app,
  server,
};
