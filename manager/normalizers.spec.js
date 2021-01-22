import { normalizeResult, normalizeNameResult } from "./normalizers";

const dynamoDBResult = {
  Items: [
    {
      id: 1,
      base64Image: "iVBORw0KGgoAAAANS",
      name: "Bulbasaur",
    },
  ],
};

const expectedNormalizedResult = {
  id: 1,
  image: "iVBORw0KGgoAAAANS",
  name: "Bulbasaur",
};

const expectedNormalizedNameResult = "Bulbasaur";

describe("normalizeResults", function () {
  it("should normalize result and return all props", function () {
    expect(normalizeResult(dynamoDBResult)).toEqual(expectedNormalizedResult);
  });
  it("should normalize result and only return name prop", function () {
    expect(normalizeNameResult(dynamoDBResult)).toEqual(
      expectedNormalizedNameResult
    );
  });
});
