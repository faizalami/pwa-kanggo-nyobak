import '../components/RestaurantCard';
import restaurantsService from '../services/restaurants';
import handleBrokenPictures from '../utils/handle-broken-pictures';

class Home extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  _displayRestaurants (restaurants) {
    const restaurantsContainer = this.querySelector('#restaurants-container');
    restaurantsContainer.innerHTML = '';
    if (restaurants && restaurants.length) {
      restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantsContainer.appendChild(restaurantCard);
      });

      handleBrokenPictures('.pictures');
    } else {
      restaurantsContainer.innerHTML = `
        <div class="grid-col-span-1 laptop-grid-col-span-3">
          <h3 tabindex="0" class="txt-center txt-primary">No Restaurant Found.</h3>
        </div>
      `;
    }
  }

  async _searchRestaurants (search) {
    const { data } = await restaurantsService.search(search);
    return data;
  }

  async _afterRender () {
    const { data } = await restaurantsService.getAll();
    this._displayRestaurants(data);
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
      <section class="grid-template-4 m-b-8px">
        <div class="grid-col-span-4">
          <h2 id="content-header" class="txt-center txt-primary m-y-8px">Discover Restaurants</h2>
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
      <section id="restaurants-container" class="grid-template-1 laptop-grid-template-3 m-y-8px">
      
      </section>
    `;
    this._afterRender();
  }
}

export default Home;
