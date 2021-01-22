const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const axios = require("axios");

const data = {
  id: "testId",
  title: "test",
  author: "test",
  body: "test",
};

Given("I post a blog story", async function () {
  this.result = await axios({
    method: "post",
    url: "http://localhost:8080/blog/stories",
    data,
  }).then((response) => response.data);
});

Given(/I delete a blog story with the (.*) id/, async function (id) {
  this.result = await axios({
    method: "delete",
    url: `http://localhost:8080/blog/stories/${id}`,
    data,
  }).then((response) => response.data);
});

Given("I send get request to root endpoint", async function () {
  this.result = await axios({
    method: "get",
    url: `http://localhost:8080`,
  }).then((response) => response.data);
});

When(/I get the blog story with the (.*) id/, async function (id) {
  this.result = await axios({
    method: "get",
    url: `http://localhost:8080/blog/stories/${id}`,
  }).then((response) => response.data);
});

When("I get blog stories", async function () {
  this.result = await axios({
    method: "get",
    url: `http://localhost:8080/blog/stories`,
  }).then((response) => response.data);
});

When(/the returned deleted count is (\d+)/, async function (count) {
  assert.strictEqual(this.result.deletedCount, count);
});

Then(/the expected (?:post|get) data is returned/, function () {
  assert.deepStrictEqual(this.result, data);
});

Then(/the expected (?:\d+) status code is returned/, function () {
  assert.strictEqual(this.result, "OK");
});

Then("the result is empty", function () {
  assert.deepStrictEqual(this.result, {});
});

Then(/the returned data length is not (\d+)/, function (count) {
  assert.notStrictEqual(this.result.length, count);
});
