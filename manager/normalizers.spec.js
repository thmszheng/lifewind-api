import { createExcerpt, normalizeStories, normalizeStory } from "./normalizers";

const longTextbody = {
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor mi," +
    "nec cursus nisl imperdiet vitae. Maecenas eget orci ac lorem hendrerit eleifend ut non metus. " +
    "Quisque leo velit, volutpat quis turpis vitae, hendrerit posuere nisl. Morbi mattis dui at" +
    "quam ullamcorper gravida. Suspendisse eleifend diam eu augue ultrices elementum.",
};

const expectedLongExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis " +
  "vulputate dolor mi,nec cursus nisl imperdiet vitae. Maecenas eget orci ac lorem hendrerit " +
  "eleifend ut non metus. Quisque leo velit, volutpat...";

const shortTextBody = { body: "Lorem ipsum" };

const expectedShortExcerpt = "Lorem ipsum...";

const stories = [
  {
    _id: "testId1",
    title: "testTitle1",
    username: "testUsername1",
    userId: "testUserId1",
    author: "testAuthor1",
    added: "2021-01-21T09:31:05.462+00:00",
    body: "testBody1",
  },
  {
    _id: "testId2",
    title: "testTitle2",
    username: "testUsername2",
    userId: "testUserId2",
    author: "testAuthor2",
    added: "2021-01-21T09:31:05.462+00:00",
    body: "testBody2",
    isFeatured: true,
  },
];

const normalizedStories = [
  {
    id: "testId1",
    title: "testTitle1",
    username: "testUsername1",
    userId: "testUserId1",
    author: "testAuthor1",
    added: "1/21/2021",
    isFeatured: undefined,
    body: "testBody1...",
  },
  {
    id: "testId2",
    title: "testTitle2",
    username: "testUsername2",
    userId: "testUserId2",
    author: "testAuthor2",
    added: "1/21/2021",
    isFeatured: true,
    body: "testBody2...",
  },
];

const story = {
  _id: "testId1",
  title: "testTitle1",
  username: "testUsername1",
  userId: "testUserId1",
  author: "testAuthor1",
  added: "2021-01-21T09:31:05.462+00:00",
  body: "testBody1",
  isFeatured: true,
};

const normalizedStory = {
  id: "testId1",
  title: "testTitle1",
  username: "testUsername1",
  userId: "testUserId1",
  author: "testAuthor1",
  added: "1/21/2021",
  isFeatured: true,
  body: "testBody1",
};

describe("createExcerpt", function () {
  it("should create substring excerpt from long text body", function () {
    expect(createExcerpt(longTextbody)).toEqual(expectedLongExcerpt);
  });
  it("should format and return original short text bdoy", function () {
    expect(createExcerpt(shortTextBody)).toEqual(expectedShortExcerpt);
  });
});

describe("normalizeStories", function () {
  it("should normalize and map results", function () {
    expect(normalizeStories(stories)).toEqual(normalizedStories);
  });
});

describe("normalizeStory", function () {
  it("should normalize result", function () {
    expect(normalizeStory(story)).toEqual(normalizedStory);
  });
});
