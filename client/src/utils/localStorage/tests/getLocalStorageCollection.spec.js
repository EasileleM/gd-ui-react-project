import getLocalStorageCollection from '../getLocalStorageCollection';

describe('getLocalStorageCollection', () => {
  beforeEach(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }

      removeItem(key) {
        delete this.store[key];
      }
    };

    global.localStorage = new LocalStorageMock();
  });

  it('Should return collection data', () => {
    const collectionData = {yes: 'yes'};
    localStorage.setItem('Yes', JSON.stringify(collectionData));
    expect(getLocalStorageCollection('Yes')).toEqual(collectionData);
  });

  it('Should\'t return collection data if it isn\'t exist', () => {
    expect(getLocalStorageCollection('NotExist')).toEqual(null);
  });
  it('Should\'t return collection data if it is empty', () => {
    const collectionData = {};
    localStorage.setItem('Yes', JSON.stringify(collectionData));
    expect(getLocalStorageCollection('Yes')).toEqual(null);
  });
  it('Should\'t return collection data if it\'s data is corrupted', () => {
    const collectionData = {};
    localStorage.setItem('Yes', 'dd{s');
    expect(getLocalStorageCollection('Yes')).toEqual(null);
  });
})