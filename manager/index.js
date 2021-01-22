import {upsert, findAll, findOne, findAllByUserId, deleteOne} from "../datastore";
import { normalizeStories, normalizeStory } from "./normalizers";

export const upsertStory = async (props) => {
  await upsert(props);
  return 'done';
};

export const getStories = async (collection) => {
  const result = await findAll(collection);
  return normalizeStories(result);
};

export const getStory = async (props) => {
  const result = await findOne(props);
  return normalizeStory(result);
};

export const getStoriesByUserId = async props => {
  const result = await findAllByUserId(props);
  return normalizeStories(result);
};

export const deleteStory = props => deleteOne(props);
