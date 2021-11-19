import ComponentInitiator from './ComponentInitiator';

class FooterInitiator extends ComponentInitiator {
  constructor (copyrightYear) {
    super();

    this._copyrightYear = copyrightYear;
  }

  init () {
    this._copyrightYear.innerHTML = new Date().getFullYear();
  }
}

export default FooterInitiator;
