import dbaccess from '../utils/dbaccess';

export default {
  storeName: 'favorites',
  async getAll () {
    return await dbaccess.getAll(this.storeName);
  },
  async detail (id) {
    return await dbaccess.get(this.storeName, id);
  },
  async save (payload) {
    return await dbaccess.put(this.storeName, payload);
  },
  async delete (id) {
    return await dbaccess.delete(this.storeName, id);
  },
};
