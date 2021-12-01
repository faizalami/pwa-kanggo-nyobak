Feature('Remove from Favorite');

let detailId = null;
Before(async ({ I }) => {
  I.amOnPage('/#/');

  I.click(locate('#restaurants-container restaurant-card like-button button').first());

  const detailLink = locate('#restaurants-container restaurant-card .restaurant-detail-link').first();
  const detailUrl = await I.grabAttributeFrom(detailLink, 'href');
  const detailUrlSplit = detailUrl.split('/');
  detailId = detailUrlSplit[detailUrlSplit.length - 1];
});

Scenario('Favorite page have an item', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement(`#restaurants-container restaurant-card .restaurant-detail-link[href$="${detailId}"]`);
});

Scenario('Remove a favorite restaurant from home page', async ({ I }) => {
  const favoriteRestaurantCard = locate('#restaurants-container restaurant-card')
    .withDescendant(`.restaurant-detail-link[href$="${detailId}"]`);
  I.seeElement(favoriteRestaurantCard);
  I.click(favoriteRestaurantCard.find('like-button button').first());

  I.amOnPage('/#/favorite');
  I.see('No Restaurant Found.', '.restaurant-not-found');
});

Scenario('Remove a favorite restaurant from detail page', async ({ I }) => {
  I.click(`#restaurants-container restaurant-card .restaurant-detail-link[href$="${detailId}"]`);

  I.seeElement('like-button button');
  I.click('like-button button');

  I.amOnPage('/#/favorite');
  I.see('No Restaurant Found.', '.restaurant-not-found');
});

Scenario('Remove a favorite restaurant from favorite page', async ({ I }) => {
  I.amOnPage('/#/favorite');
  const favoriteRestaurantCard = locate('#restaurants-container restaurant-card')
    .withDescendant(`.restaurant-detail-link[href$="${detailId}"]`);
  I.seeElement(favoriteRestaurantCard);
  I.click(favoriteRestaurantCard.find('like-button button').first());

  I.see('No Restaurant Found.', '.restaurant-not-found');
});
