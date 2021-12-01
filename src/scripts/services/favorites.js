import dbaccess from '../utils/dbaccess';

export default {
  storeName: 'favorites',
  async getAll () {
    return await dbaccess.getAll(this.storeName);
  },
  async detail (id) {
    if (id) {
      return await dbaccess.get(this.storeName, id);
    }
    return null;
  },
  async save (payload) {
    if (payload.id) {
      const restaurantExist = await this.detail(payload.id);
      if (!restaurantExist) {
        return await dbaccess.put(this.storeName, payload);
      }
    }
    return null;
  },
  async delete (id) {
    const restaurantExist = await this.detail(id);
    if (restaurantExist) {
      return await dbaccess.delete(this.storeName, id);
    }
    return null;
  },
};

// import { openDB } from 'idb';
//
// const STORE_NAME = 'favorites';
// const dbPromise = openDB(process.env.DATABASE_NAME || 'db', process.env.DATABASE_VERSION || 1, {
//   upgrade (database) {
//     database.createObjectStore(STORE_NAME, { keyPath: 'id' });
//   },
// });
//
// export default {
//   async getAll () {
//     return (await dbPromise).getAll(STORE_NAME);
//   },
//   async detail (id) {
//     return (await dbPromise).get(STORE_NAME, id);
//   },
//   async save (payload) {
//     if (payload.id) {
//       const restaurantExist = await this.detail(payload.id);
//       if (!restaurantExist) {
//         return (await dbPromise).put(STORE_NAME, payload);
//       }
//     }
//     return null;
//   },
//   async delete (id) {
//     const restaurantExist = await this.detail(id);
//     if (restaurantExist) {
//       return (await dbPromise).delete(STORE_NAME, id);
//     }
//     return null;
//   },
// };
