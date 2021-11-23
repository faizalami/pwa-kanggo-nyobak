import ComponentInitiator from './ComponentInitiator';

class SkipToContentInitiator extends ComponentInitiator {
  constructor ({ skipButton, skipTarget }) {
    super();

    this._skipButton = skipButton;
    this._skipTarget = skipTarget;
  }

  init () {
    this._skipButton.addEventListener('click', () => {
      this._skipTarget.focus();
    });
  }
}

export default SkipToContentInitiator;
