import UrlParser from './routes/url-parser';
import routes from './routes/routes';

function pascalToKebab (pascalString) {
  return pascalString.split('').map((letter, index) => {
    return letter.toUpperCase() === letter
      ? `${index !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
}

class App {
  constructor (content, componentsInitiators) {
    this._content = content;
    this._components = componentsInitiators;

    this._initComponents();
  }

  _initComponents () {
    Object.values(this._components).forEach(component => {
      if (component.init) {
        component.init();
      }
    });
  }

  render () {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const pageName = `${pascalToKebab(page.name)}-page`;
    customElements.define(pageName, page);
    this._content.innerHTML = `<${pageName}></${pageName}>`;
  }
}

export default App;
