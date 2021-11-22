import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import App from './App';
import MenuInitiator from './classes/MenuInitiator';
import FooterInitiator from './classes/FooterInitiator';
import swRegister from './utils/sw-register';

const menu = new MenuInitiator({
  menu: document.body.querySelector('#menu'),
  button: document.body.querySelector('#show-menu'),
  itemsSelector: '.menu-item',
});
const footer = new FooterInitiator(document.body.querySelector('#year'));
const app = new App(document.body.querySelector('#content'), {
  menu,
  footer,
});

window.addEventListener('hashchange', () => {
  app.render();
});

window.addEventListener('load', () => {
  app.render();
  swRegister();
});
