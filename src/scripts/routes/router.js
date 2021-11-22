import routes from './routes';
import { match } from 'path-to-regexp';

export default {
  getHashLocation () {
    return window.location.hash.slice(1).toLowerCase();
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
        name: `${this._pascalToKebab(component.name)}-page`,
        component,
        match: match(url, { decode: decodeURIComponent }),
      });
    });
    return parsedRoutes;
  },
  matchedRoute () {
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
    return routeFound;
  },
};
