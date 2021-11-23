import ComponentInitiator from './ComponentInitiator';

class LoadingInitiator extends ComponentInitiator {
  constructor (loadingComponent) {
    super();

    this._loading = loadingComponent;
  }

  static showLoading () {
    window.dispatchEvent(new CustomEvent('loading', { detail: true }));
  }

  static hideLoading () {
    window.dispatchEvent(new CustomEvent('loading', { detail: false }));
  }

  init () {
    window.addEventListener('loading', event => {
      if (event.detail) {
        this._loading.classList.add('show');
      } else {
        this._loading.classList.remove('show');
      }
    });
  }
}

export default LoadingInitiator;
