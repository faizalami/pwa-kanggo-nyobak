import RestaurantList from './RestaurantList';
import LoadingInitiator from '../classes/LoadingInitiator';
import '../components/RestaurantCard';
import favoritesService from '../services/favorites';

class Favorite extends RestaurantList {
  async _loadRestaurants () {
    LoadingInitiator.showLoading();
    const data = await favoritesService.getAll();
    LoadingInitiator.hideLoading();
    this._displayRestaurants(data);
  }

  async _afterRender () {
    await this._loadRestaurants();
  }

  render () {
    this.innerHTML = `
      <article>
        <h2 class="font-normal txt-center txt-primary m-y-8px">My Favorite</h2>
        <section id="restaurants-container" class="grid-template-1 laptop-grid-template-3 m-y-8px">
        
        </section>
      </article>
    `;
    this._afterRender();
  }
}

export default Favorite;
