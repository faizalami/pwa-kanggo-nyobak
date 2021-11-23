import './NotFound';
import restaurantsService from '../services/restaurants';
import router from '../routes/router';
import handleBrokenPictures from '../utils/handle-broken-pictures';

class Detail extends HTMLElement {
  async connectedCallback () {
    await this._getDetail();
    this.render();

    handleBrokenPictures('.picture-detail');
  }

  async _getDetail () {
    const { params: { id } } = router.matchedRoute();
    const { data } = await restaurantsService.detail(id);
    this._detail = data;
  }

  async _afterRender () {
    const postReviewForm = this.querySelector('#post-review-form');
    if (postReviewForm) {
      postReviewForm.addEventListener('submit', async event => {
        event.preventDefault();

        const payload = {
          id: this._detail.id,
          name: postReviewForm.elements.name.value,
          review: postReviewForm.elements.review.value,
        };

        const { error, data } = await restaurantsService.postReview(payload);

        if (!error) {
          this._detail.customerReviews = [...data];
          this.render();
        }
      });
    }
  }

  render () {
    this.innerHTML = '';
    if (this._detail) {
      const foods = this._detail.menus.foods.map(item => `<li class="dotted">${item.name}</li>`).join('');
      const drinks = this._detail.menus.drinks.map(item => `<li class="dotted">${item.name}</li>`).join('');
      const customerReviews = this._detail.customerReviews.map(item => `
        <div class="flex flex-row align-items-center border-primary border-rad-8px m-y-8px p-a-8px">
          <div class="comment-profile bg-secondary txt-white m-r-8px" role="img" aria-label="">${item.name[0]}</div>
          <div>
            <p class="m-y-0 txt-primary"><strong>${item.name}</strong></p>    
            <p class="m-y-0"><small>${item.date}</small></p>    
          </div>
          <div class="width-100"><p>${item.review}</p></div>
        </div>
      `).join('');
      this.innerHTML = `
        <article class="tablet-grid-template-4">
          <h1 class="m-b-0 txt-primary tablet-grid-col-span-4">${this._detail.name}</h1>
  
          <ul class="m-y-8px tablet-flex txt-primary tablet-grid-col-span-4">
            <li class="tablet-m-r-8px">
              <span role="note" aria-label="Rating">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              ${this._detail.rating}
            </li>
            <li class="tablet-m-x-8px">
              <span role="note" aria-label="Address">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </span>
              ${this._detail.address},
              <strong>${this._detail.city}</strong>
            </li>
            <li class="tablet-m-x-8px">
              <span role="note" aria-label="Categories">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M3,3A1,1 0 0,0 2,4V8L2,9.5C2,11.19 3.03,12.63 4.5,13.22V19.5A1.5,1.5 0 0,0 6,21A1.5,1.5 0 0,0 7.5,19.5V13.22C8.97,12.63 10,11.19 10,9.5V8L10,4A1,1 0 0,0 9,3A1,1 0 0,0 8,4V8A0.5,0.5 0 0,1 7.5,8.5A0.5,0.5 0 0,1 7,8V4A1,1 0 0,0 6,3A1,1 0 0,0 5,4V8A0.5,0.5 0 0,1 4.5,8.5A0.5,0.5 0 0,1 4,8V4A1,1 0 0,0 3,3M19.88,3C19.75,3 19.62,3.09 19.5,3.16L16,5.25V9H12V11H13L14,21H20L21,11H22V9H18V6.34L20.5,4.84C21,4.56 21.13,4 20.84,3.5C20.63,3.14 20.26,2.95 19.88,3Z" />
                </svg>
              </span>
              ${this._detail.categories.map(category => category.name).join(', ')}
            </li>
          </ul>
          <section class="tablet-grid-col-span-3">
            <img class="picture-detail m-y-8px" src="${process.env.API_BASE_URL}images/large/${this._detail.pictureId}" alt="${this._detail.name}">
            <p class="txt-justify">${this._detail.description}</p>
          </section>
          <aside class="m-b-8px txt-primary tablet-grid-col-span-1">
            <div>
              <h2 class="m-b-0 font-normal">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 13C22 14.11 21.11 15 20 15H4C2.9 15 2 14.11 2 13S2.9 11 4 11H13L15.5 13L18 11H20C21.11 11 22 11.9 22 13M12 3C3 3 3 9 3 9H21C21 9 21 3 12 3M3 18C3 19.66 4.34 21 6 21H18C19.66 21 21 19.66 21 18V17H3V18Z" />
                  </svg>
                </span>
                Foods
              </h2>
              <ul>
                ${foods}
              </ul>
            </div>
            <div>
              <h2 class="m-b-0 font-normal">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
                  </svg>
                </span>
                Drinks
              </h2>
              <ul>
                ${drinks}
              </ul>
            </div>
          </aside>
          <section class="grid-col-span-4 m-y-8px">
            <h2 class="m-b-0 font-normal txt-primary">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </span>
              Customer Reviews
            </h2>
            <div class="border-primary border-rad-8px m-y-8px p-a-8px">
              <h3 class="font-normal txt-primary m-y-0">Post a Review</h3>
              <form id="post-review-form" class="grid-template-1">
                <div>
                  <label for="name" class="txt-primary font-smaller">Name</label>
                  <input type="text" name="name" id="name" class="width-100 border-primary txt-primary border-rad-8px p-x-8px" />
                </div>
                <div>
                  <label for="review" class="txt-primary font-smaller">Review</label>
                  <textarea name="review" id="review" rows="3" class="width-100 border-primary txt-primary border-rad-8px p-x-8px"></textarea>
                </div>
                <button type="submit" class="m-l-auto p-x-8px bg-secondary border-primary border-rad-8px txt-white align-items-center">
                  Post
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
            <div>
              ${customerReviews}
            </div>
          </section>
        </article>
      `;
    } else {
      this.innerHTML = '<not-found></not-found>';
    }
    this._afterRender();
  }
}

export default Detail;
