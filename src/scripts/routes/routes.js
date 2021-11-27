const Home = import('../views/Home');
const Favorite = import('../views/Favorite');
const Detail = import('../views/Detail');

const routes = {
  '/': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
