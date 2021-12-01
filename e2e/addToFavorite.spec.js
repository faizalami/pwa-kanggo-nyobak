Feature('Add to Favorite');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Favorite page is empty', ({ I }) => {
  I.see('No Restaurant Found.', '.restaurant-not-found');
});

Scenario('Choose a restaurant from home page to favorite', async ({ I }) => {
  I.see('No Restaurant Found.', '.restaurant-not-found');
  I.amOnPage('/#/');

  I.seeElement('#restaurants-container restaurant-card like-button button');
  I.click(locate('#restaurants-container restaurant-card like-button button').first());

  const detailLink = locate('#restaurants-container restaurant-card .restaurant-detail-link').first();
  const detailUrl = await I.grabAttributeFrom(detailLink, 'href');
  const detailUrlSplit = detailUrl.split('/');
  const detailId = detailUrlSplit[detailUrlSplit.length - 1];

  I.amOnPage('/#/favorite');
  I.seeElement(`#restaurants-container restaurant-card .restaurant-detail-link[href$="${detailId}"]`);
});

Scenario('Choose a restaurant from detail page to favorite', async ({ I }) => {
  I.see('No Restaurant Found.', '.restaurant-not-found');
  I.amOnPage('/#/');

  I.click(locate('#restaurants-container restaurant-card .restaurant-detail-link').first());

  const detailUrl = await I.grabCurrentUrl();
  const detailUrlSplit = detailUrl.split('/');
  const detailId = detailUrlSplit[detailUrlSplit.length - 1];

  I.seeElement('like-button button');
  I.click('like-button button');

  I.amOnPage('/#/favorite');
  I.seeElement(`#restaurants-container restaurant-card .restaurant-detail-link[href$="${detailId}"]`);
});
