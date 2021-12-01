import favoritesService from '../../src/scripts/services/favorites';
import likeButtonFactory from '../factory/likeButtonFactory';

describe('Add a Restaurant to Favorite', () => {
  const LIKE_BUTTON_WRAPPER_ID = 'like-button-wrapper';
  const WRAPPER_SELECTOR = `#${LIKE_BUTTON_WRAPPER_ID}`;
  const addLikeButtonWrapper = () => {
    document.body.innerHTML = `<div id="${LIKE_BUTTON_WRAPPER_ID}"></div>`;
  };

  beforeEach(() => {
    addLikeButtonWrapper();
  });

  afterEach(() => {
    favoritesService.delete(1);
  });

  it('should show the "disliked" button when the restaurant has not been added to favorite', async () => {
    // "disliked" button will show "Add {restauran-name} to favorite" aria-label
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    // Waiting for DOM changed
    setTimeout(() => {
      const renderedLikeButton = document.body.querySelector(`${WRAPPER_SELECTOR} button`);
      const ariaLabel = renderedLikeButton.getAttribute('aria-label');

      expect(ariaLabel).toMatch(/^Add .* to favorite$/ig);
    }, 5000);
  });

  it('should not show the "liked" button when the restaurant has not been added to favorite', async () => {
    // "liked" button will show "Remove {restauran-name} from favorite" aria-label
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    // Waiting for DOM changed
    setTimeout(() => {
      const renderedLikeButton = document.body.querySelector(`${WRAPPER_SELECTOR} button`);
      const ariaLabel = renderedLikeButton.getAttribute('aria-label');

      expect(ariaLabel).not.toMatch(/^Remove .* from favorite$/ig);
    }, 5000);
  });

  it('should be able to add to favorite', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));
    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeTrue();
      expect(await favoritesService.detail(1)).toEqual({ id: 1 });
    });
  });

  it('should not duplicate', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, { id: 1 });

    await favoritesService.save({ id: 1 });
    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));
    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeTrue();
      expect(await favoritesService.getAll()).toEqual([{ id: 1 }]);
    });
  });

  it('should not add to favorite when it has no id', async () => {
    await likeButtonFactory(WRAPPER_SELECTOR, {});

    document.body.querySelector(`${WRAPPER_SELECTOR} button`).dispatchEvent(new Event('click'));

    document.body.querySelector(WRAPPER_SELECTOR).addEventListener('liked', async event => {
      expect(event.detail).toBeFalse();
      expect(await favoritesService.getAll()).toEqual([]);
    });
  });
});
