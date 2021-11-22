class RestaurantCard extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  set restaurant (restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  get restaurant () {
    return this._restaurant;
  }

  render () {
    this.innerHTML = `
      <article class="bg-white border-primary border-rad-8px">
        <img class="pictures border-rad-8px" src="${process.env.API_BASE_URL}images/small/${this._restaurant.pictureId}" alt="${this._restaurant.name}">
        <section class="m-a-8px">
          <h3 class="m-y-0 txt-primary">
            <a href="#" class="flex align-items-center">${this._restaurant.name}</a>
          </h3>
          <ul class="m-y-8px flex txt-primary">
            <li>
              <span role="note" aria-label="Rating">
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              ${this._restaurant.rating}
            </li>
            <li class="m-l-8px">
              <span role="note" aria-label="Location">
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </span>
              ${this._restaurant.city}
            </li>
          </ul>
          <p class="txt-justify">${this._restaurant.description.substring(0, 150)}...</p>
        </section>
      </article>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
