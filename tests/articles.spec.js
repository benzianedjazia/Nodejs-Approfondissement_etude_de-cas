const request = require("supertest");
const { app } = require("../server"); // Assurez-vous d'importer correctement votre application ou serveur
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema"); // Assurez-vous d'importer correctement votre modèle d'article
const articlesService = require("../api/articles/articles.service");

describe("Tester les API articles", () => {
  let token;
  const USER_ID = "66684c2214d932e81d765e9d"; // ID fictif de l'utilisateur
  const ARTICLE_ID = "66684c7114d932e81d765ea5"; // ID fictif de l'article
  const MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "djazia",
    content: "klnflkzjflkezjfezkflezkdldlel",
    user: USER_ID,
    status:  "published",
  };

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);

    mockingoose.resetAll(); // Réinitialise tous les mocks avant chaque test
  });

  test("[Articles] Create Article", async () => {
    mockingoose(Article).toReturn(MOCK_ARTICLE, "save");

    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_ARTICLE)
      .set("x-access-token", token);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_ARTICLE.title);
  });

  test("[Articles] Update Article", async () => {
    mockingoose(Article).toReturn(MOCK_ARTICLE, "findOneAndUpdate");

    const updatedTitle = "Updated Article Title";
    const res = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`)
      .send({ MOCK_ARTICLE, title: updatedTitle })
      .set("x-access-token", token);

  });
  test("[Articles] Delete Article", async () => {
    mockingoose(Article).toReturn(null, "findOneAndDelete");
  
    const res = await request(app)
      .delete(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token);
  

  });
  
});