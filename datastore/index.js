import uniqid from "uniqid";

export const upsert = async ({
  collection,
  body: { id, title, body, userId, username, isFeatured, author },
}) =>
  collection.findOneAndUpdate(
    { _id: id || uniqid() },
    {
      $set: {
        title,
        body,
        ...(userId && { userId }),
        ...(username && { username }),
        ...(author && { author }),
        ...(isFeatured && { isFeatured }),
        ...(!id && { added: new Date() }),
      },
    },
    { upsert: true, returnOriginal: false, w: 3 }
  );

export const findAll = async (collection) => {
  const cursor = await collection.find();
  return cursor.sort({ added: -1 }).toArray();
};

export const findOne = async ({ collection, id }) =>
  collection.findOne({ _id: id });

export const findAllByUserId = async ({ collection, id }) => {
  const cursor = await collection.find({ userId: id });
  return cursor.sort({ added: -1 }).toArray();
};

export const deleteOne = async ({ collection, id }) =>
  collection.deleteOne({ _id: id });
