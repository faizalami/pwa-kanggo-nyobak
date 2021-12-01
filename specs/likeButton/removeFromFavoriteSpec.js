import favoritesService from '../../src/scripts/services/favorites';
import likeButtonFactory from '../factory/likeButtonFactory';

describe('Remove a Restaurant from Favorite', () => {
  const LIKE_BUTTON_WRAPPER_ID = 'like-button-wrapper';
  const WRAPPER_SELECTOR = `#${LIKE_BUTTON_WRAPPER_ID}`;
  const addLikeButtonWrapper = () => {
    document.body.innerHTML = `<div id="${LIKE_BUTTON_WRAPPER_ID}"></div>`;
  };

  beforeEach(async () => {
    addLikeButtonWrapper();
    await favoritesService.save({ id: 1 });
  });

  afterEach(() => {
    favoritesService.delete(1);
  });

  it('should show the "liked" button when the restaurant has been added to favorite', async () => {
    // "liked" button will show "Remove {restauran-name} from favorite" aria-label
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    // Waiting for DOM changed
    setTimeout(() => {
      const renderedLikeButton = document.body.querySelector(`${WRAPPER_SELECTOR} button`);
      const ariaLabel = renderedLikeButton.getAttribute('aria-label');

      expect(ariaLabel).toMatch(/^Remove .* from favorite$/ig);
    }, 5000);
  });

  it('should not show the "disliked" button when the restaurant has been added to favorite', async () => {
    // "disliked" button will show "Add {restauran-name} to favorite" aria-label
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    // Waiting for DOM changed
    setTimeout(() => {
      const renderedLikeButton = document.body.querySelector(`${WRAPPER_SELECTOR} button`);
      const ariaLabel = renderedLikeButton.getAttribute('aria-label');

      expect(ariaLabel).not.toMatch(/^Add .* to favorite$/ig);
    }, 5000);
  });

  it('should be able to remove from favorite', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));
    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeFalse();
      expect(await favoritesService.detail(1)).toBeFalsy();
    });
  });

  it('should not remove the removed restaurant', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    await favoritesService.delete(1);
    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));
    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeFalse();
      expect(await favoritesService.detail(1)).toBeFalsy();
    });
  });

  it('should not remove from favorite when it has no id', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, {});

    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));

    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeFalse();
      expect(await favoritesService.getAll()).toEqual([]);
    });
  });
});
