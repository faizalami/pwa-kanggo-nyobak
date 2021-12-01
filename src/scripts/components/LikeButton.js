class LikeButton extends HTMLElement {
  connectedCallback () {
    if (!this._favoriteDbService) {
      throw new Error('Favorite DB service is not specified.');
    }
    if (!this._restaurant) {
      throw new Error('Restaurant is not specified.');
    }
    this.render();
  }

  set service (httpService) {
    this._favoriteDbService = httpService;
  }

  get service () {
    return this._favoriteDbService;
  }

  set restaurant (restaurant) {
    this._restaurant = restaurant;
    this._initLike();
  }

  get restaurant () {
    return this._restaurant;
  }

  async _initLike () {
    const exist = await this._favoriteDbService.detail(this._restaurant.id);
    if (exist) {
      this._liked = true;
      this.render();
    }
  }

  _afterRender () {
    this.querySelector('button').addEventListener('click', async () => {
      if (this._restaurant) {
        if (this._liked) {
          await this._favoriteDbService.delete(this._restaurant.id);
          this._liked = false;
        } else {
          await this._favoriteDbService.save(this._restaurant);
          this._liked = true;
        }
        this.dispatchEvent(new CustomEvent('liked', { detail: this._liked }));
        this.render();
      }
    });
  }

  renderDisiked () {
    this.innerHTML = `
      <button
       type="button"
       aria-label="Add ${this._restaurant && this._restaurant.name ? this._restaurant.name : ''} to favorite"
       class="flex justify-center align-items-center txt-white bg-gray border-gray"
      >
        <svg class="like-button-icon like-icon" xmlns="http://www.w3.org/2000/svg" height="1em" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    `;
  }

  renderLiked () {
    this.innerHTML = `
      <button
       type="button"
       aria-label="Remove ${this._restaurant && this._restaurant.name ? this._restaurant.name : ''} from favorite"
       class="flex justify-center align-items-center txt-white bg-primary border-primary"
      >
        <svg class="like-button-icon dislike-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </button>
    `;
  }

  render () {
    if (this._liked) {
      this.renderLiked();
    } else {
      this.renderDisiked();
    }

    this._afterRender();
  }
}

customElements.get('like-button') || customElements.define('like-button', LikeButton);
