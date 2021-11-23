import 'regenerator-runtime';
import '../styles/style.scss';
import App from './App';
import MenuInitiator from './classes/MenuInitiator';
import FooterInitiator from './classes/FooterInitiator';
import SkipToContentInitiator from './classes/SkipToContentInitiator';
import LoadingInitiator from './classes/LoadingInitiator';
import swRegister from './utils/sw-register';

const menu = new MenuInitiator({
  menu: document.body.querySelector('#menu'),
  button: document.body.querySelector('#show-menu'),
  itemsSelector: '.menu-item',
});
const footer = new FooterInitiator(document.body.querySelector('#year'));
const skip = new SkipToContentInitiator({
  skipButton: document.body.querySelector('#skip-button'),
  skipTarget: document.body.querySelector('#content'),
});
const loading = new LoadingInitiator(document.body.querySelector('#loading'));
const app = new App(document.body.querySelector('#content'), {
  menu,
  footer,
  skip,
  loading,
});

window.addEventListener('hashchange', () => {
  app.render();
});

window.addEventListener('load', () => {
  app.render();
  swRegister();
});
