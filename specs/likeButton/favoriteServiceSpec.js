import favoriteServiceContract from '../contracts/favoriteServiceContract';
import favoritesService from '../../src/scripts/services/favorites';

describe('Match Favorite Service to Contract', () => {
  favoriteServiceContract(favoritesService);
});
