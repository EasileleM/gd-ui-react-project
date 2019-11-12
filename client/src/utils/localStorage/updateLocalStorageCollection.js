export default function updateLocalStorageCollection(collection, data) {
  localStorage.setItem(collection, JSON.stringify(data));
}