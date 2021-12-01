Feature('Add a Review');

Scenario('Open detail and add a valid review', ({ I }) => {
  I.amOnPage('/#/');

  I.click(locate('#restaurants-container restaurant-card .restaurant-detail-link').first());

  const reviewMessage = `Review from codecept on ${new Date().toLocaleString()}.`;
  I.fillField('Name', 'Codecept');
  I.fillField('Review', reviewMessage);
  I.click('Post');

  I.see('Codecept', '.review-box .reviewer-name');
  I.see(reviewMessage, '.review-box .review-message');
});
