import {
  upsert,
  findAll,
  findOne,
  findAllByUserId,
  deleteOne,
} from "../datastore";
import { normalizeStories, normalizeStory } from "./normalizers";
import logger from "../logger";

const logError = ({ message, name, props }) =>
  logger.log(
    "info",
    `error: ${message} at ${name} with props ${JSON.stringify(props)}`
  );

export const upsertStory = async (props) => {
  try {
    const { value } = await upsert(props);
    return normalizeStory(value);
  } catch ({ message }) {
    logError({ message, name: "upsertStory", props });
  }
};

export const getStories = async (collection) => {
  try {
    const result = await findAll(collection);
    return normalizeStories(result);
  } catch ({ message }) {
    logError({ message, name: "getStories" });
  }
};

export const getStory = async (props) => {
  try {
    const result = await findOne(props);
    return normalizeStory(result);
  } catch ({ message }) {
    logError({ message, name: "getStory", props });
  }
};

export const getStoriesByUserId = async (props) => {
  try {
    const result = await findAllByUserId(props);
    return normalizeStories(result);
  } catch ({ message }) {
    logError({ message, name: "getStoriesByUserId", props });
  }
};

export const deleteStory = (props) => {
  try {
    return deleteOne(props);
  } catch ({ message }) {
    logError({ message, name: "deleteStory", props });
  }
};
