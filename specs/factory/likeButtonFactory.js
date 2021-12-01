import '../../src/scripts/components/LikeButton';
import favoritesService from '../../src/scripts/services/favorites';

export default (wrapperSelector, restaurant) => {
  const likeButton = document.createElement('like-button');
  likeButton.service = favoritesService;
  likeButton.restaurant = restaurant;

  const wrapper = document.body.querySelector(wrapperSelector);
  wrapper.innerHTML = '';
  wrapper.appendChild(likeButton);
};
