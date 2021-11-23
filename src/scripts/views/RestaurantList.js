import '../components/RestaurantCard';
import handleBrokenPictures from '../utils/handle-broken-pictures';

class RestaurantList extends HTMLElement {
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

  _afterRender () {
    throw new Error('You have to implement the method!');
  }

  render () {
    throw new Error('You have to implement the method!');
  }
}

export default RestaurantList;
