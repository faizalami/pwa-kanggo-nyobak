import httpreq from '../utils/httpreq';

export default {
  async getAll () {
    try {
      const { restaurants, ...response } = await httpreq.get('list');

      return {
        ...response,
        data: restaurants,
      };
    } catch (error) {
      return {
        ...error,
        data: [],
      };
    }
  },
  async search (query) {
    try {
      if (!query) {
        return await this.getAll();
      }
      const { restaurants, ...response } = await httpreq.get(`search?q=${query}`);

      return {
        ...response,
        data: restaurants,
      };
    } catch (error) {
      return {
        ...error,
        data: [],
      };
    }
  },
};
