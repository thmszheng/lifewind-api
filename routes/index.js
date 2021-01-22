import express from "express";
import {
  upsertStory,
  getStories,
  getStoriesByUserId,
  getStory,
  deleteStory,
} from "../manager";
import logger from "../logger";

const router = express.Router();

const selectId = (req) => req.params.id;
const selectBody = (req) => req.body;

router.get("/", async (req, res) => {
  logger.log("info", "request was received at endpoint /");
  res.sendStatus(200);
});

router.post("/blog/stories", async (req, res) => {
  const body = selectBody(req);
  logger.log(
    "info",
    `request data ${JSON.stringify(
      body
    )} was received at endpoint /blog/stories`
  );
  const collection = req.app.locals.blogCollection;
  const result = await upsertStory({ collection, body });
  res.send(result);
});

router.post("/news/stories", async (req, res) => {
  const body = selectBody(req);
  logger.log(
    "info",
    `request data ${JSON.stringify(
      body
    )} was received at endpoint /news/stories`
  );
  const collection = req.app.locals.newsCollection;
  const result = await upsertStory({ collection, body });
  res.send(result);
});

router.get("/blog/stories", async (req, res) => {
  logger.log("info", "request was received at endpoint /blog/stories");
  const collection = req.app.locals.blogCollection;
  const result = await getStories(collection);
  res.send(result);
});

router.get("/news/stories", async (req, res) => {
  logger.log("info", "request was received at endpoint /news/stories");
  const collection = req.app.locals.newsCollection;
  const result = await getStories(collection);
  res.send(result);
});

router.get("/blog/stories/:id", async (req, res) => {
  const id = selectId(req);
  logger.log(
    "info",
    `request data ${id} was received at endpoint /blog/stories/:id`
  );
  const collection = req.app.locals.blogCollection;
  const result = await getStory({ collection, id });
  res.send(result);
});

router.get("/news/stories/:id", async (req, res) => {
  const id = selectId(req);
  logger.log(
    "info",
    `request data ${id} was received at endpoint /news/stories/:id`
  );
  const collection = req.app.locals.newsCollection;
  const result = await getStory({ collection, id });
  res.send(result);
});

router.get("/blog/users/:id", async (req, res) => {
  const id = selectId(req);
  logger.log(
    "info",
    `request data ${id} was received at endpoint /blog/users/:id`
  );
  const collection = req.app.locals.blogCollection;
  const result = await getStoriesByUserId({ collection, id });
  res.send(result);
});

router.delete("/blog/stories/:id", async (req, res) => {
  const id = selectId(req);
  logger.log(
    "info",
    `request data ${id} was received at endpoint /blog/stories/:id`
  );
  const collection = req.app.locals.blogCollection;
  const { deletedCount } = await deleteStory({ collection, id });
  res.send({ deletedCount });
});

export default router;
