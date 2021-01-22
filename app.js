import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import routes from './routes';

const BLOG_DATABASE_NAME = 'Lifewind';
const BLOG_COLLECTION_NAME = 'userBlog';
const NEWS_DATABASE_NAME = 'Lifewind-news';
const NEWS_COLLECTION_NAME = 'newsArticle';

const databaseUri = dbName => `mongodb+srv://lifewind_admin:admin_password123@lifewind-cluster1.f7rvl.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const blogMongoClient = new MongoClient(databaseUri(BLOG_DATABASE_NAME), { useNewUrlParser: true });

const newsMongoClient = new MongoClient(databaseUri(NEWS_DATABASE_NAME), { useNewUrlParser: true });

const port = process.env.port || 8080;

const app = express();

const limiter = rateLimit({
  windowMs: 1000 * 60, //1 minute
  max: 70,
  message: "Rate limit exceeded",
});

blogMongoClient.connect()
.then(client =>{
  const db = client.db(BLOG_DATABASE_NAME);
  app.locals.blogCollection  = db.collection(BLOG_COLLECTION_NAME);
});

newsMongoClient.connect()
.then(client =>{
  const db = client.db(NEWS_DATABASE_NAME);
  app.locals.newsCollection = db.collection(NEWS_COLLECTION_NAME);
});

app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(routes);

app.listen(port);
