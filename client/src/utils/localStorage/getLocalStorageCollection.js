export default function getLocalStorageCollection(collection) {
  let storage = localStorage.getItem(collection);
  if (!storage) {
    localStorage.setItem(collection, JSON.stringify({}));
    return null;
  }
  try {
    storage = JSON.parse(storage);
  }
  catch (error) {
    localStorage.setItem(collection, JSON.stringify({}));
    return null;
  }
  if (!Object.keys(storage).length) {
    return null;
  }
  return storage;
}