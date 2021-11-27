import routes from './routes';
import { match } from 'path-to-regexp';

export default {
  getHashLocation () {
    return window.location.hash.slice(1).toLowerCase() || '/';
  },
  _pascalToKebab (pascalString) {
    return pascalString.split('').map((letter, index) => {
      return letter.toUpperCase() === letter
        ? `${index !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    }).join('');
  },
  getRoutes () {
    const parsedRoutes = [];
    Object.keys(routes).forEach(url => {
      const component = routes[url];
      parsedRoutes.push({
        component,
        match: match(url, { decode: decodeURIComponent }),
      });
    });
    return parsedRoutes;
  },
  async matchedRoute () {
    let routeFound = null;
    this.getRoutes().some(route => {
      const result = route.match(this.getHashLocation());
      if (result) {
        routeFound = {
          ...route,
          ...result,
        };
        return true;
      }
      return false;
    });
    const componentFound = await routeFound.component;
    routeFound = {
      ...routeFound,
      component: componentFound.default,
      name: `${this._pascalToKebab(componentFound.default.name)}-page`,
    };
    return routeFound;
  },
};
