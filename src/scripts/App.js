import './views/NotFound';
import router from './routes/router';

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

  async render () {
    const matchedRoute = await router.matchedRoute();
    if (matchedRoute) {
      if (!customElements.get(matchedRoute.name)) {
        customElements.define(matchedRoute.name, matchedRoute.component);
      }
      this._content.innerHTML = `<${matchedRoute.name}></${matchedRoute.name}>`;
    } else {
      this._content.innerHTML = '<not-found></not-found>';
    }
  }
}

export default App;
