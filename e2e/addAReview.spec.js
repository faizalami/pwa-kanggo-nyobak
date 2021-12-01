Feature('Add a Review');

Before(({ I }) => {
  I.amOnPage('/#/');
  I.click(locate('#restaurants-container restaurant-card .restaurant-detail-link').first());
});

Scenario('Open detail and add a valid review', ({ I }) => {
  const reviewMessage = `Review from codecept on ${new Date().toLocaleString()}.`;
  I.fillField('Name', 'Codecept');
  I.fillField('Review', reviewMessage);
  I.click('Post');

  I.see('Codecept', '.review-box .reviewer-name');
  I.see(reviewMessage, '.review-box .review-message');
});

Scenario('Open detail and add a invalid review', ({ I }) => {
  I.fillField('Name', '');
  I.fillField('Review', '');
  I.click('Post');

  I.see('Failed to post review.', '#error-review.block');
});

Scenario('Open detail and add a review while offline', ({ I }) => {
  I.usePuppeteerTo('emulate offline mode', async ({ page, browser }) => {
    await page.setOfflineMode(true);
  });

  I.fillField('Name', 'Codecept');
  I.fillField('Review', 'Send review while offline.');
  I.click('Post');

  I.see('You are offline.', '#error-review.block');
});
