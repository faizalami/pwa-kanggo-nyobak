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
  async detail (id) {
    try {
      const { restaurant, ...response } = await httpreq.get(`detail/${id}`);

      return {
        ...response,
        data: restaurant,
      };
    } catch (error) {
      return {
        ...error,
        data: null,
      };
    }
  },
  async postReview (payload) {
    try {
      const { customerReviews, ...response } = await httpreq.post('review', payload);

      return {
        ...response,
        data: customerReviews,
      };
    } catch (error) {
      return {
        ...error,
        data: null,
      };
    }
  },
};
