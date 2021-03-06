import * as R from "ramda";

const isEmptyOrNil = R.or(R.isNil, R.isEmpty);

export const createExcerpt = R.pipe(
  R.prop("body"),
  R.unless(
    isEmptyOrNil,
    R.pipe(
      (body) => body.substring(0, 202),
      (substring) => `${substring}...`
    )
  )
);

const formatDate = R.pipe(
  R.prop("added"),
  R.unless(isEmptyOrNil, (date) => new Date(date).toLocaleDateString())
);

const storyDataProps = {
  id: R.prop("_id"),
  title: R.prop("title"),
  username: R.prop("username"),
  userId: R.prop("userId"),
  author: R.prop("author"),
  isFeatured: R.prop("isFeatured"),
  added: formatDate,
};

export const normalizeStories = R.map(
  R.applySpec({
    ...storyDataProps,
    body: createExcerpt,
  })
);

export const normalizeStory = R.applySpec({
  ...storyDataProps,
  body: R.prop("body"),
});
