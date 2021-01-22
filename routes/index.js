import express from 'express';
import { upsertStory, getStories, getStoriesByUserId, getStory, deleteStory } from "../manager";

const router = express.Router();

const selectId = (req) => req.params.id;
const selectBody = req => req.body;

router.get("/", async (req, res) => {
  res.sendStatus(200);
});

router.post("/blog/stories", async (req, res) => {
  const body = selectBody(req);
  const collection = req.app.locals.blogCollection;
  const result = await upsertStory({ collection, body });
  res.send(result);
});

router.post("/news/stories", async (req, res) => {
  const body = selectBody(req);
  const collection = req.app.locals.newsCollection;
  const result = await upsertStory({ collection, body });
  res.send(result);
});

router.get("/blog/stories", async (req, res) => {
  const collection = req.app.locals.blogCollection;
  const result = await getStories(collection);
  res.send(result);
});

router.get("/news/stories", async (req, res) => {
  const collection = req.app.locals.newsCollection;
  const result = await getStories(collection);
  res.send(result);
});

router.get("/blog/stories/:id", async (req, res) => {
  const id = selectId(req);
  const collection = req.app.locals.blogCollection;
  const result = await getStory({ collection, id });
  res.send(result);
});

router.get("/news/stories/:id", async (req, res) => {
  const id = selectId(req);
  const collection = req.app.locals.newsCollection;
  const result = await getStory({ collection, id });
  res.send(result);
});

router.get("/blog/users/:id",  async (req, res) => {
  const id = selectId(req);
  const collection = req.app.locals.blogCollection;
  const result = await getStoriesByUserId({ collection, id });
  res.send(result);
});

router.delete("/blog/stories/:id", async (req, res) => {
  const id = selectId(req);
  const collection = req.app.locals.blogCollection;
  const result = await deleteStory({ collection, id });
  res.send(result);
});

export default router;
