import Home from '../views/Home';
import Favorite from '../views/Favorite';
import Detail from '../views/Detail';

const routes = {
  '/': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
