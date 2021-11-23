import { openDB } from 'idb';
export default {
  dbName: process.env.DATABASE_NAME,
  dbVersion: process.env.DATABASE_VERSION,
  async dbInstance (storeName) {
    return await openDB(this.dbName, this.dbVersion, {
      upgrade (database) {
        database.createObjectStore(storeName, { keyPath: 'id' });
      },
    });
  },
  async getAll (storeName) {
    return (await this.dbInstance(storeName)).getAll(storeName);
  },
  async get (storeName, id) {
    return (await this.dbInstance(storeName)).get(storeName, id);
  },
  async put (storeName, payload) {
    return (await this.dbInstance(storeName)).put(storeName, payload);
  },
  async delete (storeName, id) {
    return (await this.dbInstance(storeName)).delete(storeName, id);
  },
};
