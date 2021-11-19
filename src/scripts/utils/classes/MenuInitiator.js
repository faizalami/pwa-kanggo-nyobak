import ComponentInitiator from './ComponentInitiator';

class MenuInitiator extends ComponentInitiator {
  constructor ({ button, menu, itemsSelector }) {
    super();
    this._SHOWN_SELECTOR_CLASS = 'max-height-screen';
    this._HIDDEN_SELECTOR_CLASS = 'max-height-0';

    this._button = button;
    this._menu = menu;
    this._itemsSelector = itemsSelector;
  }

  _getMenuItems () {
    this._menuItems = this._menu.querySelectorAll(this._itemsSelector);
  }

  _menuShown () {
    return this._menu.classList.contains(this._SHOWN_SELECTOR_CLASS);
  }

  _menuHidden () {
    return this._menu.classList.contains(this._HIDDEN_SELECTOR_CLASS);
  }

  _setMenuItemsFocusable (focusable) {
    this._focusable = focusable;
    this._menuItems.forEach(item => {
      item.setAttribute('tabindex', focusable ? '-1' : '0');
    });
  }

  _initToggle () {
    this._button.addEventListener('click', () => {
      this._menu.classList.toggle(this._HIDDEN_SELECTOR_CLASS);
      this._menu.classList.toggle(this._SHOWN_SELECTOR_CLASS);

      this._setMenuItemsFocusable(!this._focusable);
    });
  }

  _handleWindowResize () {
    window.addEventListener('resize', event => {
      if (document.documentElement.clientWidth <= 640) {
        if (this._menuHidden()) {
          this._setMenuItemsFocusable(false);
        }
        if (this._menuShown()) {
          this._setMenuItemsFocusable(true);
        }
      } else {
        this._setMenuItemsFocusable(true);
      }
    });
  }

  init () {
    this._getMenuItems();
    this._setMenuItemsFocusable(document.documentElement.clientWidth <= 640 && this._menuHidden());
    this._initToggle();
    this._handleWindowResize();
  }
}

export default MenuInitiator;
