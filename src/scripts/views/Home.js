import RestaurantList from './RestaurantList';
import LoadingInitiator from '../classes/LoadingInitiator';
import '../components/RestaurantCard';
import restaurantsService from '../services/restaurants';

class Home extends RestaurantList {
  constructor () {
    super();

    this._restaurantHttpService = restaurantsService;
  }

  async _searchRestaurants (search) {
    LoadingInitiator.showLoading();
    const { data } = await this._restaurantHttpService.search(search);
    LoadingInitiator.hideLoading();
    return data;
  }

  async _loadRestaurants () {
    LoadingInitiator.showLoading();
    const { data } = await this._restaurantHttpService.getAll();
    LoadingInitiator.hideLoading();
    this._displayRestaurants(data);
  }

  async _afterRender () {
    await this._loadRestaurants();
    this.querySelector('#search-button').addEventListener('click', async () => {
      const searchBox = this.querySelector('#search');
      if (searchBox) {
        const data = await this._searchRestaurants(searchBox.value);
        this._displayRestaurants(data);
      }
    });
  }

  render () {
    this.innerHTML = `
      <article>
        <section class="grid-template-4 m-b-8px">
          <div class="grid-col-span-4">
            <h2 class="font-normal txt-center txt-primary m-y-8px">Discover Restaurants</h2>
          </div>
          <div class="grid-col-span-3">
            <input
              id="search"
              class="width-100 border-primary txt-primary border-rad-8px p-x-8px"
              type="text"
              name="search"
              aria-label="Search box"
              placeholder="Type some keywords."
            />
          </div>
          <div class="grid-col-span-1 txt-right">
            <button type="button" id="search-button" class="width-100 bg-secondary border-primary border-rad-8px txt-white align-items-center" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </section>
        <section id="restaurants-container" class="grid-template-1 laptop-grid-template-3 m-t-16px">
        
        </section>
      </article>
    `;
    this._afterRender();
  }
}

export default Home;
